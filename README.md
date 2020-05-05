# BongBong
Inlämning1 Backend


curl -X POST "localhost:3000/students" -H "Content-Type:application/json" -d "{\"email\":\"test@ant.com\",\"name\":\"ante\",\"address\":{\"street\":\"PostStreet\",\"zipcode\":\"123\",\"city\":\"ort2\"}}"

curl -X PUT "localhost:3000/students/5eb081308257475454d0fb11" -H "Content-Type:application/json" -d "{\"email\":\"newEmail@ant.com\",\"name\":\"updatedName\",\"address\":{\"street\":\"newStreet\",\"zipcode\":\"131\",\"city\":\"newCity\"}}"