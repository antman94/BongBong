getStudents = (req, res, next) => {
  // localhost:3000/user => req.query {}
  // localhost:3000/user?usermame=pelle => req.query {"username": "pelle"}
  req.models.Student.find(req.query).then((data) => {
      return res.send(data);
    }).catch((error) => {
      next(error)
    })
}
/* 
listStudents = (req, res, next) => {
  req.models.Student.find().then((posts) => {
    return res.send(posts);
  }).catch((error) => {
    next(error)
  })
} */

getStudentById = (req, res, next) => {
  req.models.Student.find({_id: req.params.id}).then((result) => {
    return res.send(result);
  }).catch((error) => {
    next(error)
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

  const updatedStudent = {
    email: req.body.email,
    name: req.body.name,
    address: {
      street: req.body.address.street,
      zipcode: req.body.address.zipcode,
      city: req.body.address.city,
    }
  }
  req.models.Student.findOneAndReplace({_id:req.params.id}, updatedStudent)
    .then((result) => {
      return res.status(201).send(result)
    }).catch((error) => {
      next(error)
    })
}

deleteStudent = (req, res, next) => {
  req.models.Student.findOneAndDelete({_id:req.params.id})
    .then((result) => {
      console.log(`DELETE ${req.params.id} OK.`)
      return res.sendStatus(200)
    }).catch((error) => {
      next(error)
    })
}



module.exports = {
  getStudents,
  createStudent,
  getStudentById,
  replaceStudent,
  deleteStudent
}