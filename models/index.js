const mongoose = require('mongoose');
const Student = require('./student.js');

const uri = 'mongodb://localhost:27017/students';

const connectDb = () => {
  return mongoose.connect(uri, {useNewUrlParser: true});
};

module.exports = {
  connectDb,
  models: {
    Student
  }
}