package goodsList.ahtty.manufactur;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/manufactur/brandItem")
public class BrandItem extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		BrandCount count = new BrandCount();
		
		int getBrandCount = count.getBrandAllCount();
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/manufactur/brandItem.jsp");
		dispatcher.forward(request, response);
	}
}