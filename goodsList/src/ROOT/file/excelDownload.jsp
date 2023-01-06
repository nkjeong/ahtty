<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	response.setHeader("Content-Type", "application/vnd.ms-xls");
	response.setHeader("Content-Disposition", "attachment; filename=itemlist.xls"); 
	response.setHeader("Content-Description", "JSP Generated Data");
	response.setHeader("Pragma", "public");
	response.setHeader("Cache-Control", "max-age=0");
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Excel list</title>
		<style>
			table, tr, td{
				border-collapse: collapse;
			}
			table {
				border:solid 1px #000000;
			}
			tr{
				border-collapse: collapse;
			}
			td{
				border:solid 1px #000000;
				background-color:#dce6f1;
			}
			tr.contents td{
				border:solid 1px #000000;
			}
		</style>
	</head>
	<body>
		<table>
			<tr>
				<td>No.</td>
				<td>상품코드</td>
				<td>바코드</td>
				<td>상품명</td>
				<td>등록상품명</td>
				<td>품번</td>
				<td>규격</td>
				<td>제조국</td>
				<td>단위</td>
				<td>소비자가</td>
				<td>공급가</td>
				<td>기타사항</td>
				<td>키워드</td>
				<td>카테고리</td>
				<td>등록일</td>
				<td>수정일</td>
				<td>품절여부</td>
				<td>단종여부</td>
				<td>옵션여부</td>
				<td>옵션명</td>
				<td>옵션값</td>
				<td>제조사</td>
			</tr>
			<c:forEach var="downloadXls" items="${download}" varStatus="status" begin=0, step=1>
				<tr class="contents">
					<td></td>
					<td>${downloadXls.code}</td>
					<td>${downloadXls.barcode}</td>
					<td>${downloadXls.item_name}</td>
					<td>${downloadXls.item_name_reg}</td>
					<td>${downloadXls.item_number}</td>
					<td>${downloadXls.item_standard}</td>
					<td>${downloadXls.item_origin}</td>
					<td>${downloadXls.item_unit}</td>
					<td>${downloadXls.item_retailPrice}</td>
					<td>${downloadXls.item_purchasePrice}</td>
					<td>${downloadXls.notice}</td>
					<td>${downloadXls.keyword}</td>
					<td>${downloadXls.category}</td>
					<td>${downloadXls.registrationDate}</td>
					<td>${downloadXls.modifyDate}</td>
					<td>${downloadXls.discontinued}</td>
					<td>${downloadXls.outOfStock}</td>
					<td>${downloadXls.option}</td>
					<td>${downloadXls.optionName}</td>
					<td>${downloadXls.optionValue}</td>
					<td>${downloadXls.nameKor}</td>
				</tr>
			</c:forEach>
		</table>
	</body>
</html>