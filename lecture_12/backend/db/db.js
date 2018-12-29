const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://user:user123456@ds123796.mlab.com:23796/rest-api';

function connectDB() {
  mongoose.connect(MONGO_URL, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;

  const { connection } = mongoose;

  connection.on('error', err => {
    console.error('DB error: ', err);
  });

  return connection;
}

exports.connectDB = connectDB;