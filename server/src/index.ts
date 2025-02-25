import { spawn } from 'child_process';
import express from 'express';
import path from 'path';

const app = express();
const PORT = 8080;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/api/message', (req, res) => {
  const matrixProcess = spawn('sudo', ['node', 'node_modules/matrix/dist/index.js']);
  matrixProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  matrixProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  matrixProcess.on('close', (code) => {
    console.log(`matrix process exited with code ${code}`);
  });

  res.json({ message: 'Hello'});
});
