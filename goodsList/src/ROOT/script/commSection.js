"use strict";
const category = document.querySelector('section.categoryWrapper .leftContent');
const manufactur = document.querySelector('section.manufacturWrapper .leftContent');
const category_2 = document.querySelector('.category_2');
const goodsCnt = document.querySelector('.goodsCnt');
const goodsRegBtn = document.querySelector('.goodsRegBtn');
const content = document.querySelector('.content');

(function(){
	fetch('/manufactur/getManufacturingCompany').then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			data.forEach((c)=>{
				setHtml += `
					<article data-manufacturcode="${c.code}">${c.nameKor}</article>
				`;
			});
			manufactur.innerHTML = setHtml;
			const manufacturBtn = manufactur.querySelectorAll('article');
			manufacturBtn.forEach((btns)=>{
				btns.addEventListener('click',(btn)=>{
					let keyword = btn.target.dataset.manufacturcode;
					getGoodsList('manufactur', keyword);
				});
			});
		});
	});
})();

(function(){
	fetch('/category/getCategory').then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			data.forEach((c)=>{
				setHtml += `
					<article data-catecode="${c.code}" class="category_1">
						${c.name}
					</article>
				`;
			});
			category.innerHTML = setHtml;
			const category_1Btn = category.querySelectorAll('.category_1');
			category_1Btn.forEach((btns)=>{
				btns.addEventListener('click',(btn)=>{
					btn.stopPropagation();
					let keyword = btn.currentTarget.dataset.catecode;
					getGoodsList('category_1', keyword);
				});
				btns.addEventListener('mouseenter',(btn)=>{
					let cateLocation = btn.currentTarget.getBoundingClientRect();
					let category_2_y = cateLocation.y;
					category_2.style.top = `${category_2_y}px`;
					category_2.classList.add('category_2_ef');
					showCategory_2(btn, category_2_y);
				});
				btns.addEventListener('mouseleave',(btn)=>{
					category_2.style.top = '-300px';
				});
			});
		});
	});
})();
function showCategory_2(cate, y){
	let cateCode = cate.currentTarget.dataset.catecode;
	let setHtml = '';
	getCategory_2(cateCode).then((response)=>{
		response.json().then((category)=>{
			category.forEach((cate)=>{
				setHtml += `
					<article style="padding-left:10px;" data-catecode2="${cate.code}" data-catecode1="${cate.category_1_code}" class="setCategory_2">
						<article class="cate2list">${cate.name}</article>
						<!--<article class="category_3"></article>-->
					</article>
				`;
			});
			category_2.innerHTML = setHtml;
			category_2.addEventListener('mouseenter', (cate)=>{
				cate.stopPropagation();
				cate.currentTarget.style.top = `${y}px`;
			});
			category_2.addEventListener('mouseleave', (cate)=>{
				cate.stopPropagation();
				cate.currentTarget.style.top = '-300px';
			});
			const category_2Btns = category_2.querySelectorAll('article.setCategory_2 .cate2list');
			category_2Btns.forEach((btns)=>{
				btns.addEventListener('click', (btn)=>{
					let catecode1 = btn.target.parentNode.dataset.catecode1;
					let catecode2 = btn.target.parentNode.dataset.catecode2;
					let keyword = catecode1+catecode2;
					getGoodsList('category_1', keyword);
				});
			});
		});
	});
}

(function(){
	fetch('/goods/getGoodsCount').then((response)=>{
		response.json().then((data)=>{
			goodsCnt.innerHTML = `전체상품수 : ${data.gcount}개`;
		});
	});
})();

async function getCategory_3(code_1, code_2){
	return await fetch(`/goods/getCategory_3?setCategory_1Code=${code_1}&setCategory_2Code=${code_2}`);
}

async function getCategory_2(code){
	return await fetch(`/goods/getCategory_2?setCategory_1Code=${code}`);
}

goodsRegBtn.addEventListener('click', (btn)=>{
	let reguser = btn.target.dataset.reguser;
	regItem(reguser);
});

const regItem = (reguser)=>{
	let getTable = reguser != 'A' ? reguser : 'goods';
	let setHTML = '';
	content.innerHTML = setHTML;
}