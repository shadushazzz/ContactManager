const express = require('express');
const errorHandler = require('./errorHandler');
const app = express();
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

const connectDb  = require('./confg/dbConnection');
connectDb();

app.use(express.json());
app.use('/contacts', require('./routes/contactRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port , () => {
    console.log('listening on port 5000');
})