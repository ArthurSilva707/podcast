// import { Router } from 'express';
// import { getPodcastsByCategory, getEpisodesByPodcastName } from '../controllers/podcastController';

// const router = Router();

// router.get('/category/:category', getPodcastsByCategory);
// router.get('/episodes', getEpisodesByPodcastName);

// export default router;

import { Router } from 'express';
import { getPodcastsByCategory, getEpisodesByPodcastName } from '../controllers/podcastController';

const router = Router();

router.get('/category/:category', getPodcastsByCategory);
router.get('/episodes', getEpisodesByPodcastName);

export default router;
