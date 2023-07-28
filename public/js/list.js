function cookietest(user) {
  var nameOfCookie = name + "=";
}

function testbtn() {
  alert(document.cookie);
}

$(".delete").click((e) => {
  var w = e.target.dataset.id; //button의 데이터 값을받아 넘겨주는 함수.
  $.ajax({
    method: "DELETE",
    url: "/delete",
    data: { _id: e.target.dataset.id },
  })
    .done((결과) => {
      console.log("삭제완료");
      $(e.target).parents("li").fadeOut(); //버튼 클릭시 버튼의 부모객체 li가 사라지는 함수
    })
    .fail(() => {});
});

$("#search").click(() => {
  var searchValue = $("#search-input").val();
  window.location.replace("/search?value=" + searchValue); //URL query string
});

$(".edit").click((e) => {
  $.ajax({
    method: "POST",
    url: "/edit:id",
    date: { _id: e.target.dataset.id },
  });
});

$(".list").click((e) => {
  $.ajax({
    method: "POST",
    url: "/page:page",
    date: { page: e.target.dataset.page },
  });
});

$(".commentdelete").click((e) => {
  var w = e.target.dataset.id; //button의 데이터 값을받아 넘겨주는 함수.
  $.ajax({
    method: "DELETE",
    url: "/commentdelete",
    data: { _id: e.target.dataset.id },
  })
    .done((결과) => {
      console.log("삭제완료");
      $(e.target).parents("li").fadeOut(); //버튼 클릭시 버튼의 부모객체 li가 사라지는 함수
    })
    .fail(() => {});
});

function displayOnOff(e) {
  var commentId = $(".cmedit").data("id");
  alert(commentId);

  for (let i = 0; i < commentId; i++) {
    if ($(".comment-edit" + commentId).css("display") === "none") {
      $(".comment-edit" + commentId).show();
    } else {
      $(".comment-edit" + commentId).hide();
    }
  }
}

function moveList() {
  location.href = "/page/1";
}

function moveWrite() {
  location.href = "/write";
}
