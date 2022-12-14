"use strict";
const articleContentWrapper = document.querySelector('.articleContentWrapper');
const htmlCode = document.querySelector('.htmlCode');
const itemName = document.querySelector('.itemName');
const itemOption = document.querySelector('.itemOption');
const itemKeyword = document.querySelector('.itemKeyword');
const representativeImageRight = document.querySelector('.representativeImageRight');
const detailImageRight = document.querySelector('.detailImageRight');
const right = document.querySelector('.right');
const left = document.querySelector('.left');
const itemCount = document.querySelector('.itemCount');
const itemNotice = document.querySelector('.itemNotice');
const ckAll = document.querySelector('.ckAll');

function getGoodsList(mode, keyword){
	let searURL = '';
	if(mode == 'all' && keyword == 'all'){
		searURL = `/goods/goodsList`;
	}else{
		searURL = `/goods/goodsList?mode=${mode}&keyword=${keyword}`;
	}
	fetch(searURL).then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			if(data.length > 0){
				data.forEach((d)=>{
					let imgPre = d.nameEng.toLowerCase();
					let imgName = `${imgPre}_${d.code}`;
					let itemName = d.item_name_reg;
					let manu_code = d.manufacturingCompany_code;
					let option = d.option;
					let keyword = d.keyword;
					let notice = d.notice;
					let item_number = '';
					if(d.item_number == 'N'){
						item_number = '없음';
					}else{
						item_number = d.item_number;
					}
					setHtml += `
						<section class="articleContent" data-imgname="${imgName}" data-itemname="${itemName}" data-manufacturingcompanycode="${manu_code}" data-goodscode="${d.code}" data-option="${option}" data-keyword="${keyword}" data-notice="${notice}">
							<article>
								<div>
									<input class="form-check-input" type="checkbox">
								</div>
							</article>		<!--1-->
							<article><img src="http://twin19.synology.me:8080/images/1000/${imgName}.jpg" class="representativeImage"></article>		<!--2-->
							<article>${d.barcode}</article>		<!--3-->
							<article>${itemName}</article>		<!--4-->
							<article>${d.item_standard}</article>		<!--5-->
							<article>${item_number}</article>		<!--6-->
							<article>${d.category}</article>	<!--7-->
							<article>${d.item_origin}</article>		<!--8-->
							<article>${d.nameKor}</article>		<!--9-->
							<article>${Number(d.item_retailPrice).toLocaleString('ko-KR')}</article>	<!--10-->
							<article>${Number(d.item_purchasePrice).toLocaleString('ko-KR')}</article>		<!--11-->
							<!--<article>${Number(d.item_SalePrice_1).toLocaleString('ko-KR')}</article>-->		<!--12-->
							<article>${d.discontinued}</article>		<!--13-->
							<article>${d.outOfStock}</article>		<!--14-->
						</section>
					`;
				});
			}else{
				if(mode == 'search'){
					setHtml = `<section class="noSearch">"${keyword}" 검색된 데이터가 없습니다.</section>`;
				}else{
					setHtml = `<section class="noSearch">검색된 데이터가 없습니다.</section>`;
				}
			}

			itemCount.innerHTML = `전체 상품개수 : ${data.length}개`;
			articleContentWrapper.innerHTML = setHtml;
			const articleContent = articleContentWrapper.querySelectorAll('.articleContent');
			articleContent.forEach((lineBtn, idx)=>{
				lineBtn.addEventListener('click', (btn)=>{
					btn.stopPropagation();
					selectLine(btn.currentTarget, articleContent, idx);
				}, true);
			});
			
			ckAll.removeEventListener('click', checkAll);
			ckAll.addEventListener('click', checkAll);
			
			selectedDownBtn.removeEventListener('click', ckExcel);
			selectedDownBtn.addEventListener('click', ckExcel);
		});
	});
}

getGoodsList('all', 'all');

const ckExcel = function(e) {
	let ckCnt = 0
	const ckEle = e.target.closest('.main').querySelectorAll('section.articleContent article div input[type=checkbox]');
	let ckData = '';
	ckEle.forEach((eles)=>{
		if(eles.checked){
			ckCnt++;
			ckData += eles.closest('.articleContent').dataset.manufacturingcompanycode+""+eles.closest('.articleContent').dataset.goodscode+';';
		}
	});
	if(ckCnt == 0){
		alert('선택된 상품이 없습니다. 상품을 선택하세요.');
	}else{
		let fetchData = ckData.substring(0, ckData.length-1);
		let excelForm = document.createElement('form');
		excelForm.setAttribute('method', 'Post')
		excelForm.setAttribute('action', '/download/excel');
		
		let excelInput_data = document.createElement('input');
		excelInput_data.setAttribute('type', 'hidden');
        excelInput_data.setAttribute('name', 'getData');
        let excelInput_mode = document.createElement('input');
		excelInput_mode.setAttribute('type', 'hidden');
        excelInput_mode.setAttribute('name', 'mode');
        
        excelInput_data.value = fetchData;
        excelInput_mode.value = 'ck';
        
        
        excelForm.appendChild(excelInput_data);
        excelForm.appendChild(excelInput_mode);
		document.body.appendChild(excelForm);
		excelForm.submit();
	}
}

const checkAll = function(e) {
	let cked = true;
	if(!e.target.checked) cked = false;
	const ckEle = e.target.closest('.main').querySelectorAll('section.articleContent article div input[type=checkbox]');
	ckEle.forEach((eles)=>{
		eles.checked = cked;
	});
}

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
	let keyword = line.dataset.keyword;
	itemKeyword.innerHTML = `추가검색어 : ${keyword}`;
	let notice = line.dataset.notice;
	itemNotice.innerHTML = `추가사항 : ${notice}`;
}

function documentSize(){
	let docHeight = document.body.getBoundingClientRect();
	articleContentWrapper.style.height = `${docHeight.height-70-40-40-50}px`;
	right.style.height = `${docHeight.height-70-40}px`;
	left.style.height = `${docHeight.height-70-40}px`;
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