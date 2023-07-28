const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
require("dotenv").config();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const dayjs = require("dayjs");
const multer = require("multer");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
app.use(cookieParser());

const storge = multer.diskStorage({
  destination: (req, file, cb) => {
    var time = dayjs();
    cb(null, file.file.originalname + "test" + time);
  },
  filename: () => {},
});

app.use(
  session({
    secret: "비밀코드",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 24000 * 60 * 60, // 쿠키 유효기간 24시간
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/public/js/list.js", express.static(__dirname + "/public/js/list.js"));
app.use(
  "/public/js/signup.js",
  express.static(__dirname + "/public/js/signup.js")
);

app.set("view engine", "ejs");
//nodejs 사용시 html 에서 외부 css 파일을 불러올 경우 에러가 떠 css 시트가 적용이 안됨 아래와 같은 코드로 public 정의 해줌
app.use(express.static(path.join(__dirname, "public")));

//모듈 파일
const borderapi = require("./module/bordermodule.js");
const loginapi = require("./module/signupmd.js");
const connect = require("./module/db_conn.js");

app.use(bodyParser.urlencoded({ extends: true }));
const port = 8080;

app.listen(port, connect.db, (req, res) => {
  console.log("서버연결");
});
//홈
app.use("/", require("./routes/homepage.js"));

//글작성
app.use("/write", require("./routes/homepage.js"));

//읽기 api
app.get("/list", borderapi.listRead);

//페이징 test api
app.get("/page/:page", borderapi.pagetest);

//검색 api
app.get("/search", borderapi.search);
// 삭제 api
app.delete("/delete", borderapi.delete);

// detail/:id 는  URL 파라미터
app.get("/detail/:id", borderapi.detailread);

//edit/:id 위와 동일하게 URL 파라미터 사용
app.get("/edit/:id", borderapi.editPage);

// 수정 api
app.put("/edit", borderapi.editUpdate);

//로그인
app.use("/login", require("./routes/homepage.js"));

//로그인 api
app.post("/login", require("./routes/loginrouter.js"));

//로그인 실패
app.get("/file", require("./routes/loginrouter.js"));

//회원가입
app.use("/signup", pageLogin, require("./routes/homepage.js"));

//회원가입 api
app.post("/register", loginapi.signup);

//로그아웃
app.get("/logout", require("./routes/loginrouter.js"));

//내정보
app.get("/mypage", require("./routes/homepage.js"));

//세션 확인 함수
function pageLogin(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

//로그인 api
app.use(require("./routes/loginrouter.js"));

//글 작성 api
app.post("/add", borderapi.post);
//
app.post("/mail", require("./routes/auth.js"));

//페이징 api
app.post("/apitest", require("./routes/border.js"));
//

//댓글 api
app.post("/comment", borderapi.comments);
//
app.get("/test", (req, res) => {
  res.render("drinktest.ejs");
});
//
app.get("/test2/:id", borderapi.editPage);
//

//댓글삭제
app.delete("/commentdelete", borderapi.commentdelete);
//

//댓글 수정
app.post("/commentedit", borderapi.commentEditUpdate);
//댓글 수정
