import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { kv } from '@vercel/kv';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);
    const { movieId } = req.query;

    if (typeof movieId !== 'string') {
      throw new Error('Invalid ID');
    }

    if (!movieId) {
      throw new Error('Invalid ID');
    }

    const movieInRedis = await kv.hgetall(movieId);
    if(movieInRedis) {
      console.log('Find movie in cache!');
      return res.status(200).json(movieInRedis);
    }
    
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error('Invalid ID');
    }
    console.log('Find movie in db!');

    await kv.hset(movie.id, movie);

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
