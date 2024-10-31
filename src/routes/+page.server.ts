import { db } from '$lib/db/client';
import type { Song } from '$lib/types';
import { nanoid } from 'nanoid';

export async function load() {
  await db.execute('SELECT 1');
  return { ok: true };
}

export const actions = {
  createSetlist: async ({ request }) => {
    const data = await request.formData();
    const songsData = JSON.parse(data.get('songs') as string) as Song[];
    
    const setlistId = nanoid(10);
    
    await db.transaction(async (tx) => {
      await tx.execute('INSERT INTO setlists (id) VALUES (?)', [setlistId]);
      
      for (const [index, song] of songsData.entries()) {
        await tx.execute(
          'INSERT INTO songs (id, setlist_id, title, duration, position) VALUES (?, ?, ?, ?, ?)',
          [song.id, setlistId, song.title, song.duration, index]
        );
      }
    });

    return { setlistId };
  }
};