var config = require('./config');
const MongoClient = require("mongodb").MongoClient;

const connect = require('./db_conn.js')



exports.test = (요청, 응답) => {
    //db 중 post 를 찾아 전체 데이터 값을 받아 출력
    db.collection("post")
      .find()
      .toArray((error, res) => {
        console.log(res);
        응답.render("list.ejs", { posts: res });
      });
  }