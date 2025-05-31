 
// models/initSchema.js
import { db } from '../utils/db.js';

export async function createSchema() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS offers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      points INTEGER NOT NULL,
      url TEXT,
      active BOOLEAN DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS completed_offers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      offer_id INTEGER,
      completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(offer_id) REFERENCES offers(id)
    );

    CREATE TABLE IF NOT EXISTS redemptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      points INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);
}