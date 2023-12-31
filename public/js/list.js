<<<<<<< HEAD
$(".delete").click((e) => {
  var w = e.target.dataset.id; //button의 데이터 값을받아 넘겨주는 함수.

  Swal.fire({
    title: "삭제 하시겠습니까?",
    text: "삭제 하시겠습니까?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        method: "DELETE",
        url: "/delete",
        data: { _id: e.target.dataset.id },
      });
      Swal.fire({
        icon: "success",
        title: "삭제가 완료되었습니다.",
        text: "삭제완료",
      });
      console.log("삭제완료");
      $(e.target).parents("li").fadeOut();
    } else {
    }
  });
});

$("#search").click(() => {
  var searchValue = $("#search-input").val();
  window.location.replace("/search?value=" + searchValue); //URL query string
});

$(".edit").click((e) => {
  Swal.fire({
    title: "수정 하시겠습니까?",
    text: "수정 하시겠습니까?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "수정",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      location.href = "/edit/" + e.target.dataset.id;
    }
  });
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
  Swal.fire({
    title: "삭제 하시겠습니까?",
    text: "삭제 하시겠습니까?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        method: "DELETE",
        url: "/commentdelete",
        data: { _id: e.target.dataset.id },
      });
      Swal.fire({
        icon: "success",
        title: "삭제가 완료되었습니다.",
        text: "삭제완료",
      });
      console.log("삭제완료");
      window.history.go(0);
    } else {
      return false;
    }
  });
});

function moveWrite() {
  location.href = "/write";
}

function reload() {
  window.history.go(0);
}
=======
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
>>>>>>> f31af125c1a7b1d72ebcc74e14826c527eb1c8cf
