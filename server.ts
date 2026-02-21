import express from 'express';
import session from 'cookie-session';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { createUser, getUserByGithubId, getUserByGoogleId, getUserById, updateUserLogin, getUserByEmail, updateUserResetToken, getUserByResetToken, updateUserPassword } from './server/db.ts';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(session({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'secret-key'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Email/Password Auth
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate password strength
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  try {
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = createUser({
      name,
      email,
      password: hashedPassword,
      avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    });

    req.session!.userId = user.id;
    res.json({ user: { id: user.id, name: user.name, email: user.email, avatar_url: user.avatar_url } });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const user = getUserByEmail(email);
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    updateUserLogin(user.id);
    req.session!.userId = user.id;
    
    // Extend session if rememberMe is true (30 days)
    if (rememberMe) {
      req.sessionOptions.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      req.sessionOptions.maxAge = 24 * 60 * 60 * 1000;
    }

    res.json({ user: { id: user.id, name: user.name, email: user.email, avatar_url: user.avatar_url } });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const user = getUserByEmail(email);
    if (!user) {
      // Don't reveal user existence
      return res.json({ message: 'If an account exists, a reset link has been sent.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    updateUserResetToken(user.id, token, expiry);

    // In a real app, send email here. For now, log to console.
    console.log(`[DEV] Password reset token for ${email}: ${token}`);
    console.log(`[DEV] Reset Link: ${APP_URL}/reset-password?token=${token}`);

    res.json({ message: 'If an account exists, a reset link has been sent.', devToken: token });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'Missing token or password' });

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  try {
    const user = getUserByResetToken(token);
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateUserPassword(user.id, hashedPassword);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// OAuth Configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;

// GitHub OAuth
app.get('/api/auth/github', (req, res) => {
  const redirectUri = `${APP_URL}/api/auth/github/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=user:email`;
  res.json({ url });
});

app.get('/api/auth/github/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: { Accept: 'application/json' }
    });

    const accessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const githubUser = userResponse.data;
    let user = getUserByGithubId(githubUser.id.toString());

    if (!user) {
      // Get email if not public
      let email = githubUser.email;
      if (!email) {
        const emailsResponse = await axios.get('https://api.github.com/user/emails', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const primaryEmail = emailsResponse.data.find((e: any) => e.primary && e.verified);
        email = primaryEmail ? primaryEmail.email : null;
      }

      user = createUser({
        github_id: githubUser.id.toString(),
        name: githubUser.name || githubUser.login,
        email: email,
        avatar_url: githubUser.avatar_url
      }) as any;
    } else {
      updateUserLogin(user.id);
    }

    req.session!.userId = user!.id;
    
    // Send success message to parent window and close popup
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('GitHub Auth Error:', error);
    res.status(500).send('Authentication failed');
  }
});

// Google OAuth
app.get('/api/auth/google', (req, res) => {
  const redirectUri = `${APP_URL}/api/auth/google/callback`;
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=profile email`;
  res.json({ url });
});

app.get('/api/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${APP_URL}/api/auth/google/callback`,
    });

    const accessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const googleUser = userResponse.data;
    let user = getUserByGoogleId(googleUser.id);

    if (!user) {
      user = createUser({
        google_id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        avatar_url: googleUser.picture
      }) as any;
    } else {
      updateUserLogin(user.id);
    }

    req.session!.userId = user!.id;

    // Send success message to parent window and close popup
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).send('Authentication failed');
  }
});

// User Info
app.get('/api/auth/me', (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ user: null });
  }
  const user = getUserById(req.session.userId);
  if (!user) {
    req.session = null;
    return res.status(401).json({ user: null });
  }
  res.json({ user });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  req.session = null;
  res.json({ success: true });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Vite Middleware
async function startServer() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      // Serve static files in production
      app.use(express.static(path.join(__dirname, 'dist')));
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
      });
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
