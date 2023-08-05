<<<<<<< HEAD
const MongoClient = require("mongodb").MongoClient;

//몽고 db 연동 함수
exports.DB =MongoClient.connect(
  "mongodb+srv://junhee5143:Wns430628@@@cluster0.o9qhfpv.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  (에러, client) => {
    if (에러) {
      return console.log("에러");
    }
    db = client.db("todoapp");

  }
=======
const MongoClient = require("mongodb").MongoClient;

//몽고 db 연동 함수
exports.DB =MongoClient.connect(
  "mongodb+srv://junhee5143:Wns430628@@@cluster0.o9qhfpv.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  (에러, client) => {
    if (에러) {
      return console.log("에러");
    }
    db = client.db("todoapp");

  }
>>>>>>> f31af125c1a7b1d72ebcc74e14826c527eb1c8cf
);