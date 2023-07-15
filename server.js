const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var path = require('path');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));


var db;
MongoClient.connect(
  "mongodb+srv://junhee5143:Wns430628@@@cluster0.o9qhfpv.mongodb.net/?retryWrites=true&w=majority",{useUnifiedTopology:true},
  (에러, client) => {
    if (에러) {
      return console.log("에러");
    }

    db = client.db("todoapp");

    // db = client.db("todoapp");

    // db.collection("post").insertOne(
    //   { 이름: "전홍식", 나이: 18, _id: 101 },
    //   (에러, 결과) => {
    //     console.log("저장완료");
    //   }
    // );

    app.listen(port, () => {
      console.log("listening 0n 8080");
    });
  }
);

app.use(bodyParser.urlencoded({ extends: true }));
const port = 8080;

app.get("/", (요청, 응답) => {
  응답.sendFile(__dirname + "/views/main.html");
});

app.get("/write", (요청, 응답) => {
  응답.sendFile(__dirname + "/views/write.html");
});

app.post("/add", (요청, 응답) => {
  응답.send("전송완료");

  db.collection("counter").findOne({ name: "게시물갯수" }, (error, res) => {
    console.log(res.totalPost);
    var total_post = res.totalPost;

    db.collection("post").insertOne(
      { _id: total_post + 1, 제목: 요청.body.title, 내용: 요청.body.date },
      (에러, 결과) => {
        console.log("저장완료");

        // db 개수 증가 함수
        db.collection("counter").updateOne(
          { name: "게시물갯수" },

          // 오퍼레이터 연산자
          { $inc: { totalPost: 1 } },
          (error, res) => {
            if (error) {
              return console.log("에러");
            }
          }
        );
      }
    );
  });

  console.log(요청.body.title);
  console.log(요청.body.date);
});

app.get("/list", (요청, 응답) => {
  db.collection("post")
    .find()
    .toArray((error, res) => {
      console.log(res);
      응답.render("list.ejs", { posts: res });
    });
});

// 삭제 api
app.delete("/delete", (req, res) => {
  console.log(req.body._id);

  req.body._id = parseInt(req.body._id);
  console.log(req.body._id);
  db.collection("post").deleteOne(req.body, (error, result) => {
    console.log("삭제완료");
    res.status(200).send({ message : "성공했습니다"});
  });
});
// 삭제 api


// detail/:id 는  URL 파라미터
// 파라미터로 id 값을 받아 화면에 출력
app.get('/detail/:id',(req,res)=>{
  db.collection('post').findOne({_id : parseInt(req.params.id)}, (error , result)=>{
    console.log(result);
    res.render('detail.ejs' , { data : result})
  })
})



app.get('/edit/:id',(req,res)=>{
    db.collection('post').findOne({_id : parseInt(req.params.id)}, (error,result)=>{
      console.log(result);
      res.render('edit.ejs',  { data : result});
    })
})

// 수정 api
app.put('/edit',(req,res) =>{
  //서버로 부터 PUT 요청 들어오면 게시물 수청 처리
  db.collection('post').updateOne({ _id : parseInt(req.body.id) },{ $set : { 제목 : req.body.title , 날자 : req.body.date } },(error,result)=>{
    console.log("수정완료");
    res.redirect('/list');
  })
})