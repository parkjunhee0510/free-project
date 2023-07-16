const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var path = require('path');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드' , resave : true , saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

//nodejs 사용시 html 에서 외부 css 파일을 불러올 경우 에러가 떠 css 시트가 적용이 안됨 아래와 같은 코드로 public 정의 해줌
app.use(express.static(path.join(__dirname, 'public')));


var db;
//몽고 db 연동 함수
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

//글 작성 api
app.post("/add", (요청, 응답) => {
  응답.send("전송완료");

  db.collection("counter").findOne({ name: "게시물갯수" }, (error, res) => {
    console.log(res.totalPost);
    var total_post = res.totalPost;

    //폼 태그에 입력시 id 값을 찾아 제목,내용 테이블에 데이터 기입
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

//읽기 api
app.get("/list", (요청, 응답) => {
  //db 중 post 를 찾아 전체 데이터 값을 받아 출력
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

  //id 값은 int형식임으로 parseInt 함수로 이용하여 int로 변환 시켜줌
  req.body._id = parseInt(req.body._id);
  console.log(req.body._id);

  //db id데이터 값을 찾아 삭제
  db.collection("post").deleteOne(req.body, (error, result) => {
    console.log("삭제완료");
    
    //res.status (200) 는 성공적으로 실행했다는 신호 200은 성공 400은 에러코드 
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

//edit/:id 위와 동일하게 URL 파라미터 사용
app.get('/edit/:id',(req,res)=>{

  //url 파라미터 값을 이용하여 db에서 id값을 찾아 보내줌
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

app.get('/login',(req,res) =>{
  res.render('login.ejs');
})

app.post('/login', passport.authenticate('local', {
  failureRedirect : "file" //인증 실패시 file 실행
}) ,(req,res) =>{
  //인증 성공시 home으로 이동
  res.redirect('/')
})

app.get('/mypage', pageLogin ,(req,res) => {
  //passport.deserializeUser 에서 넘겨받은 db 콘솔로그 출력 확인
  console.log(req.user);
  //넘겨받은 db mypage.ejs로 데이터값 넘김
  res.render('mypage.ejs',{consumer : req.user});
})

//세션 확인 함수
function pageLogin(req,res,next) {
  if(req.user){
    next()
  }
  else {
    res.send('no login');
  }
}

passport.use(new LocalStrategy({
  //form name값을 받은것 아이디/비번 정의
  usernameField: 'id',
  passwordField: 'pw',
  session: true, //로그인 후 세션 저장 여부
  passReqToCallback: false,  //아이디 비밀번호 말고 다른정보 검증 필요시
}, function (UserId, UserPw, done) {
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: UserId }, function (error, result) {
    
    //로그인 여부에 따른 출력방법
    if (error) {
      return done(error)
    }
    if (!result){
    return done(null, false, { message: '존재하지않는 아이디요' })
    } 
    if (UserPw == result.pw) {
      return done(null, result)
    } 
    else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

//로그인 성공시 세션 저장 아이디/비번 검증 성공시 USER로 데이터 전송
passport.serializeUser((user , done) => {
  //user로 전달받은 id값으로 세션 저장
  done(null, user.id)
});

//세션 데이터로 DB에서 정보를 찾음
passport.deserializeUser((id, done) => {
  //user 세션으로 db에서 정보를 찾아 mypage로 넘겨줌
   db.collection('login').findOne({ id : id }, (error, result) => {
    done(null , result)
   })
})