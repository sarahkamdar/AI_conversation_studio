const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const healthRoutes = require('./routes/healthRoutes');
const promptRoutes = require('./routes/promptRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api/prompts', promptRoutes);

app.use(errorHandler);

module.exports = app;
