const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const flowRoutes = require('./routes/flowRoutes');
const { initialize } = require('./services/flowDistributionService');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Database connected'));

app.use('/api/users', userRoutes);
app.use('/api/flow', flowRoutes);

initialize().then(() => console.log('Flow distribution service initialized'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
