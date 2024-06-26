// // import { Request, Response } from 'express';
// // import { podcasts } from '../models/podcast';

// // export const getPodcastsByCategory = (req: Request, res: Response) => {
// //   const { category } = req.params;
// //   const filteredPodcasts = podcasts.filter(podcast => podcast.categories.includes(category));
// //   res.json(filteredPodcasts);
// // };

// // export const getEpisodesByPodcastName = (req: Request, res: Response) => {
// //   const { podcastName } = req.query;
// //   const filteredEpisodes = podcasts.filter(podcast => podcast.podcastName === podcastName);
// //   res.json(filteredEpisodes);
// // };

// import { Request, Response } from 'express';
// import pool from '../db';

// export const getPodcastsByCategory = async (req: Request, res: Response) => {
//     const { category } = req.params;
//     try {
//         const result = await pool.query(
//             'SELECT * FROM podcasts WHERE $1 = ANY(categories)',
//             [category]
//         );
//         res.json(result.rows);
//     } catch (err) {
//         res.status(500).json({ error: 'Erro ao buscar podcasts por categoria' });
//     }
// };

// export const getEpisodesByPodcastName = async (req: Request, res: Response) => {
//     const { podcastName } = req.query;
//     try {
//         const result = await pool.query(
//             'SELECT * FROM podcasts WHERE podcast_name = $1',
//             [podcastName]
//         );
//         res.json(result.rows);
//     } catch (err) {
//         res.status(500).json({ error: 'Erro ao buscar episódios por nome do podcast' });
//     }
// };

import { Request, Response } from 'express';
import pool from '../db';

export const getPodcastsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
      let result;
      if (category) {
          result = await pool.query(
              'SELECT * FROM podcasts WHERE $1 = ANY(categories)',
              [category]
          );
      } else {
          result = await pool.query('SELECT * FROM podcasts');
      }
      res.json(result.rows);
  } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar podcasts' });
  }
};

export const getEpisodesByPodcastName = async (req: Request, res: Response) => {
  const { podcastName } = req.query;
  try {
      let result;
      if (podcastName) {
          result = await pool.query(
              'SELECT * FROM podcasts WHERE podcast_name = $1',
              [podcastName]
          );
      } else {
          result = await pool.query('SELECT * FROM podcasts');
      }
      res.json(result.rows);
  } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar episódios' });
  }
};



