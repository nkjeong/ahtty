"use strict";
const main = document.querySelector('.main');
async function getMember(condi){
	if(condi == 'MEMBER'){
		await fetch('/member/session.jsp').then((response)=>{
			response.json().then((member)=>{
				mainContent(member);
			});
		});
	}
}

function mainContent(memberJson){
	let mainHTML = ``;
	main.style.backgroundColor = '#18191d';
	mainHTML = `
	`;
	
	main.innerHTML = mainHTML;
}