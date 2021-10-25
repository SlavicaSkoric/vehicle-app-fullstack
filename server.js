const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

// connect to mongoose
mongoose.connect(
  'mongodb+srv://minacula13:mi57n13ami57n13a@cluster0.s7phe.mongodb.net/vehiclesDB'
);

// require route
app.use('/', require('./routes/vehiclesRoute'));

app.listen(3001, function () {
  console.log('express server is running on port 3001');
});
