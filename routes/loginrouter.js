const express = require("express");
var router = require("express").Router();
const bcrypt = require("bcrypt");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//로그인
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "file", //인증 실패시 file 실행
  }),
  (req, res) => {
    //인증 성공시 home으로 이동

    //쿠키생성
    res.cookie("user", req.body.id);
    res.redirect("/");
  }
);

//로그아웃
router.get("/logout", (req, res, next) => {
  req.session.destroy();
  //쿠키 삭제
  res.cookie("user", "", { maxAge: 0 });
  res.redirect("/");
});

passport.use(
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

//로그인 성공시 세션 저장 아이디/비번 검증 성공시 USER로 데이터 전송
passport.serializeUser((user, done) => {
  //user로 전달받은 id값으로 세션 저장
  done(null, user.id);
});

//세션 데이터로 DB에서 정보를 찾음
passport.deserializeUser((id, done) => {
  //user 세션으로 db에서 정보를 찾아 mypage로 넘겨줌
  db.collection("login").findOne({ id: id }, (error, result) => {
    done(null, result);
  });
});

router.get("/file", (req, res) => {
  res.redirect("/login");
});

//

module.exports = router;
