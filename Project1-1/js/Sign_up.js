
      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyDYxB-FhjnJ3YiO2bSNDGuDqFf4DG-X1J8",
        authDomain: "pjpractice-3c1c3.firebaseapp.com",
        projectId: "pjpractice-3c1c3",
        storageBucket: "pjpractice-3c1c3.appspot.com",
        messagingSenderId: "282328555684",
        appId: "1:282328555684:web:7962110bac74dd28a30631",
        measurementId: "G-RH03816HP3"
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);

      import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

      document.getElementById('btn1').addEventListener('click', (event) => {
        event.preventDefault()
        const email = document.getElementById('SignUpEmail').value
        const password = document.getElementById('SignUpPW').value
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential)
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            console.log('error')
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      }) 


    function signInSubmit(event, form) {
      event.preventDefault();  // 폼의 기본 동작인 제출을 방지=> 이후 check(form)함수 작동 가능;

      check(form);
}

function check(form) {
    var username = form.username.value;
    var userid = form.userid.value;
    var userpassword = form.userpassword.value;
    var userpassword2 = form.userpassword2.value;


    if (!username || !userid || !userpassword || !userpassword2) {
        var missingFields = [];
    
        if (!username) missingFields.push("이름");
        if (!userid) missingFields.push("아이디/이메일");
        if (!userpassword) missingFields.push("비밀번호");
        if (!userpassword2) missingFields.push("비밀번호 확인");
    
        alert("다음 공란을 입력해주세요: " + missingFields.join(", "));
        location.reload();
        return;
    }


    if (userid === "123123" && userpassword === "123123" && userpassword === userpassword2) {
        alert("회원가입되셨습니다.");
        window.location.href = 'main6.html';
      } else {
        if (userid !== "sk020603@naver.com") {
          alert("이미 가입된 아이디입니다.");
        } else if (userpassword !== userpassword2) {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          alert("아이디와 비밀번호를 확인해주세요.");
        }
        location.reload();
      }
}




      console.log("하이")
      console.log(app)


