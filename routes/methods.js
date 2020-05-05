

listStudents = (req, res, next) => {
  req.models.Student.find().then((posts) => {
    return res.send(posts);
  }).catch((error) => {
    next(error)
  })
}

getSingleStudent = (req, res, next) => {
  req.models.Student.find({name: req.params.name}).then((result) => {
    return res.send(result);
  })
}

createStudent = (req, res, next) => {
  req.models.Student.create({
    email: req.body.email,
    name: req.body.name,
    address: {
      street: req.body.address.street,
      zipcode: req.body.address.zipcode,
      city: req.body.address.city,
    }
  }).then((studentCreated) => {
    return res.status(201).send(studentCreated)
  }).catch((error) => {
    next(error)
  })
}

replaceStudent = (req, res, next) => {

  const replacement = {
    email: req.body.email,
    name: req.body.name,
    address: {
      street: req.body.address.street,
      zipcode: req.body.address.zipcode,
      city: req.body.address.city,
    }
  }
  req.models.Student.findOneAndReplace({_id:req.params.id}, replacement)
    .then((result) => {
      return res.status(201).send(result)
    }).catch((error) => {
      next(error)
    })
}

deleteStudent = (req, res, next) => {
  req.models.Student.findOneAn
}



module.exports = {
  listStudents,
  getSingleStudent,
  createStudent,
  replaceStudent
}