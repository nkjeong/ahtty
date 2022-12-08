"use strict";

const search = document.querySelector('.search');
search.addEventListener('keyup',(val)=>{
	let keyword = val.target.value.trim();
	if(!isNaN(keyword) && keyword.length > 9){
		getGoodsList('barcode', keyword);
	}else{
		getGoodsList('search', keyword);
	}
});

search.addEventListener('dblclick',(val)=>{
	val.target.value = '';
});

const itemSearchForm = document.querySelector('.itemSearchForm');
itemSearchForm.addEventListener('submit',(e)=>{
	e.preventDefault();
});