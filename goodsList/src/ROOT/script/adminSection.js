"use strict";
const memberCnt = document.querySelector('.memberCnt');
const goodsCnt = document.querySelector('.goodsCnt');
const category = document.querySelector('section.categoryWrapper .leftContent');
const manufactur = document.querySelector('section.manufacturWrapper .leftContent');
if(memberCnt != null){
	(function getMemberCnt(){
		fetch('/member/getMemberCount').then((response)=>{
			response.json().then((data)=>{
				memberCnt.innerHTML = `회원수 : ${data.mcount}명`;
			});
		});
	})();
}

(function getGoodsCnt(){
	fetch('/goods/getGoodsCount').then((response)=>{
		response.json().then((data)=>{
			goodsCnt.innerHTML = `전체상품수 : ${data.gcount}개`;
		});
	});
})();

(function getCategory_1(){
	fetch('/goods/getCategory').then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			data.forEach((c)=>{
				setHtml += `
					<article data-catecode="${c.code}">
						${c.name}
						<article class="category_2"></article>
					</article>
				`;
			});
			category.innerHTML = setHtml;
			const getCategory_2 = category.querySelectorAll('article');
			getCategory_2.forEach((category_1)=>{
				category_1.addEventListener('mouseenter',(e)=>{
					e.stopPropagation();
					setCategory_2(e);
				}, true);
				category_1.addEventListener('mouseleave',(e)=>{
					setCategory_2(e);
				});
			});
		});
	});
})();

(function getManufacturingCompany(){
	fetch('/goods/getManufacturingCompany').then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			data.forEach((c)=>{
				setHtml += `
					<article data-manufacturcode="${c.code}">${c.nameKor}</article>
				`;
			});
			manufactur.innerHTML = setHtml;
		});
	});
})();

function setCategory_2(cate){
	let catecode = cate.currentTarget.dataset.catecode;
	let cate_2 = cate.currentTarget.querySelector('.category_2');
	if(cate_2 != null){
		if(cate.type == 'mouseenter'){
			cate_2.style.display = 'flex';
			cate_2.style.position = 'absolute';
			cate_2.style.width = '150px';
			cate_2.style.height = '150px';
			cate_2.style.border = 'solid 1px #202125';
			cate_2.style.borderRadius = '10px';
			cate_2.style.backgroundColor = '#0c0c0c';
			cate_2.style.top = '0';
			cate_2.style.left = '140px';
			
		}else{
			cate_2.style.display = 'none';
		}
	}
}