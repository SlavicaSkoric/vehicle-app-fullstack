const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const serveStatic = require('serve-static');

app.use(cors());
app.use(express.json());
app.use(serveStatic(__dirname + '/vehicle-app-mono/build'));

const uri = process.env.MONGODB_URI;

// connect to mongoose
mongoose.connect(
  uri || 'mongodb://localhost/vehiclesDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
  // hardcoded connection to mongodb atlas
  // 'mongodb+srv://minacula13:mi57n13ami57n13a@cluster0.s7phe.mongodb.net/vehiclesDB'
  // heroku fix
  // uri
);

// require route
app.use('/', require('./routes/vehiclesRoute'));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('express server is running, you are connected');
});
