const goodsListAll = document.querySelector('.goodsListAll');
const topMenuBtns = document.querySelectorAll('ul.topMenu li');
topMenuBtns.forEach((btns)=>{
	btns.addEventListener('click', (btn)=>{
		let btnMode = btn.target.dataset.btn;
		if(btnMode == 'home'){
			location.href = '/';
		}else{
			location.href = btnMode;
		}
	});
});