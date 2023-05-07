import express from 'express';
import { createServer } from 'http';
import { join } from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
