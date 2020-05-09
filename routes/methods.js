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
    console.log(result)
    if(result.length == 1)
      return res.status(200).send(result);
    res.sendStatus(404);
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
  }).then((result) => {
    return res.status(201).send(result)
  }).catch((error) => {
    next(error)
  })
}

updateStudent = (req, res, next) => {
  const updatedStudent = {
    email: req.body.email,
    name: req.body.name,
    address: {
      street: req.body.address.street,
      zipcode: req.body.address.zipcode,
      city: req.body.address.city,
    }
  }
  req.models.Student.updateOne(
    {_id:req.params.id},
     updatedStudent, 
     { 
      upsert: true, 
      new: true, 
      runValidators: true,
      useFindAndModify: true,
    })
    .then((status) => {
      if(status.upserted) {
        res.status(201)
      } else if(status.nModified) {
        res.status(200);
      } else {
        res.status(204);
      }
      req.models.Student.findById(req.params.id).then((student) => {
        res.send(student)
      })
    }).catch((error) => {
      next(error)
    })
}

deleteStudent = (req, res, next) => {
  req.models.Student.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result)
      if(result)
        return res.status(200).send(result);
      res.sendStatus(204);
    }).catch((error) => {
      next(error)
    })
}



module.exports = {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent
}