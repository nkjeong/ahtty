"use strict";
const memberCnt = document.querySelector('.memberCnt');
const goodsCnt = document.querySelector('.goodsCnt');

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