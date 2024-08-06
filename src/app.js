const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();

const authRoutes = require('./routes/auth');
const operationRoutes = require('./routes/operations');
const recordRoutes = require('./routes/records');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/operations', operationRoutes);
app.use('/api/v1/records', recordRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;