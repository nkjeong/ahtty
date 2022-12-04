"use strict";
const setToDate = document.querySelector('.setToDate');

(function setPageDate(){
	const getDate = new Date(parseInt(calendar.year), parseInt(calendar.month)-1, 1);
})();

(function setDate(){
	setToDate.innerHTML = `
		<article>${calendar.year}년${calendar.month}월${calendar.date}일</article>
		<article>${calendar.toDay}</article>
	`;
})();