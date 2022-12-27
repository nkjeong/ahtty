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
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>상품공유</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
		<link href="/style/main.css"rel="stylesheet">
		<link href="/style/adminSection.css"rel="stylesheet">
		<link href="/style/memberSection.css"rel="stylesheet">
		<script>
			const calendar = ${calendar};
		</script>
		<c:choose>
			<c:when test="${userId != null}">
				<script defer src="/script/script.js"></script>
				<script defer src="/script/goodsList.js"></script>
				<script defer src="/script/calendar.js"></script>
				<script defer src="/script/commSection.js"></script>
				<script defer src="/script/memberSection.js"></script>
				<script defer src="/script/search.js"></script>
				<c:if test="${authority eq 'A'}">
					<link href="/style/admin.css"rel="stylesheet">
					<script defer src="/script/admin.js"></script>
				</c:if>
			</c:when>
			<c:otherwise>
				<script defer src="/script/login.js"></script>
			</c:otherwise>
		</c:choose>
	</head>
	<body>
		<c:if test="${userId != null}">
			<section class="loginMenu">
				<c:if test="${authority eq 'A'}">
					<section class="adminMenu">
						<article class="admin" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
							Admin
						</article>
					</section>
				</c:if>
				<section class="memberMenu">
					<article class="memberInfo">회원정보</article>
					<article class="logoutBtn">LOGOUT</article>
				</section>
			</section>
		</c:if>
		<section class="category_2 category_init"></section>
		<section class="main">
			<c:choose>
				<c:when test="${userId != null}">
					<!-- 메인 본문 시작 -->
					<section class="header">
						<h1>GREENOFFICE</h1>
					</section>
					<section class="top">
						<section class="hello">
							${companyName}&nbsp;<strong class="session">${userId}</strong>님 안녕하세요~
						</section>
						<section class="homeBtn">Home</section>
						<section class="homeListBtn">LIST 처음으로</section>
						<section class="allDownBtn">전체상품 다운받기(엑셀)</section>
						<section class="selectedDownBtn">선택상품 다운받기(엑셀)</section>
						<section class="searchDownBtn">검색상품 다운받기(엑셀)</section>
					</section>
					<section class="mainText">
						<section class="left">
							<section class="setToDate">
							</section>
							<c:choose>
								<c:when test="${authority eq 'A'}">
									<section class="adminSection">
										<article class="memberCnt"></article>
										<article class="goodsCnt"></article>
									</section>
								</c:when>
								<c:otherwise>
									<section class="memberSection">
										<article class="goodsCnt"></article>
										<article class="myGoodsCnt"></article>
										<article class="myGoodsReg goodsRegBtn" data-reguser="${userId}">내 상품등록하기</article>
									</section>
								</c:otherwise>
							</c:choose>
							<section class="searchWrapper">
								<section class="itemSearch">
									<form class="itemSearchForm" accept-charset="UTF-8">
										<div class="input-group input-group-sm mb-3">
										    <span class="input-group-text" id="inputGroup-sizing-sm">
										    	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search-heart" viewBox="0 0 16 16">
												    <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>
												    <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>
												</svg>
										    </span>
										    <input type="text" class="form-control search" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
										</div>
									</form>
								</section>
							</section>
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
									<!-- <article>판매가</article>-->		<!--12-->
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
								<section class="itemKeyword"></section>
								<section class="itemNotice"></section>
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
		<c:if test="${userId != null && authority eq 'A'}">
			<!-- 오른쪽 메뉴바 -->
			<div class="offcanvas offcanvas-end administratorCanvas" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" data-bs-scroll="true" data-bs-backdrop="false">
				<div class="offcanvas-header">
					<h5 class="offcanvas-title" id="offcanvasRightLabel">Administrator</h5>
					<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div class="offcanvas-body">
			    	<div class="bodyInWrapper">
			    		<section class="adminItem">
			    			<section class="adminTitle">상품관리</section>
			    			<section class="adminMenuList goodsRegBtn" data-reguser="A">상품등록</section>
			    			<section class="adminMenuList">상품수정</section>
			    			<section class="adminMenuList">상품삭제</section>
						</section>
						<section class="adminItem">
			    			<section class="adminTitle">카테고리관리</section>
			    			<section class="adminMenuList">카테고리등록</section>
			    			<section class="adminMenuList">카테고리수정</section>
			    			<section class="adminMenuList">카테고리삭제</section>
						</section>
						<section class="adminItem">
			    			<section class="adminTitle">제조사관리</section>
			    			<section class="adminMenuList">제조사등록</section>
			    			<section class="adminMenuList">제조사수정</section>
			    			<section class="adminMenuList">제조사삭제</section>
						</section>
						<section class="adminItem">
			    			<section class="adminTitle">회원관리</section>
			    			<section class="adminMenuList">회원리스트</section>
						</section>
			    	</div>
				</div>
			</div>
			<!-- 오른쪽 메뉴바 -->
		</c:if>
		<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js" integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk" crossorigin="anonymous"></script>
	</body>
</html>