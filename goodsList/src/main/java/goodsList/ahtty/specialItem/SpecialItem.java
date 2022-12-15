package goodsList.ahtty.specialItem;

import java.io.IOException;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import goodsList.ahtty.item.GetSpecialItem;
import goodsList.ahtty.item.GetGoodsListBean;

@WebServlet("/special/specialItem")
public class SpecialItem extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String mode = request.getParameter("mode");
		
		SpecialItemCount count = new SpecialItemCount();
		int getSpecialCount = count.getSpecialAllCount(mode.trim());
		String getCode = "";
		String specialCode = "";
		int initNum = 0;
		boolean init = true;
		while(init) {
			double getNumber = Math.random();
			int randomNum = (int)(getNumber*getSpecialCount)+1;
			if(getCode.indexOf(Integer.toString(randomNum)) != -1) {
				continue;
			}else{
				if(mode.trim().equals("brand")) {
					if(randomNum < 10) specialCode = "000"+randomNum;
					else if(randomNum < 100) specialCode = "00"+randomNum;
					else if(randomNum < 1000) specialCode = "0"+randomNum;
				}else {
					if(randomNum < 10) specialCode = "0"+randomNum;
					else  specialCode = Integer.toString(randomNum);
				}
				
				getCode += specialCode;
				initNum++;
				if(initNum == 6) init = false;
				else getCode+=",";
			}
		}
		String [] getSpecialCodeCode = getCode.split(",");
		GetSpecialItem gsi = new GetSpecialItem();
		String itemCode = "";
		Vector<Vector<GetGoodsListBean>> item = new Vector<Vector<GetGoodsListBean>>();
		for(int i = 0 ; i < getSpecialCodeCode.length ; i++) {
			double getNumber = Math.random();
			int randomNum = (int)(getNumber*gsi.getSpecialCnt(getSpecialCodeCode[i], mode.trim()))+1;
			if(mode.trim().equals("brand")) {
				if(randomNum < 10) itemCode = "000"+randomNum;
				else if(randomNum < 100) itemCode = "00"+randomNum;
				else if(randomNum < 1000) itemCode = "0"+randomNum;
			}else {
				itemCode = Integer.toString(randomNum-1);
			}
			Vector<GetGoodsListBean> specialItem = gsi.getSpecialItem(getSpecialCodeCode[i], itemCode, mode.trim());
			item.add(specialItem);
		}
		ServletContext application =  request.getServletContext();
		application.setAttribute("item", item);
		RequestDispatcher dispatcher = request.getRequestDispatcher("/special/specialItem.jsp");
		dispatcher.forward(request, response);
	}
}