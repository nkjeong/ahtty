"use strict";
const main = document.querySelector('.main');
const logoutBtn = document.querySelector('.logoutBtn');
const homeListBtn = document.querySelector('.homeListBtn');
const homeBtn = document.querySelector('.homeBtn');
const allDownBtn = document.querySelector('.allDownBtn');
const selectedDownBtn = document.querySelector('.selectedDownBtn');

(function (){
	main.style.backgroundColor = '#18191d';
	main.style.justifyContent = 'flex-start';
})();

if(logoutBtn != null){
	logoutBtn.addEventListener('click', ()=>{
		location.href = '/member/logout';
	});
}
homeListBtn.addEventListener('click', ()=>{
	location.href = '/main';
});
homeBtn.addEventListener('click', ()=>{
	location.href = '/';
});
allDownBtn.addEventListener('click', ()=>{
	location.href = '/download/excel?mode=all';
});