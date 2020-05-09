const mongoose = require('mongoose');

const isEmail = ((v) => {
  return /^([\w\.-]+)@([\w-]+\.([\w-]{2,4}))$/.test(v);
});

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true,'missing required property: email'],
    unique: true,
    validate: {
      validator: isEmail,
      message: 'Not a valid email'
    }
  },
  name: {
    type: String,
    required: [true,'missing required property: name'],
  },
  address: {
    street: {
      type: String,
      required: [true,'missing required property: street'],
    },
    zipcode: {
      type: Number,
      required: [true,'missing required property: zipcode'],
    },
    city: {
      type: String,
      required: [true,'missing required property: city'],
    },
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;