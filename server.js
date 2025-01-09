const express = require('express');
const { submitHandler } = require('./controllers/submitController');
const { getMetrics } = require('./controllers/metricsController');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/submit', submitHandler);
app.get('/api/metrics', getMetrics);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
