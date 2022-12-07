"use strict";
const memberCnt = document.querySelector('.memberCnt');
const goodsCnt = document.querySelector('.goodsCnt');
const category = document.querySelector('section.categoryWrapper .leftContent');
const manufactur = document.querySelector('section.manufacturWrapper .leftContent');
const category_2 = document.querySelector('.category_2');
if(memberCnt != null){
	(function(){
		fetch('/member/getMemberCount').then((response)=>{
			response.json().then((data)=>{
				memberCnt.innerHTML = `회원수 : ${data.mcount}명`;
			});
		});
	})();
}

(function(){
	fetch('/goods/getGoodsCount').then((response)=>{
		response.json().then((data)=>{
			goodsCnt.innerHTML = `전체상품수 : ${data.gcount}개`;
		});
	});
})();

(function(){
	fetch('/goods/getManufacturingCompany').then((response)=>{
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
						<article class="category_3"></article>
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
				btns.addEventListener('mouseenter', (btn)=>{
					showCategory_3(btn, y);
				});
				btns.addEventListener('mouseleave', (btn)=>{
					showCategory_3(btn);
				});
			});
		});
	});
}

function showCategory_3(cate, y){
	let catecode_1 = cate.currentTarget.parentNode.dataset.catecode1;
	let catecode_2 = cate.currentTarget.parentNode.dataset.catecode2;
	let category_3 = cate.currentTarget.parentNode.querySelector('article.category_3');
	if(cate.type == 'mouseenter'){
		let setHtml = '';
		getCategory_3(catecode_1, catecode_2).then((response)=>{
			response.json().then((category)=>{
				if(category.length > 0){
					category.forEach((cate)=>{
						setHtml += `<article class="setCategory_3" data-category="${catecode_1+catecode_2+cate.code}">${cate.name}</article>`;
					});
					category_3.innerHTML = setHtml;
					category_3.classList.add('category_3_ef');
					category_3.addEventListener('mouseenter', (cate_3)=>{
						category_2.style.top = `${y}px`;
					});
				}
			});
		});
	}else{
		category_3.classList.remove('category_3_ef');
	}
}

/*
(function getCategory_1(){
	fetch('/category/getCategory').then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			data.forEach((c)=>{
				setHtml += `
					<article data-catecode="${c.code}" class="category_1">
						<span>${c.name}</span>
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
			
			const getCategory_1Btn = category.querySelectorAll('article.category_1 span');
			getCategory_1Btn.forEach((btns)=>{
				btns.addEventListener('click',(btn)=>{
					let keyword = btn.target.parentNode.dataset.catecode;
					getGoodsList('category_1', keyword);
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
							<span>${cate.name}</span>
							<article class="category_3"></article>
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
				const setCategory_2Btn = cate_2.querySelectorAll('article.setCategory_2 span');
				setCategory_2Btn.forEach((btns)=>{
					btns.addEventListener('click',(btn)=>{
						let catecode1 = btn.target.parentNode.dataset.catecode1;
						let catecode2 = btn.target.parentNode.dataset.catecode2;
						let keyword = catecode1+catecode2;
						getGoodsList('category_1', keyword);
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
		let setHtml = '';
		getCategory_3(catecode_1, catecode_2).then((response)=>{
			response.json().then((category)=>{
				if(category.length > 0){
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
					cate_3.style.cursor = 'default';
					cate_3.style.textDecoration = 'none';
					cate_3.style.color = '#777a81';
					cate_3.style.boxShadow = '10px 10px 10px #000000';
					category.forEach((cate)=>{
						setHtml += `<article class="setCategory_3" data-category="${catecode_1+catecode_2+cate.code}">${cate.name}</article>`;
					});
					cate_3.innerHTML = setHtml;
					cate_3.classList.add('category_3_ef');
					const setCategory_3Btn = cate_3.querySelectorAll('article.setCategory_3');
					setCategory_3Btn.forEach((btns)=>{
						btns.addEventListener('click', (btn)=>{
							let keyword = btn.target.dataset.category;
							getGoodsList('category_2', keyword);
						});
					});
				}
			});
		});
	}else{
		cate_3.style.display = 'none';
		cate_3.classList.remove('category_3_ef');
	}
}
*/
async function getCategory_3(code_1, code_2){
	return await fetch(`/goods/getCategory_3?setCategory_1Code=${code_1}&setCategory_2Code=${code_2}`);
}

async function getCategory_2(code){
	return await fetch(`/goods/getCategory_2?setCategory_1Code=${code}`);
}
