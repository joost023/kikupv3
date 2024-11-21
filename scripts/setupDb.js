import { join } from 'path';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

// Initialize database
const db = new Database(join(process.cwd(), 'data.db'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Initialize admin user
const adminPassword = 'UHpT88MCbDy5KP8s8u';
const hashedPassword = bcrypt.hashSync(adminPassword, 10);

const initAdmin = db.prepare(`
  INSERT OR IGNORE INTO users (username, password)
  VALUES (?, ?)
`);

initAdmin.run('admin', hashedPassword);

console.log('Database setup completed successfully!');
db.close();