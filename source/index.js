import app from './server.js';

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Connected to FMS Backend Server');
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
