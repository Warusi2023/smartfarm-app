const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Test server is working' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
