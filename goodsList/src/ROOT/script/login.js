"use strict";
const loginMassage = document.querySelector(".loginMassage");

const loginForm = document.querySelector('.loginForm');
if(loginForm != null){
	loginForm.addEventListener('submit',(e)=>{
		e.preventDefault();
	});
}

const userId = document.querySelector('.userId');
window.addEventListener('load', ()=>{
	userId.focus();
});


async function login(getForm, page){
	const getFData = new FormData(getForm);
	const loginData = {};
    getFData.forEach((value, key)=>{
        loginData[key] = value;
    });
    
	await fetch('/member/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers:{
            'Content-Type': 'application/json',
            'charset': 'UTF-8'
        }
    }).then((response)=>{
		response.json().then((data)=>{
			let condi = data.condi;
			if(condi == 'WRONG-PASSWORD'){
				loginMassage.innerHTML = `<span style="color:red;">비밀번호가 틀렸습니다.</span>`;
			}else if(condi == 'NO-MEMBER'){
				loginMassage.innerHTML = `<span style="color:red;">등록된 아이디가 아닙니다.</span>`;
			}else{
				if(page == 'index'){
					location.href='/';
				}else{
					location.href='/main';
				}
			}
		});
	});
}