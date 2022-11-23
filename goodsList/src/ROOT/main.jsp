<%
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",0);
    if (request.getProtocol().equals("HTTP/1.1")){
        response.setHeader("Cache-Control", "no-cache");
    }
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Ahtty 상품공유</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
		<link href="/style/main.css"rel="stylesheet">
		<script>
			let calendar = ${calendar};
		</script>
		<c:if test = "${userId != null}">
			<script defer src="/script/script.js"></script>
		</c:if>
		
		<c:if test = "${userId == null}">
			<script defer src="/script/login.js"></script>
		</c:if>

	</head>
	<body>
		<section class="main">
			<section class="loginLabel">
				Member Login
			</section>
			<section class="loginWrapper">
				<form name="loginForm" class="loginForm" onsubmit="return login(this);">
					<section class="loginFormWrapper">
						<article class="userId">
							<div class="form-floating mb-3">
								<input type="text" class="form-control userId" name="userId" id="userId" placeholder="userId" oninvalid="this.setCustomValidity('아이디를 입력하세요.')" oninput="this.setCustomValidity('')" required>
								<label for="floatingInput">User ID</label>
							</div>
						</article>
						<article class="userPw">
							<div class="form-floating mb-3">
								<input type="password" class="form-control userPw" name="userPw" id="userPw" placeholder="userPw" oninvalid="this.setCustomValidity('비밀번호를 입력하세요.')" oninput="this.setCustomValidity('')" required>
								<label for="floatingInput">User Password</label>
							</div>
						</article>
						<article class="loginBtn">
							<input class="btn btn-primary" type="submit" value="LOGIN">
						</article>
					</section>
					<section class="loginMassage">
						<span>로그인 하시기 바랍니다.</span>
					</section>
				</form>
			</section>
		</section>
	
		<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js" integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk" crossorigin="anonymous"></script>
	</body>
</html>