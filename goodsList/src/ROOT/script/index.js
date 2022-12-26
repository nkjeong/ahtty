"use strict";
const goodsListAll = document.querySelector('.goodsListAll');
const topMenuBtns = document.querySelectorAll('ul.topMenu li');
const navigator = document.querySelector('.navigator');
const brandGoodsList = document.querySelector('.brandGoodsList');
const categoryGoodsList = document.querySelector('.categoryGoodsList');
const subMenu = document.querySelector('.subMenu');
const detailViewContainer = document.querySelector('.detailViewContainer');
const detailViewWrapper = document.querySelector('.detailViewWrapper');
topMenuBtns.forEach((btns)=>{
	let btnMode = btns.dataset.btn
	if(btnMode == 'home' || btnMode == 'main' || btnMode == 'wmullyu'){
		btns.addEventListener('click', (btn)=>{
			if(btnMode == 'home'){
				location.href = '/';
			}else if(btnMode == 'wmullyu'){
				window.open(btns.dataset.url);
			}else{
				location.href = btnMode;
			}
		});
	}else{
		let url = btns.dataset.url;
		let menuItems = '';
		if(btnMode == 'brand'){
			menuItems = '브랜드';
		}else{
			menuItems = '카테고리';
		}
		btns.addEventListener('mouseenter', (btn)=>{
			subMenu.classList.add('subMenuOn');

			let setHTML = `
				<section class="subMenuWrapper">
					<section class="subMeneTitle"><span>${menuItems}</span></section>
					<section class="subMenuList"></section>
				</section>
			`;
			subMenu.innerHTML = setHTML;
			getTopMenuList(url).then((response)=>{
				response.json().then((data)=>{
					let topMenuHTML = '';
					
					data.forEach((d)=>{
						if(btnMode == 'category'){
							topMenuHTML += `
								<section class="categoryWrapper smallBtn">${d.name}</section>
							`;
						}else{
							topMenuHTML += `
								<section class="brandWrapper smallBtn"><span>${d.nameKor}</span></section>
							`;
						}
					});
					subMenu.querySelector('.subMenuList').innerHTML = topMenuHTML;
				});
			});
		});
		btns.addEventListener('mouseleave', (btn)=>{
			subMenu.classList.remove('subMenuOn');
		});
		subMenu.addEventListener('mouseenter', ()=>{
			subMenu.classList.add('subMenuOn');
		});
		subMenu.addEventListener('mouseleave', ()=>{
			subMenu.classList.remove('subMenuOn');
		});
	}
});

async function getTopMenuList(url){
	return await fetch(url);
}

async function getProduct(){
	await fetch(`/goods/goodsList`).then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			data.forEach((d, i)=>{
				let imgPre = d.nameEng.toLowerCase();
				let imgName = `${imgPre}_${d.code}`;
				let itemName = d.item_name_reg;
				let discountRate = ((1-(parseInt(d.item_purchasePrice) / parseInt(d.item_retailPrice)))*100).toFixed(2);
				setHtml += `
					<section class="itemWrapper detailViewBtn" data-code="${d.code}" data-manufacturcode="${d.manufacturingCompany_code}">
						<section class="itemImg">
							<img src="http://twin19.synology.me:8080/images/1000/${imgName}.jpg">
						</section>
						<section class="itemName">
							${itemName}
						</section>
						<section class="retailPrice">
							${Number(d.item_retailPrice).toLocaleString('ko-KR')}
						</section>
						<section class="purchasePrice">
							${Number(d.item_purchasePrice).toLocaleString('ko-KR')}(${discountRate}%)
						</section>
					</section>
				`;
				if(i == 7){
					setHtml += `
						<section class="listBannerWrapper">
							<section class="listBanner"><img src="../images_source/banner_10.jpg"></section>
							<section class="listBanner"><img src="../images_source/banner_11.jpg"></section>
							<section class="listBanner"><img src="../images_source/banner_12.jpg"></section>
							<section class="listBanner"><img src="../images_source/banner_13.jpg"></section>
						</section>
						<section class="listBannerWordWrapper">
							<section class="listBannerWord"><span>화방용품</span></section>
							<section class="listBannerWord"><span>사무용품</span></section>
							<section class="listBannerWord"><span>파티용품</span></section>
							<section class="listBannerWord"><span>생활용품</span></section>
						</section>
					`;
				}
				if(i == 19){
					setHtml += `
						<section class="listBannerWrapper2"><img src="../images_source/banner_14.jpg"></section>
					`;
				}
				if(i == 39){
					setHtml += `
						<section class="listBannerWrapper2"><img src="../images_source/banner_15.jpg"></section>
					`;
				}
			});
			goodsListAll.innerHTML = setHtml;
			const detailViewBtn = goodsListAll.querySelectorAll('.detailViewBtn');
			detailViewBtn.forEach((btns)=>{
				btns.addEventListener('click', (btn)=>{
					btn.stopPropagation();
					detailView(btn.currentTarget);
				}, true);
			});
		});
	});
}
getProduct();

window.addEventListener('scroll', (e)=>{
	let scroll_y = this.scrollY;
	if(scroll_y > 20){
		navigator.classList.add('navigatorOn');
		subMenu.style.width = '1200px'
	}else{
		navigator.classList.remove('navigatorOn');
	}
	
	detailViewContainer.style.top = `${scroll_y}px`;
	detailViewWrapper.style.top = `${scroll_y}px`;
});

async function getSpecialItem(mode){
	await fetch(`/special/specialItem?mode=${mode}`).then((response)=>{
		response.json().then((data)=>{
			let setHTML = '';
			data.forEach((d)=>{
				let imgPre = d.nameEng.toLowerCase();
				let imgName = `${imgPre}_${d.code}`;
				setHTML += `
					<section class="specialItemWrapper detailViewBtn" data-code="${d.code}" data-manufacturcode="${d.manufacturingCompany_code}">
						<section class="specialItemImg">
							<img src="http://twin19.synology.me:8080/images/1000/${imgName}.jpg">
						</section>
						<section class="specialItemName">${d.item_name_reg}</section>
						<section class="specialItemInfo">
							<section class="specialItemPrice">${Number(d.item_retailPrice).toLocaleString('ko-KR')}</section>
							<section class="specialItemPurchasePrice">${Number(d.item_purchasePrice).toLocaleString('ko-KR')}</section>
						</section>
					</section>
				`;
			});
			
			let specialItemWrapper = "";
			if(mode == 'brand'){
				brandGoodsList.innerHTML = setHTML;
				specialItemWrapper = brandGoodsList.querySelectorAll('.specialItemWrapper');
			}else{
				categoryGoodsList.innerHTML = setHTML;
				specialItemWrapper = categoryGoodsList.querySelectorAll('.specialItemWrapper');
			}
			specialItemWrapper.forEach((btns)=>{
				btns.addEventListener('mouseenter', (btn)=>{
					const getSImg = btn.target.children[0].children[0];
					getSImg.style.top = '0';
				});
				btns.addEventListener('mouseleave', (btn)=>{
					const getSImg = btn.target.children[0].children[0];
					getSImg.style.top = '50px';
				});
				btns.addEventListener('click', (btn)=>{
					btn.stopPropagation();
					detailView(btn.currentTarget);
				}, true);
			});
		});
	});
}

getSpecialItem('brand');
setTimeout(()=>{getSpecialItem('category');}, 500);

function detailView(element){
	let manufacturcode = element.dataset.manufacturcode;
	let code = element.dataset.code;
	detailViewContainer.classList.add('detailViewContainerOn');
	detailViewWrapper.classList.add('detailViewWrapperOn');
	document.body.style.overflow = 'hidden';
	getTopMenuList(`/goods/goodsList?mode=singleItemSelection&keyword=${code}:${manufacturcode}`).then((response)=>{
		const representativeImageWrapper = detailViewWrapper.querySelector('.representativeImageWrapper');
		const detailedDescription = detailViewWrapper.querySelector('.detailedDescription');
		response.json().then((data)=>{
			let d = data[0];
			let imgPre = d.nameEng.toLowerCase();
			let imgName = `${imgPre}_${d.code}`;
			let item_name = d.item_name;
			let item_retailPrice = d.item_retailPrice;
			let item_purchasePrice = d.item_purchasePrice;
			representativeImageWrapper.innerHTML = `<img src="http://twin19.synology.me:8080/images/1000/${imgName}.jpg" class="representativeImageMain">`;
			detailedDescription.innerHTML = `
				<section><article>${item_name}</article></section>
				<section>
					<article>소비자가</article>
					<article>${Number(item_retailPrice).toLocaleString('ko-KR')}</article>
				</section>
				<section>
					<article>공급가</article>
					<article>${Number(item_purchasePrice).toLocaleString('ko-KR')}</article>
				</section>
			`;
		});
	});
}
detailViewContainer.addEventListener('click',(btn)=>{
	detailViewContainer.classList.remove('detailViewContainerOn');
	detailViewWrapper.classList.remove('detailViewWrapperOn');
	document.body.style.overflow = 'scroll';
});