const express = require('express');
const corsMiddleware = require('./config/corsConfig');

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend works!' });
});

app.listen(8080, () => {
  console.log('Backend running on http://localhost:8080');
});

