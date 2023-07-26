




function handleLogIn(event, form) {
    event.preventDefault();  // 폼의 기본 동작인 제출을 방지합니다.

    check(form);
}



function check(form) {
    
    var userid = form.userid.value;
    var userpassword = form.userpassword.value;
    var userpassword2 = form.userpassword2.value;


    if (!userid || !userpassword) {
        var missingFields = [];
    
        
        if (!userid) missingFields.push("아이디");
        if (!userpassword) missingFields.push("비밀번호");
        
    
        alert("다음 공란을 입력해주세요: " + missingFields.join(", "));
        location.reload();
        return;
    }
            //공백 있을 시 다시 처리

    if (userid === "1234" && userpassword === "1234" && userpassword === userpassword2) { 
        alert("회원가입되셨습니다.");
        window.location.href = 'main6.html';
      } else {
        if (userid !== "1234") {
          alert("아이디를 확인해 주세요");
        }  
        else {
          alert("비밀번호를 확인해주세요.");
        }
        location.reload();
      }
}
        //userid, userpassword 다시 처리