const mongoose = require('mongoose');

const isEmail = ((v) => {
  return /^([\w\.-]+)@([\w-]+\.([\w-]{2,4}))$/.test(v);
});

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail
    }
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    zipcode: Number,
    city: String
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;