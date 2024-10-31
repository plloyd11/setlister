import { createClient } from '@libsql/client';

export const db = createClient({
  url: 'file:local.db',
});

export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS setlists (
      id TEXT PRIMARY KEY,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS songs (
      id TEXT PRIMARY KEY,
      setlist_id TEXT,
      title TEXT NOT NULL,
      duration INTEGER NOT NULL,
      position INTEGER NOT NULL,
      FOREIGN KEY (setlist_id) REFERENCES setlists(id)
    )
  `);
}