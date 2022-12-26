"use strict";

const mainBanner = document.querySelector('.mainBanner');
const tempBanner = document.querySelector('.tempBanner');
window.addEventListener('load',()=>{
	const banner_1 = new Image();
	const banner_2 = new Image();
	const banner_3 = new Image();
	banner_1.src = '../images_source/banner_1.jpg';
	banner_2.src = '../images_source/banner_2.jpg';
	banner_3.src = '../images_source/banner_3.jpg';
/*
	const imgBanner = [
		banner_1.src,
		banner_2.src,
		banner_3.src
	];
	let imageQuantity = imgBanner.length;
	
	let time = 10;
	async function setNumber(time){
		return await new Promise((resolve, reject)=>{
			setTimeout(()=>{
				resolve(time);
			}, time);
		});
	}
	
	async function blind(time, imgMum){
		let cloneHTML = '';
		let get = await setNumber(time);
		//console.log(0, imgMum);
		cloneHTML += `
			<section class="cloneBox" style="top:-350px; left:${0*50}px;"><img src="/images_source/banner_${imgMum}.jpg" style="top:0; left:-${0*50}px"></section>
		`;
		for(let i = 0 ; i < 23; i++){
			get = await setNumber(get);
			//console.log(i+1, imgMum);
			cloneHTML += `
				<section class="cloneBox" style="top:-350px; left:${(i+1)*50}px;"><img src="/images_source/banner_${imgMum}.jpg" style="top:0; left:-${(i+1)*50}px"></section>
			`;
		}
		mainBanner.innerHTML = cloneHTML;
		callEffect(20, mainBanner, imgMum);
	}
	
	let collocateTime = 7000;
	async function setCollocate(collocateTime){
		let resetTime = await setNumber(collocateTime);
		blind(time, 1);
		for(let i = 0 ; i < imageQuantity-1; i++){
			resetTime = await setNumber(resetTime);
			blind(time, i+2);
			if(i+1 == imageQuantity-1){
				setCollocate(collocateTime);
			}
		}
	}
	setCollocate(collocateTime);
	
	
	async function blindEffect(time){
		return await new Promise((resolve, reject)=>{
			setTimeout(()=>{
				resolve(time);
			}, time);
		});
	}
	
	async function callEffect(time, elements, imgMum){
		const cloneBox = elements.children;
		let get;
		for(let i = 0 ; i < cloneBox.length ; i++){
			get = await blindEffect(time);
			console.log(get, i, imgMum);
		}
	}
	*/

	let init = 0;
	let timeOut;
	let imgCount = 2;
	function cloneBox(img, imgCount){
		let cloneHTML = '';
		for(let i = 0 ; i < 24 ; i++){
			cloneHTML += `
				<section class="cloneBox" style="top:-350px; left:${i*50}px;"><img src="/images_source/${img}.jpg" style="top:0; left:-${i*50}px"></section>
			`;
		}
		mainBanner.innerHTML = cloneHTML;
		timeOut = setInterval(()=>{
			effectImg(mainBanner, imgCount);
		}, 70);
	}
	setInterval(()=>{
		cloneBox(`banner_${imgCount}`, imgCount);
		imgCount++;
		if(imgCount == 4)imgCount = 1;
	}, 7000);
	

	function effectImg(ele, imgCount){
		const cloneBox = ele.children;
		cloneBox[init].style.top = `0px`;
		cloneBox[init].children[0].style.opacity='1';
		init++;
		if(init >= 24){
			init = 0;
			setTimeout(()=>{
				tempBanner.innerHTML = `<img src="/images_source/banner_${imgCount}.jpg">`;
			}, 1000);
			clearInterval(timeOut);
		}
	}
});