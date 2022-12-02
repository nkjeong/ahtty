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
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>상품공유</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
		<link href="/style/main.css"rel="stylesheet">
		<link href="/style/adminSection.css"rel="stylesheet">
		<script>
			const calendar = ${calendar};
		</script>
		<c:choose>
			<c:when test="${userId != null}">
				<script defer src="/script/script.js"></script>
				<script defer src="/script/goodsList.js"></script>
				<script defer src="/script/calendar.js"></script>
				<script defer src="/script/adminSection.js"></script>
			</c:when>
			<c:otherwise>
				<script defer src="/script/login.js"></script>
			</c:otherwise>
		</c:choose>
	</head>
	<body>
		<section class="main">
			<c:choose>
				<c:when test="${userId != null}">
					<!-- 메인 본문 시작 -->
					<section class="header">
						<h1>GREENOFFICE</h1>
					</section>
					<section class="top">
						<section class="hello">
							${companyName}&nbsp;<strong>${userId}</strong>님 안녕하세요~
						</section>
					</section>
					<section class="mainText">
						<section class="left">
							<c:choose>
								<c:when test="${authority eq 'A'}">
									<section class="adminSection">
										<article class="memberCnt"></article>
										<article class="goodsCnt"></article>
									</section>
								</c:when>
								<c:otherwise>
									<section class="memberSection">
									
									</section>
								</c:otherwise>
							</c:choose>
							<section class="categoryWrapper">
								<section class="leftTitle">
									카테고리
								</section>
								<section class="leftContent"></section>
							</section>
							<section class="manufacturWrapper">
								<section class="leftTitle">
									제조사(브랜드)
								</section>
								<section class="leftContent"></section>
							</section>
						</section>
						<section class="content">
							<section class="itemAccountWrapper">
								<section class="itemAccount">
									<article>
										<div>
											<input class="form-check-input ckAll" type="checkbox">
										</div>
									</article>		<!--1-->
									<article>Img</article>		<!--2-->
									<article>바코드</article>		<!--3-->
									<article>상품명</article>		<!--4-->
									<article>규격</article>		<!--5-->
									<article>품번</article>		<!--6-->
									<article>카테고리</article>	<!--7-->
									<article>원산지</article>		<!--8-->
									<article>제조사</article>		<!--9-->
									<article>소비자가</article>	<!--10-->
									<article>공급가</article>		<!--11-->
									<article>판매가</article>		<!--12-->
									<article>품절</article>		<!--13-->
									<article>단종</article>		<!--14-->
								</section>
							</section>
							<section class="articleContentWrapper">
								<!-- 본문내용 -->
							</section>
							<section class="footerInfo">
								<section class="itemCount"></section>
								<section class="paging"></section>
							</section>
						</section>
						<section class="right">
							<section class="itemDetailInfo">
								<section class="itemName"></section>
								<section class="htmlCode">
									<article>
										상품을 선택 하시면 해당상품의 상세이미지<br>
										html 소스가 출력됩니다.
									</article>
								</section>
								<section class="itemOption"></section>
								<section class="representativeImageRight"></section>
								<section class="detailImageRight"></section>
							</section>
						</section>
					</section>
					<!-- 메인 본문 끝 -->
				</c:when>
				<c:otherwise>
					<!-- 로그인 form 시작 -->
					<section class="loginLabel">
						Member Login
					</section>
					<section class="loginWrapper">
						<form name="loginForm" class="loginForm" onsubmit="return login(this);">
							<section class="loginFormWrapper">
								<article class="userIdWrapper">
									<div class="form-floating mb-3">
										<input type="text" class="form-control userId" name="userId" id="userId" placeholder="userId" oninvalid="this.setCustomValidity('아이디를 입력하세요.')" oninput="this.setCustomValidity('')" required>
										<label for="floatingInput">User ID</label>
									</div>
								</article>
								<article class="userPwWrapper">
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
					<!-- 로그인 form 끝 -->
				</c:otherwise>
			</c:choose>
		</section>
		<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js" integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk" crossorigin="anonymous"></script>
	</body>
</html>