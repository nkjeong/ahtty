"use strict";
const articleContentWrapper = document.querySelector('.articleContentWrapper');
const htmlCode = document.querySelector('.htmlCode');
const itemName = document.querySelector('.itemName');
const itemOption = document.querySelector('.itemOption');
const representativeImageRight = document.querySelector('.representativeImageRight');
const detailImageRight = document.querySelector('.detailImageRight');
const right = document.querySelector('.right');
const itemCount = document.querySelector('.itemCount');

(function getGoodsList(){
	fetch('/goods/goodsList').then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			data.forEach((d)=>{
				let imgPre = d.nameEng.toLowerCase();
				let imgName = `${imgPre}_${d.code}`;
				let itemName = d.item_name_reg;
				let manu_code = d.manufacturingCompany_code;
				let option = d.option;
				setHtml += `
					<section class="articleContent" data-imgname="${imgName}" data-itemname="${itemName}" data-manufacturingcompanycode="${manu_code}" data-goodscode="${d.code}" data-option="${option}">
						<article>
							<div>
								<input class="form-check-input" type="checkbox">
							</div>
						</article>		<!--1-->
						<article><img src="http://twin19.synology.me:8080/images/1000/${imgName}.jpg" class="representativeImage"></article>		<!--2-->
						<article>${d.barcode}</article>		<!--3-->
						<article>${itemName}</article>		<!--4-->
						<article>${d.item_standard}</article>		<!--5-->
						<article>${d.item_number}</article>		<!--6-->
						<article>${d.category}</article>	<!--7-->
						<article>${d.item_origin}</article>		<!--8-->
						<article>${d.nameKor}</article>		<!--9-->
						<article>${Number(d.item_retailPrice).toLocaleString('ko-KR')}</article>	<!--10-->
						<article>${Number(d.item_purchasePrice).toLocaleString('ko-KR')}</article>		<!--11-->
						<article>${Number(d.item_SalePrice_1).toLocaleString('ko-KR')}</article>		<!--12-->
						<article>${d.discontinued}</article>		<!--13-->
						<article>${d.outOfStock}</article>		<!--14-->
					</section>
				`;
			});
			itemCount.innerHTML = `전체 상품개수 : ${data.length}개`;
			articleContentWrapper.innerHTML = setHtml;
			const articleContent = articleContentWrapper.querySelectorAll('.articleContent');
			articleContent.forEach((lineBtn, idx)=>{
				lineBtn.addEventListener('click', (btn)=>{
					btn.stopPropagation();
					selectLine(btn.currentTarget, articleContent, idx);
				}, true);
			});
		});
	})
})();

function selectLine(line, wrapper, idx){
	wrapper.forEach((l, i)=>{
		if(idx == i){
			l.style.backgroundColor = '#000000';
			l.style.color = '#ffffff';
		}else{
			l.style.backgroundColor = '';
			l.style.color = '#777a81';
		}
	});
	itemName.innerHTML = `${line.dataset.itemname}`;
	let imgCode = line.dataset.imgname;
	htmlCode.innerText = 
	`<div style="width:100%; text-align:center;">
	     <img src="http://twin19.synology.me:8080/images/detail/${imgCode}.jpg">
	 </div>`;
	representativeImageRight.innerHTML =
	`<img src="http://twin19.synology.me:8080/images/1000/${imgCode}.jpg">
	`;
	detailImageRight.innerHTML =
	`<img src="http://twin19.synology.me:8080/images/detail/${imgCode}.jpg">
	`;
	let manufacturCode = line.dataset.manufacturingcompanycode;
	let goodsCode = line.dataset.goodscode;
	let isOption = line.dataset.option;
	if(isOption == 'Y'){
		getOption(goodsCode, manufacturCode).then((response)=>{
			response.json().then((data)=>{
				itemOption.style.fontSize = '0.7rem';
				itemOption.style.textAlign = 'left';
				itemOption.style.fontWeight = '400';
				itemOption.style.padding = '10px';
				itemOption.innerHTML = `
					옵션명 : ${data.optionName}<br>
					옵션값 : ${data.optionValue}
				`;
			});
		});
	}else{
		itemOption.style.fontSize = '1.0rem';
		itemOption.style.textAlign = 'center';
		itemOption.style.fontWeight = '700';
		itemOption.innerHTML = `Option 없음`;
	}
	
}

function documentSize(){
	let docHeight = document.body.getBoundingClientRect();
	articleContentWrapper.style.height = `${docHeight.height-70-40-40-50}px`;
	right.style.height = `${docHeight.height-70-40}px`;
};
documentSize();
window.addEventListener('resize',()=>{
	documentSize();
});

htmlCode.addEventListener('click', ()=>{
	navigator.clipboard.writeText(htmlCode.innerText).then(() => {
		alert("복사 완료!");
	});
});

async function getOption(imgCode, manufacturCode){
	return await fetch(`/goods/getOption?imgCode=${imgCode}&manufacturCode=${manufacturCode}`);
}