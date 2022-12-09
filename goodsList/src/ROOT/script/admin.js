"use strict";
const memberCnt = document.querySelector('.memberCnt');

if(memberCnt != null){
	(function(){
		fetch('/member/getMemberCount').then((response)=>{
			response.json().then((data)=>{
				memberCnt.innerHTML = `회원수 : ${data.mcount}명`;
			});
		});
	})();
}