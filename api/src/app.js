import express from 'express';
import { notFound, errorHandler } from './middlewares/errors.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Errors
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
