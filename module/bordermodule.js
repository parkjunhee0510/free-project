const { json } = require("body-parser");
const { param } = require("../routes/contents");
var config = require("./config");
const MongoClient = require("mongodb").MongoClient;

const connect = require("./db_conn.js");
const { Cookie } = require("express-session");
const dayjs = require("dayjs");

//읽기
exports.listRead = (req, res) => {
  //db 중 post 를 찾아 전체 데이터 값을 받아 출력
  db.collection("post")
    .find()
    .toArray((error, result) => {
      console.log(result);
      res.render("list.ejs", {
        posts: result,
        //유저 쿠키를 넘겨 수정,삭제버튼 본인만 보게 기능
        usercookie: req.cookies.user,
      });
    });
};
//읽기

//페이징 api
exports.pagetest = (req, res) => {
  const page = parseInt(req.params.page); //page 값 받아오기
  const limit = 5; // 한 페이지에 보여줄 게시물 수
  const skip = (page - 1) * limit; // 건너뛸 게시물 수

  db.collection("post")
    .find()
    .skip(skip)
    .limit(limit)
    .toArray((error, result) => {
      db.collection("counter").findOne({ name: "게시물갯수" }, (err, ret) => {
        console.log(ret.totalPost);
        var total_post = ret.totalPost;
        try {
          if (ret) {
            console.log(page);
            console.log(req.params.page);
            res.render("page.ejs", {
              posts: result,
              page,
              usercookie: req.cookies.user,
              totalPost: ret.totalPost,
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

//삭제
exports.delete = (req, res) => {
  console.log(req.body._id);

  //id 값은 int형식임으로 parseInt 함수로 이용하여 int로 변환 시켜줌
  req.body._id = parseInt(req.body._id);
  var deleteData = { _id: req.body._id, 작성자: req.user._id };
  console.log(req.body._id);

  //db id데이터 값을 찾아 삭제
  db.collection("post").deleteOne(deleteData, (error, result) => {
    console.log("삭제완료");
    db.collection("counter").updateOne(
      { name: "게시물갯수" },
      { $inc: { totalPost: -1 } },
      (err, ret) => {
        if (error) {
          return console.log("에러");
        }
      }
    );

    //res.status (200) 는 성공적으로 실행했다는 신호 200은 성공 400은 에러코드
    res.status(200).send({ message: "성공했습니다" });
  });
};
//삭제

//댓글삭제
exports.commentdelete = (req, res) => {
  console.log(req.body._id);

  //id 값은 int형식임으로 parseInt 함수로 이용하여 int로 변환 시켜줌
  req.body._id = parseInt(req.body._id);
  var deleteData = { _id: req.body._id, 작성자: req.user.id };
  console.log(req.body._id);

  //db id데이터 값을 찾아 삭제
  db.collection("Comments").deleteOne(deleteData, (error, result) => {
    console.log("삭제완료");

    //res.status (200) 는 성공적으로 실행했다는 신호 200은 성공 400은 에러코드
    res.status(200).send({ message: "성공했습니다" });
  });
};
//댓글삭제

//검색
exports.search = (req, res) => {
  console.log(req.query.value);
  var Search = [
    {
      $search: {
        index: "titleSearch",
        text: {
          query: req.query.value,
          path: "제목", // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
        },
      },
    },
    { $sort: { _id: 1 } },
  ];
  db.collection("post")
    .aggregate(Search)
    .toArray((err, result) => {
      console.log(result);
      res.render("search.ejs", { posts: result });
    });
};
//검색

//수정
exports.editPage = (req, res) => {
  //url 파라미터 값을 이용하여 db에서 id값을 찾아 보내줌
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    (error, result) => {
      console.log(result);
      res.render("edit.ejs", { data: result });
    }
  );
};

//수정
exports.editUpdate = (req, res) => {
  //서버로 부터 PUT 요청 들어오면 게시물 수청 처리
  db.collection("post").updateOne(
    { _id: parseInt(req.body.id) },
    { $set: { 제목: req.body.title, 내용: req.body.date } },
    (error, result) => {
      console.log("수정완료");
      res.redirect("/page/1");
    }
  );
};
//수정

//댓글수정
exports.commentEditUpdate = (req, res) => {
  //서버로 부터 PUT 요청 들어오면 게시물 수청 처리
  db.collection("post").updateOne(
    { _id: parseInt(req.body._id) },
    { $set: { 작성내용: req.body.date } },
    (error, result) => {
      console.log("수정완료");
    }
  );
};
//댓글수정

//쓰기
exports.post = (요청, 응답) => {
  const time = dayjs();

  db.collection("counter").findOne({ name: "게시물갯수" }, (error, res) => {
    console.log(res.totalPost);
    var total_post = res.totalPost;

    var postValue = {
      _id: total_post + 1,
      제목: 요청.body.title,
      내용: 요청.body.date,
      작성자: 요청.user._id,
      작성자ID: 요청.user.id,
      작성날짜: time.format("YYYY-MM-DD HH:mm:ss"),
    };
    //폼 태그에 입력시 id 값을  찾아 제목,내용 테이블에 데이터 기입
    db.collection("post").insertOne(postValue, (에러, 결과) => {
      console.log("저장완료");
      응답.redirect("/page/1");
      // db 개수 증가 함수
      db.collection("counter").updateOne(
        { name: "게시물갯수" },

        // 오퍼레이터 연산자
        { $inc: { totalPost: 1 } },
        (error, ret) => {
          if (error) {
            return console.log("에러");
          }
        }
      );
    });
  });
};
//쓰기

//댓글
exports.comments = (req, res) => {
  const time = dayjs();

  db.collection("commentcounter").findOne({ name: "댓글개수" }, (err, ret) => {
    var total_post = ret.totalComment;

    var Comments = {
      id: req.body.cmdate,
      _id: total_post + 1,
      작성자: req.user.id,
      작성내용: req.body.date,
      작성날짜: time.format("YYYY-MM-DD HH:mm:ss"),
    };
    db.collection("Comments").insertOne(Comments, (error, result) => {
      console.log(result);

      db.collection("commentcounter").updateOne(
        { name: "댓글개수" },

        { $inc: { totalComment: 1 } },
        (에러, 결과) => {
          if (에러) {
            return console.log("에러");
          }
        }
      );
    });
  });
};
//댓글

//상세글 보기

exports.detailread = (req, res) => {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    (error, result) => {
      //댓글 기능
      db.collection("Comments")
        .find()
        .toArray((err, ret) => {
          try {
            res.render("detail.ejs", {
              data: result,
              comment: ret,
              id: parseInt(req.params.id),
              usercookie: req.cookies.user,
            });
            console.log(ret);
            console.log(req.params.id);
          } catch (err) {
            next(err);
          }
        });
    }
  );
};
//상세글보기
