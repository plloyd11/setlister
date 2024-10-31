import { error } from '@sveltejs/kit';
import { db } from '$lib/db/client';
import type { Song } from '$lib/types';

export async function load({ params }) {
  const { rows } = await db.execute({
    sql: 'SELECT * FROM songs WHERE setlist_id = ? ORDER BY position',
    args: [params.id]
  });

  if (rows.length === 0) {
    throw error(404, 'Setlist not found');
  }

  return {
    songs: rows as Song[]
  };
}