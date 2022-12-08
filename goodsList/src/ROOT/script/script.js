"use strict";
const main = document.querySelector('.main');
const logoutBtn = document.querySelector('.logoutBtn');
const homeListBtn = document.querySelector('.homeListBtn');

(function (){
	main.style.backgroundColor = '#18191d';
	main.style.justifyContent = 'flex-start';
})();

if(logoutBtn != null){
	logoutBtn.addEventListener('click', (btn)=>{
		location.href = '/member/logout';
	});
}
homeListBtn.addEventListener('click', (btn)=>{
	getGoodsList('all', 'all');
});