// import express from 'express';
// import podcastRoutes from './routes/podcastRoutes';

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use('/podcasts', podcastRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

import express from 'express';
import podcastRoutes from './routes/podcastRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/podcasts', podcastRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
