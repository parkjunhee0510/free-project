var config = require("./config");
const MongoClient = require("mongodb").MongoClient;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const { smtpTransport } = require("./email");

const connect = require("./db_conn.js");

var generateRandomNumber = function (min, max) {
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

exports.emailAuth = async (req, res) => {
  const number = generateRandomNumber(111111, 999999);

  const { email } = req.body; //사용자가 입력한 이메일

  const mailOptions = {
    from: "junhee5143@naver.com ", // 발신자 이메일 주소.
    to: email, //사용자가 입력한 이메일 -> 목적지 주소 이메일
    subject: " 인증 관련 메일 입니다. ",
    html: "<h1>인증번호를 입력해주세요 \n\n\n\n\n\n</h1>" + number,
  };
  smtpTransport.sendMail(mailOptions, (err, response) => {
    console.log("response", response);
    //첫번째 인자는 위에서 설정한 mailOption을 넣어주고 두번째 인자로는 콜백함수.
    if (err) {
      res.json({ ok: false, msg: " 메일 전송에 실패하였습니다. " });
      smtpTransport.close(); //전송종료
      return;
    } else {
      smtpTransport.close(); //전송종료
      res.render("signup.ejs", { emailToken: email });
    }
  });
};

//회원가입 api
exports.signup = (req, res) => {
  db.collection("login").findOne({ id: req.body.id }, (error, result) => {
    //아이디 중복 체크
    console.log(result);
    if (result) {
      return console.log("중복체크 테스트");
    } else {
      const userpw = bcrypt.hashSync(req.body.pw, 5); //bycrypt 를 이용한 패스워드 암호화
      db.collection("login").insertOne(
        {
          name: req.body.name, //사용자 이름
          nickName: req.body.nickName, //사용자 닉네임
          id: req.body.id, //사용자 ID
          pw: userpw, //사용자 패스워드
          myPost: 0,  //마이페이지 내가 쓴 글
          myCommentPost: 0, //마이페이지 내가 쓴 댓글
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
      if (db.collection("login").findOne({ id: UserId })) {
        console.log("테스트");
      }
      db.collection("login").findOne({ id: UserId }, function (error, result) {
        //로그인 여부에 따른 출력방법

        //암호화한 패스워드 복호화 과정 똑같을시 same 에 true 값이 반영됨
        const same = bcrypt.compareSync(UserPw, result.pw);
        if (error) {
          console.log("로그인 실패");
          return done(null, false, { message: "존재하지않는 아이디 입니다." });
        }

        if (!result) {
          console.log("로그인 실패");
          return done(null, false, { message: "존재하지않는 아이디 입니다." });
        }
        //same에 true 값 있을시 로그인 성공
        if (same) {
          return done(null, result);
        } else {
          console.log("비밀번호 오류", result.pw);
          return done(null, false, { message: "비밀번호가 틀렸습니다." });
        }
      });
    }
  )
);
