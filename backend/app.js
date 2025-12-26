import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import codeReviewRoutes from './routes/reviewRoute.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', codeReviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});