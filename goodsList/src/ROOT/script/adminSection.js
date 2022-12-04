"use strict";
const memberCnt = document.querySelector('.memberCnt');
const goodsCnt = document.querySelector('.goodsCnt');
const category = document.querySelector('section.categoryWrapper .leftContent');
const manufactur = document.querySelector('section.manufacturWrapper .leftContent');
(function getMemberCnt(){
	fetch('/member/getMemberCount').then((response)=>{
		response.json().then((data)=>{
			memberCnt.innerHTML = `회원수 : ${data.mcount}명`;
		});
	});
})();

(function getGoodsCnt(){
	fetch('/goods/getGoodsCount').then((response)=>{
		response.json().then((data)=>{
			goodsCnt.innerHTML = `상품수 : ${data.gcount}개`;
		});
	});
})();

(function getCategory_1(){
	fetch('/goods/getCategory').then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			data.forEach((c)=>{
				setHtml += `
					<article data-catecode="${c.code}">${c.name}</article>
				`;
			});
			category.innerHTML = setHtml;
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