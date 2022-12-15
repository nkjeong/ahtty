const goodsListAll = document.querySelector('.goodsListAll');
const topMenuBtns = document.querySelectorAll('ul.topMenu li');
const navigator = document.querySelector('.navigator');
const brandGoodsList = document.querySelector('.brandGoodsList');
const categoryGoodsList = document.querySelector('.categoryGoodsList');
topMenuBtns.forEach((btns)=>{
	btns.addEventListener('click', (btn)=>{
		let btnMode = btn.target.dataset.btn;
		if(btnMode == 'home'){
			location.href = '/';
		}else{
			location.href = btnMode;
		}
	});
});

async function getProduct(){
	await fetch(`/goods/goodsList`).then((response)=>{
		response.json().then((data)=>{
			let setHtml = '';
			data.forEach((d)=>{
				let imgPre = d.nameEng.toLowerCase();
				let imgName = `${imgPre}_${d.code}`;
				let itemName = d.item_name_reg;
				let discountRate = ((1-(parseInt(d.item_purchasePrice) / parseInt(d.item_retailPrice)))*100).toFixed(2);
				setHtml += `
					<section class="itemWrapper">
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
			})
			goodsListAll.innerHTML = setHtml;
		});
	});
}
getProduct();

window.addEventListener('scroll', (e)=>{
	let scroll_y = this.scrollY;
	if(scroll_y > 20){
		navigator.style.position = 'fixed';
		navigator.style.width = '100%';
		navigator.style.left = '0';
		navigator.style.backgroundColor = '#ffffff';
		navigator.style.boxShadow = '10px 10px 10px #656565';
		navigator.style.borderBottom = 'solid 1px #000000';
		navigator.style.zIndex = '30';
		
	}else{
		navigator.style.position = 'static';
		navigator.style.borderBottom = 'solid 1px #eeeeee';
		navigator.style.boxShadow = 'none';
	}
});

async function getSpecialItem(mode){
	await fetch(`/special/specialItem?mode=${mode}`).then((response)=>{
		response.json().then((data)=>{
			let setHTML = '';
			data.forEach((d)=>{
				let imgPre = d.nameEng.toLowerCase();
				let imgName = `${imgPre}_${d.code}`;
				setHTML += `
					<section class="specialItemWrapper">
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
			});
		});
	});
}

getSpecialItem('brand');
setTimeout(()=>{getSpecialItem('category');}, 200);
