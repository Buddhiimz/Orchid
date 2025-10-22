const express = require('express');
const cors = require('cors');
const predictRoute = require('./routes/predict');

const app = express();
app.use(cors());
app.use('/predict', predictRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
