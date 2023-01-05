package goodsList.ahtty.excel;

import java.io.IOException;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import goodsList.ahtty.item.GetGoodsListBean;

@WebServlet("/download/eccel")
public class ExcelDownload extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String getData = request.getParameter("getData");
		String mode = request.getParameter("mode");

		String sql = "";
		Vector<GetGoodsListBean> download = new Vector<GetGoodsListBean>();
		if(mode.equals("all")) {
			
		}else {
			
		}
	}
}
