const studentMethods = require('./methods');
const express = require('express');

const router = express.Router();

/* router.get('/students', studentMethods.listStudents); */
router.get('/students', studentMethods.getStudents);
router.get('/students/:id', studentMethods.getStudentById);
router.post('/students', studentMethods.createStudent);
router.put('/students/:id', studentMethods.replaceStudent);
router.delete('/students/:id', studentMethods.deleteStudent);

module.exports = router;