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

export interface User {
  id: number;
  github_id?: string;
  google_id?: string;
  email?: string;
  password?: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  last_login: string;
}

export const createUser = (user: Partial<User>) => {
  const stmt = db.prepare(`
    INSERT INTO users (github_id, google_id, email, password, name, avatar_url)
    VALUES (@github_id, @google_id, @email, @password, @name, @avatar_url)
  `);
  const info = stmt.run(user);
  return { ...user, id: info.lastInsertRowid };
};

export const getUserByEmail = (email: string): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email) as User | undefined;
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
