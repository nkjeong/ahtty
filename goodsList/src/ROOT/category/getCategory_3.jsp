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
<c:forEach var="category" items="${getCategory_3List}" varStatus="status">
	{
		"code":"${category.code}",
		"name":"${category.name}",
		"category_1_code":"${category.category_1_code}",
		"category_2_code":"${category.category_2_code}"
	}
	<c:if test="${!status.last}">
		,
	</c:if>
</c:forEach>
]