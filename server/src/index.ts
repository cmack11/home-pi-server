import express from 'express';
import path from 'path';
import { run } from 'matrix';

const app = express();
const PORT = 8080;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/api/message', (req, res) => {
  run();
  res.json({ message: 'Hello from your API!' });
});
