const { json } = require("body-parser");
const { param } = require("../routes/contents");
var config = require("./config");
const MongoClient = require("mongodb").MongoClient;
const multer = require("multer");

const connect = require("./db_conn.js");
const { Cookie } = require("express-session");
const dayjs = require("dayjs");

exports.postList = (req, res) => {
  db.collection("post")
    .find({
      작성자ID: req.user.id,
    })
    .toArray((error, result) => {
      res.render("myPostList.ejs", { posts: result });
    });
};

exports.commentPostList = (req, res) => {
  db.collection("Comments")
    .find({
      작성자: req.user.id,
    })
    .toArray((error, result) => {
      db.collection("post")
        .find({
          작성자ID: req.user.id,
        })
        .toArray((err, ret) => {
          var title = ret.제목;
          var id = ret.id;
          res.render("myCommentList.ejs", {
            comment: result,
            title: title,
            id: id,
          });
          console.log(ret);
        });
    });
};

//페이징 api
exports.MyListPage = (req, res) => {
  const page = parseInt(req.params.page); //page 값 받아오기
  const limit = 15; // 한 페이지에 보여줄 게시물 수
  const skip = (page - 1) * limit; // 건너뛸 게시물 수

  db.collection("post")
    .find({ 작성자ID: req.user.id })
    .skip(skip)
    .limit(limit)
    .toArray((error, result) => {
      db.collection("login").findOne({ id: req.user.id }, (err, ret) => {
        console.log(ret.myPost);
        var total_post = ret.myPost;
        try {
          if (ret) {
            console.log(page);
            console.log(req.params.page);
            res.render("myPostList.ejs", {
              posts: result,
              page,
              usercookie: req.cookies.user,
              totalPost: total_post,
            });
          }
        } catch (err) {
          next(err);
        }
        //
      });
      //
    });
};
//페이징 api
