"use strict";
const articleContentWrapper = document.querySelector('.articleContentWrapper');
const htmlCode = document.querySelector('.htmlCode');
const itemName = document.querySelector('.itemName');
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
				setHtml += `
					<section class="articleContent" data-imgname="${imgName}" data-itemname="${itemName}">
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
		}else{
			l.style.backgroundColor = '';
		}
	});
	itemName.innerHTML = `${line.dataset.itemname}`;
	let imcCode = line.dataset.imgname;
	htmlCode.innerText = 
	`<div style="width:100%; text-align:center;">
	     <img src="http://twin19.synology.me:8080/images/detail/${imcCode}.jpg">
	 </div>`;
	representativeImageRight.innerHTML =
	`<img src="http://twin19.synology.me:8080/images/1000/${imcCode}.jpg">
	`;
	detailImageRight.innerHTML =
	`<img src="http://twin19.synology.me:8080/images/detail/${imcCode}.jpg">
	`;
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
	window.navigator.clipboard.writeText(htmlCode.innerText).then(() => {
		alert("복사 완료!");
	});
});