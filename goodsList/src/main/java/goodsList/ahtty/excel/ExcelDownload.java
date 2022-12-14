package goodsList.ahtty.excel;

import java.io.IOException;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import goodsList.ahtty.item.GetGoodsListBean;

@WebServlet("/download/excel")
public class ExcelDownload extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String getData = request.getParameter("getData");
		String mode = request.getParameter("mode");

		Vector<GetGoodsListBean> download = new Vector<GetGoodsListBean>();
		GoodsDownload gd = new GoodsDownload();
		if(mode.equals("all")) {
			download = gd.excelDownloadAll();
		}else if(mode.equals("ck")) {
			String [] goods = getData.split(";");
			for(int i = 0 ; i < goods.length ; i++) {
				download.add(gd.excelDownloadCk(goods[i].trim().substring(4,8), goods[i].trim().substring(0,4)));
			}
		}
		ServletContext application =  request.getServletContext();
		application.setAttribute("download", download);
		RequestDispatcher dispatcher = request.getRequestDispatcher("/file/excelDownload.jsp");
		dispatcher.forward(request, response);
	}
}