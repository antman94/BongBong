# BongBong API server

Application containing methods which responds to student related API calls from the client. Stores information in a mongo database.

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
Returns:
```sh
Body, Status code: 201
```
---

### Edit existing student by object ID
```sh
curl -i -s -X PUT "localhost:4000/students/5eb07ef86724f94fe0c4d69b" -H "Content-Type:application/json" -d '{"email":"newEmail@ant.com","name":"updatedName","address":{"street":"newStreet","zipcode":"131","city":"newCity"}}'
```
Returns:
```sh
Body, Status code: 
201 if new student was created, 
200 if existing student was changed,
204 if nothing changed
```
---

### List students in database
```sh
curl -s "localhost:4000/students" | jq
```
Returns:
Every object on the path,
Status code: 200

---
### Get single student by ID
```sh
curl -i -s "localhost:4000/students/5eb07ef86724f94fe0c4d69b" 
```
Returns:
Student object with the given ID,
Status code: 200
or
If ID is valid, but student not found
Status code: 404

---

### Get single student by query
```sh
curl -i -s "localhost:4000/students?name=ante" | jq
```
Returns:
Every object with matching key values, 
Status code: 200

---

### Delete a student by ID
```sh
curl -i -s -X DELETE "localhost:4000/students/5eb3bdf75b3c7c04786460cd"
```
Returns:
Status code: 200 if deleted
or
Status code: 204 if not found