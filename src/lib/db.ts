import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { join } from 'path';

// Initialize database
const db = new Database(join(process.cwd(), 'data.db'));

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Initialize admin user if it doesn't exist
const initAdmin = db.prepare(`
  INSERT OR IGNORE INTO users (username, password)
  VALUES (?, ?)
`);

// Create admin user with the specified password
const adminPassword = 'UHpT88MCbDy5KP8s8u';
const hashedPassword = bcrypt.hashSync(adminPassword, 10);
initAdmin.run('admin', hashedPassword);

export function verifyPassword(username: string, password: string): boolean {
  const stmt = db.prepare('SELECT password FROM users WHERE username = ?');
  const user = stmt.get(username);
  
  if (!user) return false;
  
  return bcrypt.compareSync(password, user.password);
}

export function changePassword(username: string, newPassword: string): boolean {
  try {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const stmt = db.prepare('UPDATE users SET password = ? WHERE username = ?');
    const result = stmt.run(hashedPassword, username);
    return result.changes > 0;
  } catch (error) {
    console.error('Error changing password:', error);
    return false;
  }
}

// Close database connection when the application exits
process.on('exit', () => {
  db.close();
});