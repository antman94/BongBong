mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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