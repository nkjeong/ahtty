<%
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",0);
    if (request.getProtocol().equals("HTTP/1.1")){
        response.setHeader("Cache-Control", "no-cache");
    }
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
{
	"condi" : "${condi}",
	"idx" : "${idx}",
	"userId" : "${userId}",
	"userPw" : "${userPw}",
	"userMail" : "${userMail}",
	"userCellphone" : "${userCellphone}",
	"companyName" : "${companyName}",
	"companyRegistrationNumber" : "${companyRegistrationNumber}",
	"companyPhone" : "${companyPhone}",
	"companyFAX" : "${companyFAX}",
	"companyZipcode" : "${companyZipcode}",
	"companyAddress_1" : "${companyAddress_1}",
	"companyAddress_2" : "${companyAddress_2}",
	"registrationDate" : "${registrationDate}",
	"modifyDate" : "${modifyDate}"
}