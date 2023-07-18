var config = require("./config");
const MongoClient = require("mongodb").MongoClient;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const connect = require("./db_conn.js");

//회원가입 api
exports.signup = (req, res) => {
  db.collection("login").findOne({ id: req.body.id }, (error, result) => {
    //아이디 중복 체크
    console.log(result);
    if (result) {
      return console.log("중복체크 테스트");
    } else {
      const userpw = bcrypt.hashSync(req.body.pw, 5);
      db.collection("login").insertOne(
        {
          name: req.body.name,
          id: req.body.id,
          pw: userpw,
        },
        (err, result) => {
          res.redirect("/");
        }
      );
    }
  });
};
//회원가입 api

exports.login = passport.use(
  new LocalStrategy(
    {
      //form name값을 받은것 아이디/비번 정의
      usernameField: "id",
      passwordField: "pw",
      session: true, //로그인 후 세션 저장 여부
      passReqToCallback: false, //아이디 비밀번호 말고 다른정보 검증 필요시
    },
    function (UserId, UserPw, done) {
      //console.log(입력한아이디, 입력한비번);
      db.collection("login").findOne({ id: UserId }, function (error, result) {
        //로그인 여부에 따른 출력방법

        //암호화한 패스워드 복호화 과정 똑같을시 same 에 true 값이 반영됨
        const same = bcrypt.compareSync(UserPw, result.pw);
        if (error) {
          return done(error);
        }

        if (!result) {
          console.log("로그인 실패");
          return done(null, false, { message: "존재하지않는 아이디요" });
        }
        //same에 true 값 있을시 로그인 성공
        if (same) {
          return done(null, result);
        } else {
          console.log("비밀번호 오류", result.pw);
          return done(null, false, { message: "비번틀렸어요" });
        }
      });
    }
  )
);
