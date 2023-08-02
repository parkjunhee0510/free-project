const express = require("express");
var router = require("express").Router();

router.get("/list", (요청, 응답) => {
  //db 중 post 를 찾아 전체 데이터 값을 받아 출력
  app.db
    .collection("post")
    .find()
    .toArray((error, res) => {
      console.log(res);
      응답.render("list.ejs", { posts: res });
    });
});

router.post("/apitest", (req, res) => {});

module.exports = router;
