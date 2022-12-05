"use strict";

const myGoodsCnt = document.querySelector('.myGoodsCnt');
const session = document.querySelector('.session');
if(myGoodsCnt != null){
	(function getMyGoodsCnt(){
		const userId = session.textContent.trim();
		getMyGoods(userId).then((response)=>{
			response.json().then((data)=>{
				myGoodsCnt.innerHTML = `내 상품수 : ${data.length}개`;
			});
		});
	})();
}

async function getMyGoods(userId){
	const tableId = {userId:userId};
	return await fetch('/goods/getMyGoods', {
		method: 'POST',
        body: JSON.stringify(tableId),
        headers:{
            'Content-Type': 'application/json',
            'charset': 'UTF-8'
        }
	});
}