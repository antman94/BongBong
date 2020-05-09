# BongBong API server

Application for starting up a server connected to mongoDB, which responds to student related API calls.

---
### To start server
```sh
npm install
npm start
```

Note: Requires MongoDB to be installed

```sh
npm install -g mongodb
```

or

https://docs.mongodb.com/manual/administration/install-community/

---
## Supported paths and methods

### Create new student
```sh
curl -i -s -X POST "localhost:4000/students" -H "Content-Type:application/json" -d '{
  "email":"testant2@hej.com","name":"ante","address":{"street":"PostStreet1","zipcode":"123","city":"ort2"}}'
```

### Edit existing student by object ID
```sh
curl -i -s -X PUT "localhost:4000/students/5eb07ef86724f94fe0c4d69b" -H "Content-Type:application/json" -d '{"email":"newEmail@ant.com","name":"updatedName","address":{"street":"newStreet","zipcode":"131","city":"newCity"}}'
```

### List students in database
```sh
curl -s "localhost:4000/students" | jq
```

### Get single student by ID
```sh
curl -i -s "localhost:4000/students/5eb07ef86724f94fe0c4d69b" | jq
```

### Get single student by query
```sh
curl -i -s "localhost:4000/students?name=ante" | jq
```

### Delete a student by ID
```sh
curl -i -s -X DELETE "localhost:4000/students/5eb3bdf75b3c7c04786460cd"
```