const studentMethods = require('./methods');
const express = require('express');

const router = express.Router();

router.get('/students', studentMethods.listStudents);
router.get('/students/:name', studentMethods.getSingleStudent);
router.post('/students', studentMethods.createStudent);
router.put('/students/:id', studentMethods.replaceStudent);

module.exports = router;