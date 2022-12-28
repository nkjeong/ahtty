package goodsList.ahtty.file;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/file/getFileInfo")
public class GetFileInfo extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String realPath = request.getSession().getServletContext().getRealPath("/");
		String rootPath = realPath+"images/";
		String getPath = request.getParameter("path");
		long bytes = 0;
		boolean exist = true;
		try{
			Path path = Paths.get(rootPath+getPath);
			if(Files.exists(path)) {
				bytes = Files.size(path);
				System.out.print(bytes);
			}else {
				exist = false;
			}
		}catch(Exception e) {
			System.out.print(e);
		}
		
		ServletContext application =  request.getServletContext();
		application.setAttribute("bytes", bytes);
		application.setAttribute("exist", exist);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/file/getFileInfo.jsp");
		dispatcher.forward(request, response);
	}
}