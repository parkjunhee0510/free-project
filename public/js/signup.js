    const pwd1 = document.querySelector('#userPW1');
    const pwd2 = document.querySelector('#userPW2');
    const btn = document.querySelector('#login_submit');
    const login_form = document.querySelector('#login_form');

    function password_check(){
	      return pwd1.value == pwd2.value;
    } 
    
    btn.addEventListener('click',()=>{

    let pwd_check = password_check();

    if(pwd_check){

        // login_form.submit();
        alert('비밀번호 설정가능')
    
    } else {
        alert('비밀번호 확인을 다시 해주세요');
        pwd1.value ='';
        pwd2.value ='';
        pwd1.focus();

    }
    })