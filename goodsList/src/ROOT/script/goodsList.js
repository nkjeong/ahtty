"use strict";
const articleContentWrapper = document.querySelector('.articleContentWrapper');
const htmlCode = document.querySelector('.htmlCode');

(function getGoodsList(){
	fetch('/goods/goodsList').then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			data.forEach((d)=>{
				let imgPre = d.nameEng.toLowerCase();
				let imgName = `${imgPre}_${d.code}`;
				setHtml += `
					<section class="articleContent" data-imgname="${imgName}">
						<article><img src="http://twin19.synology.me:8080/images/1000/${imgName}.jpg" class="representativeImage"></article>		<!--1-->
						<article>${d.barcode}</article>		<!--2-->
						<article>${d.item_name_reg}</article>		<!--3-->
						<article>${d.category}</article>	<!--4-->
						<article>${d.item_origin}</article>		<!--5-->
						<article>${d.nameKor}</article>		<!--6-->
						<article>${Number(d.item_retailPrice).toLocaleString('ko-KR')}</article>	<!--7-->
						<article>${Number(d.item_purchasePrice).toLocaleString('ko-KR')}</article>		<!--8-->
						<article>${Number(d.item_SalePrice_1).toLocaleString('ko-KR')}</article>		<!--9-->
						<article>${d.discontinued}</article>		<!--10-->
						<article>${d.outOfStock}</article>		<!--11-->
					</section>
				`;
			});
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
			l.style.backgroundColor = '#202125';
		}else{
			l.style.backgroundColor = '';
		}
	});
	htmlCode.innerText = 
	`<div style="width:100%; text-align:center;">
	     <img src="http://twin19.synology.me:8080/images/detail/${line.dataset.imgname}.jpg">
	 </div>`;
}