const id1 = document.querySelector("#userID");
const pwd1 = document.querySelector("#userPW1");
const pwd2 = document.querySelector("#userPW2");
const btn = document.querySelector("#login_submit");
const login_form = document.querySelector("#login_form");

function password_check() {
  return pwd1.value == pwd2.value;
}

btn.addEventListener("click", () => {
  let pwd_check = password_check();

  if (pwd_check) {
    // login_form.submit();
    alert("비밀번호 설정가능");
  } else {
    alert("비밀번호 확인을 다시 해주세요");
    pwd1.value = "";
    pwd2.value = "";
    pwd1.focus();
  }
});

function checkPw() {
  let id = $("#userID").val();
  let pw = $("#userPW1").val();
  let number = pw.search(/[0-9]/g);
  let english = pw.search(/[a-z]/gi);
  let spece = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  if (pw.length < 8 || pw.length > 20) {
    alert("8자리 ~ 20자리 이내로 입력해주세요.");
    return false;
  } else if (pw.search(/\s/) != -1) {
    alert("비밀번호는 공백 없이 입력해주세요.");
    return false;
  } else if (number < 0 || english < 0 || spece < 0) {
    alert("영문,숫자,특수문자를 혼합하여 입력해주세요.");
    return false;
  } else if (
    (number < 0 && english < 0) ||
    (english < 0 && spece < 0) ||
    (spece < 0 && number < 0)
  ) {
    alert("영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.");
    return false;
  } else if (/(\w)\1\1\1/.test(pw)) {
    alert("같은 문자를 4번 이상 사용하실 수 없습니다.");
    return false;
  } else if (pw.search(id) > -1) {
    alert("비밀번호에 아이디가 포함되었습니다.");
    return false;
  } else {
    alert("비밀번호가 정상적으로 입력되었습니다.");
    document.getElementById("btn").style.display = "block";
    document.getElementById("login_submit").style.display = "none";

    return true;
  }

  if (false === reg.test(pw)) {
    alert(
      "비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다."
    );
    return false;
  } else {
    alert("비밀번호가 정상적으로 입력되었습니다.");
    return true;
  }
}

/* ID */
function checkId() {
  let id = $("#userID").val();
  const pattern = new RegExp("^[a-zA-Z][0-9a-zA-Z]{7,14}$");
  if (pattern.test(id)) {
    alert("성공");
    document.getElementById("login_submit").style.display = "block";
  } else {
    alert("실패");
    id1.value = "";
    id1.focus();
  }
}
