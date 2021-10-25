const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// connect to mongoose
mongoose.connect(
  // hardcoded connection to mongodb atlas
  // 'mongodb+srv://minacula13:mi57n13ami57n13a@cluster0.s7phe.mongodb.net/vehiclesDB'
  // heroku fix
  uri
);

// require route
app.use('/', require('./routes/vehiclesRoute'));

app.listen(process.env.PORT || 3001, () => {
  console.log('express server is running, you are connected');
});
