const express = require("express");

var router = require("express").Router();

router.get("/", (req, res) => {
  if (req.cookies) {
    console.log(req.cookies);
    return res.render("main.ejs", { usercookie: req.cookies });
  } else {
    res.render("main.ejs");
  }
});

router.get("/write", (req, res) => {
  res.render("write.ejs");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

router.get("/postList", (req, res) => {});

//내 정보
router.get("/mypage", pageLogin, (req, res) => {
  //passport.deserializeUser 에서 넘겨받은 db 콘솔로그 출력 확인
  console.log(req.user);
  //넘겨받은 db mypage.ejs로 데이터값 넘김
  res.render("mypage.ejs", { consumer: req.user });
});

//세션 확인 함수
function pageLogin(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
