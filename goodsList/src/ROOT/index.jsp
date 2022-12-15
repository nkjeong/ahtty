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
		<script defer src="/script/index.js"></script>
	</head>
	<body>
		<section class="main">
			<section class="navigator">
				<ul class="topMenu">
					<li class="home" data-btn="home">Home</li>
					<li class="mylist" data-btn="main">Mylist</li>
					<li class="brand" data-btn="brand">Brand</li>
					<li class="category" data-btn="category">Category</li>
				</ul>
			</section>
			<section class="listTitle">- Brand Product List -</section>
			<section class="brandGoodsWrapper">
				<section class="brandGoodsList">
				</section>
			</section>
			<section class="listTitle categoryListWrapper">- Category Product List -</section>
			<section class="categoryGoodsWrapper">
				<section class="categoryGoodsList">
				</section>
			</section>
			<section class="mainBannerWrapper">
				<section class="mainBanner"><img src="/images_source/banner_1.jpg"></section>
			</section>
			<section class="mainListTitle">New choice! <span class="textLogo">[Wmullyu]</span></section>
			<section class="listTitle">- Product List -</section>
			<section class="goodsListAll"></section>
		</section>	
		<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
	</body>
</html>