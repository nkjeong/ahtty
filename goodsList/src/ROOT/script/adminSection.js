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

(function getCategory_1(){
	fetch('/category/getCategory').then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			data.forEach((c)=>{
				setHtml += `
					<article data-catecode="${c.code}" class="category_1">
						${c.name}
						<article class="category_2"></article>
					</article>
				`;
			});
			
			category.innerHTML = setHtml;
			
			const getCategory_1 = category.querySelectorAll('article.category_1');
			getCategory_1.forEach((category_1)=>{
				category_1.addEventListener('mouseenter',(e)=>{
					showCategory_2(e);
				});
				category_1.addEventListener('mouseleave',(e)=>{
					showCategory_2(e);
				});
			});

		});
	});
})();

function showCategory_2(cate){
	let catecode = cate.currentTarget.dataset.catecode;
	let cate_2 = cate.currentTarget.querySelector('.category_2');
	if(cate.type == 'mouseenter'){
		cate_2.style.display = 'flex';
		cate_2.style.flexDirection = 'column';
		cate_2.style.position = 'absolute';
		cate_2.style.width = '200px';
		cate_2.style.border = 'solid 1px #202125';
		cate_2.style.borderRadius = '10px';
		cate_2.style.backgroundColor = '#0c0c0c';
		cate_2.style.top = '0';
		cate_2.style.left = '144px';
		cate_2.style.cursor = 'default';
		cate_2.style.textDecoration = 'none';
		cate_2.style.paddingBottom = '10px';
		cate_2.style.color = '#777a81';
		cate_2.style.boxShadow = '10px 10px 10px #000000';
		let setHtml = '';
		getCategory_2(catecode).then((response)=>{
			response.json().then((category)=>{
				category.forEach((cate)=>{
					setHtml += `
						<article style="padding-left:10px;" data-catecode2="${cate.code}" data-catecode1="${cate.category_1_code}" class="setCategory_2">
							${cate.name}
							<article class="category_3">fghfghfghfgh</article>
						</article>
					`;
				});
				cate_2.innerHTML = setHtml;
				cate_2.classList.add('category_2_ef');
				const category_2 = cate_2.querySelectorAll('.setCategory_2');
				category_2.forEach((category)=>{
					category.addEventListener('mouseenter', (e)=>{
						showCategory_3(e);
					});
					category.addEventListener('mouseleave', (e)=>{
						showCategory_3(e);
					});
				});
			});
		});
	}else{
		cate_2.style.display = 'none';
		cate_2.classList.remove('category_2_ef');
	}
}

function showCategory_3(cate){
	let catecode_1 = cate.currentTarget.dataset.catecode1;
	let catecode_2 = cate.currentTarget.dataset.catecode2;
	let cate_3 = cate.currentTarget.querySelector('.category_3');
	if(cate.type == 'mouseenter'){
		cate_3.style.display = 'flex';
		cate_3.style.flexDirection = 'column';
		cate_3.style.position = 'absolute';
		cate_3.style.width = '200px';
		cate_3.style.border = 'solid 1px #202125';
		cate_3.style.borderRadius = '10px';
		cate_3.style.backgroundColor = '#0c0c0c';
		cate_3.style.top = '0';
		cate_3.style.left = '190px';
		cate_3.style.paddingBottom = '10px';
		cate_3.style.color = '#777a81';
		cate_3.style.boxShadow = '10px 10px 10px #000000';
		cate_3.classList.add('category_3_ef');
	}else{
		cate_3.style.display = 'none';
		cate_3.classList.remove('category_3_ef');
	}
}

async function getCategory_2(code){
	return await fetch(`/goods/getCategory_2?setCategory_1Code=${code}`);
}
