package goodsList.ahtty.manufactur;

import java.io.IOException;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import goodsList.ahtty.item.GetBrandItem;
import goodsList.ahtty.item.GetGoodsListBean;

@WebServlet("/manufactur/brandItem")
public class BrandItem extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String mode = request.getParameter("mode");
		
		BrandCount count = new BrandCount();
		int getBrandCount = count.getBrandAllCount();
		String getCode = "";
		String brandCode = "";
		int initNum = 0;
		boolean init = true;
		while(init) {
			double getNumber = Math.random();
			int randomNum = (int)(getNumber*getBrandCount)+1;
			if(getCode.indexOf(Integer.toString(randomNum)) != -1) {
				continue;
			}else{
				if(randomNum < 10) brandCode = "000"+randomNum;
				else if(randomNum < 100) brandCode = "00"+randomNum;
				else if(randomNum < 1000) brandCode = "0"+randomNum;
				getCode += brandCode;
				initNum++;
				if(initNum == 6) init = false;
				else getCode+=",";
			}
		}
		String [] getManufacturCode = getCode.split(",");
		GetBrandItem gbi = new GetBrandItem();
		String itemCode = "";
		Vector<Vector<GetGoodsListBean>> item = new Vector<Vector<GetGoodsListBean>>();
		for(int i = 0 ; i < getManufacturCode.length ; i++) {
			double getNumber = Math.random();
			int randomNum = (int)(getNumber*gbi.getBrandCnt(getManufacturCode[i]))+1;
			if(randomNum < 10) itemCode = "000"+randomNum;
			else if(randomNum < 100) itemCode = "00"+randomNum;
			else if(randomNum < 1000) itemCode = "0"+randomNum;
			Vector<GetGoodsListBean> brandItem = gbi.getBrandItem(getManufacturCode[i], itemCode);
			item.add(brandItem);
		}
		ServletContext application =  request.getServletContext();
		application.setAttribute("item", item);
		RequestDispatcher dispatcher = request.getRequestDispatcher("/manufactur/brandItem.jsp");
		dispatcher.forward(request, response);
	}
}