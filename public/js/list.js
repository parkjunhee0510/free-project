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
