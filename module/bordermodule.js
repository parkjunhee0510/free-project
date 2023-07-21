const { param } = require("../routes/contents");
var config = require("./config");
const MongoClient = require("mongodb").MongoClient;

const connect = require("./db_conn.js");

exports.listRead = (요청, 응답) => {
  //db 중 post 를 찾아 전체 데이터 값을 받아 출력
  db.collection("post")
    .find()
    .toArray((error, res) => {
      console.log(res);
      응답.render("list.ejs", { posts: res });
    });
};

//페이징 api 테스트
exports.pagetest = async (req, res, next) => {
  const page = req.query.page || 1;
  var skipSet = 1;
  var offset = 5;
  var setting = 0;
  db.collection("post")
    .find()
    .limit(offset)
    .skip(setting * offset)
    .toArray((error, result) => {
      try {
        if (result) {
          console.log(result);
          res.render("page.ejs", {
            posts: result,
            offset: offset,
            skipSet: skipSet - 1,
          });
          setting++;
        }
      } catch (error) {}
    });
};

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

    //res.status (200) 는 성공적으로 실행했다는 신호 200은 성공 400은 에러코드
    res.status(200).send({ message: "성공했습니다" });
  });
};
//삭제

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

exports.editUpdate = (req, res) => {
  //서버로 부터 PUT 요청 들어오면 게시물 수청 처리
  db.collection("post").updateOne(
    { _id: parseInt(req.body.id) },
    { $set: { 제목: req.body.title, 내용: req.body.date } },
    (error, result) => {
      console.log("수정완료");
      res.redirect("/list");
    }
  );
};
//수정

//쓰기
exports.post = (요청, 응답) => {
  응답.send("전송완료");

  db.collection("counter").findOne({ name: "게시물갯수" }, (error, res) => {
    console.log(res.totalPost);
    var total_post = res.totalPost;

    var postValue = {
      _id: total_post + 1,
      제목: 요청.body.title,
      내용: 요청.body.date,
      작성자: 요청.user._id,
      작성자ID: 요청.user.id,
    };
    //폼 태그에 입력시 id 값을 찾아 제목,내용 테이블에 데이터 기입
    db.collection("post").insertOne(postValue, (에러, 결과) => {
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
    });
  });

  console.log(요청.body.title);
  console.log(요청.body.date);
};
//쓰기

//상세글 보기

exports.detailread = (req, res) => {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    (error, result) => {
      console.log(result);
      res.render("detail.ejs", { data: result });
    }
  );
};
