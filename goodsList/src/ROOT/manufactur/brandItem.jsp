<%
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",0);
    if (request.getProtocol().equals("HTTP/1.1")){
        response.setHeader("Cache-Control", "no-cache");
    }
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
[
<c:forEach var="brandItem" items="${item}" varStatus="status">
	{
	<c:forEach var="getItem" items="${brandItem}">
		"item_name":"${getItem.item_name}",
		"code":"${getItem.code}",
		"item_retailPrice":"${getItem.item_retailPrice}",
		"item_purchasePrice":"${getItem.item_purchasePrice}",
		"nameEng":"${getItem.nameEng}"
	</c:forEach>
	}
	<c:if test="${!status.last}">
		,
	</c:if>
</c:forEach>
]