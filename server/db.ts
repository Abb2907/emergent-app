import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('users.db');
const db = new Database(dbPath);

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    github_id TEXT UNIQUE,
    google_id TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    avatar_url TEXT,
    reset_token TEXT,
    reset_token_expiry DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migration: Add password column if it doesn't exist
try {
  db.exec('ALTER TABLE users ADD COLUMN password TEXT');
} catch (error) {
  // Column likely already exists
}

// Migration: Add reset_token columns if they don't exist
try {
  db.exec('ALTER TABLE users ADD COLUMN reset_token TEXT');
  db.exec('ALTER TABLE users ADD COLUMN reset_token_expiry DATETIME');
} catch (error) {
  // Columns likely already exist
}

export interface User {
  id: number;
  github_id?: string;
  google_id?: string;
  email?: string;
  password?: string;
  name?: string;
  avatar_url?: string;
  reset_token?: string;
  reset_token_expiry?: string;
  created_at: string;
  last_login: string;
}

export const createUser = (user: Partial<User>) => {
  const stmt = db.prepare(`
    INSERT INTO users (github_id, google_id, email, password, name, avatar_url)
    VALUES (@github_id, @google_id, @email, @password, @name, @avatar_url)
  `);
  const info = stmt.run({
    github_id: null,
    google_id: null,
    email: null,
    password: null,
    name: null,
    avatar_url: null,
    ...user
  });
  return { ...user, id: info.lastInsertRowid };
};

export const getUserByEmail = (email: string): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email) as User | undefined;
};

export const getUserByResetToken = (token: string): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > CURRENT_TIMESTAMP');
  return stmt.get(token) as User | undefined;
};

export const updateUserResetToken = (id: number, token: string | null, expiry: string | null) => {
  const stmt = db.prepare('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?');
  stmt.run(token, expiry, id);
};

export const updateUserPassword = (id: number, password: string) => {
  const stmt = db.prepare('UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?');
  stmt.run(password, id);
};

export const getUserByGithubId = (githubId: string): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE github_id = ?');
  return stmt.get(githubId) as User | undefined;
};

export const getUserByGoogleId = (googleId: string): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE google_id = ?');
  return stmt.get(googleId) as User | undefined;
};

export const getUserById = (id: number): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as User | undefined;
};

export const updateUserLogin = (id: number) => {
  const stmt = db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?');
  stmt.run(id);
};

export default db;
