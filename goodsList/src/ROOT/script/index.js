const goodsListAll = document.querySelector('.goodsListAll');
const topMenuBtns = document.querySelectorAll('ul.topMenu li');
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