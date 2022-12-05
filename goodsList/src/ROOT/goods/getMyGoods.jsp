<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

[
<c:forEach var="myItem" items="${getMyGoodsList}" varStatus="status">
	{
		"code":"${myItem.code}",
		"item_name":"${myItem.item_name}",
		"category":"${myItem.category}",
		"registrationDate":"${myItem.registrationDate}",
		"modifyDate":"${myItem.modifyDate}"
	}
	<c:if test="${!status.last}">
		,
	</c:if>
</c:forEach>
]