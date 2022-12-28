<%
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",0);
    if (request.getProtocol().equals("HTTP/1.1")){
        response.setHeader("Cache-Control", "no-cache");
    }
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>세상물류</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
		<link href="/style/index.css" rel="stylesheet">
		<link href="/style/canvas.css" rel="stylesheet">
		<link href="/style/center.css" rel="stylesheet">
		<script defer src="/script/index.js"></script>
		<script defer src="/script/canvas.js"></script>
	</head>
	<body>
		<section class="detailViewContainer"></section>
		<section class="detailViewWrapper">
			<section class="detailTxt">
				<section class="representativeImageWrapper"></section>
				<section class="detailedDescription"></section>
			</section>
			<section class="detailMenu"></section>
			<section class="detailImg"></section>
		</section>
		
		<section class="subMenu"></section>
		<section class="main">
			<section class="navigator">
				<ul class="topMenu">
					<li class="home" data-btn="home"><span>Home</span></li>
					<li class="mylist" data-btn="main"><span>Mylist</span></li>
					<li class="brand" data-btn="brand" data-url="/manufactur/getManufacturingCompany"><span>Brand</span></li>
					<li class="category" data-btn="category" data-url="/category/getCategory"><span>Category</span></li>
					<li class="wmullyu" data-btn="wmullyu" data-url="https://www.mullyu.co.kr/"><span>W-Mullyu</span></li>
				</ul>
				<ul class="memberInfoWrapper">
					<li class="joinBtn"><span>join</span></li>
					<li class="loginBtn" data-btn="wmullyu" data-url="/main?page=index"><span>login</span></li>
				</ul>
			</section>
			<section class="listTitle">- Brand Product List -</section>
			<section class="brandGoodsWrapper">
				<section class="brandGoodsList">
				</section>
			</section>
			<section class="mainBannerWrapper">
				<section class="tempBanner">
					<img src="/images_source/banner_1.jpg">
				</section>
				<section class="mainBanner"></section>
			</section>
			<section class="mainListTitle">New choice! <span class="textLogo">[Wmullyu]</span></section>
			<section class="listTitle">- Category Product List -</section>
			<section class="categoryGoodsWrapper">
				<section class="categoryGoodsList"></section>
			</section>
			<section class="centerWrapper">
				<section class="centerBannerWrapper">
					<section class="centerBanner"><img src="../images_source/banner_6.jpg"></section>
					<section class="centerBanner"><img src="../images_source/banner_7.jpg"></section>
					<section class="centerBanner"><img src="../images_source/banner_8.jpg"></section>
					<section class="centerBanner"><img src="../images_source/banner_9.jpg"></section>
				</section>
				<section class="centerRightMenu">
					<section class="centerRightMenuTop">
						<section class="centerBanner_04"><img src="../images_source/banner_4.jpg"></section>
					</section>
					<section class="centerRightMenuBottom">
						<section class="smallBtn">이름순</section>
						<section class="smallBtn">가격높은순</section>
						<section class="smallBtn">가격낮은순</section>
						<section class="smallBtn">최근등록순</section>
						<section class="mainSearchWrapper">
							<form>
								<input type="text" class="mainSearch" placeholder="상품검색">
							</form>
						</section>
					</section>
				</section>
			</section>
			<section class="listTitle">- Product List -</section>
			<section class="goodsListAll"></section>
		</section>
		<section class="footerBanner">
			<article>Internet logistics agency! <span>[:W-Mullyu]</span></article>
		</section>
		<section class="footer"></section>
		<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
	</body>
</html>