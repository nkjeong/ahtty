package goodsList.ahtty;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import goodsList.ahtty.calendar.GetCalendar;

@WebServlet("/main")
public class Main extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String page = request.getParameter("page");
		
		GetCalendar cal = new GetCalendar();
		String getCal = cal.calendar();
		
		ServletContext application =  request.getServletContext();
		application.setAttribute("calendar", getCal);
		application.setAttribute("page", page);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/main.jsp");
		dispatcher.forward(request, response);
	}
}