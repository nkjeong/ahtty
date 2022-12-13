package goodsList.ahtty.category;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import goodsList.ahtty.dbConnection.ConnectionDB;
import goodsList.ahtty.category.GetCategoryBean;

@WebServlet("/goods/getCategory_2")
public class GetCategory_2 extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String getCategory_1Code = request.getParameter("setCategory_1Code");
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM `category_2` WHERE `category_1_code`='"+getCategory_1Code.trim()+"' ORDER BY `code`";
		Vector <GetCategoryBean> getCategory_2List = new Vector<GetCategoryBean>();
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()){
				GetCategoryBean gcb2 = new GetCategoryBean();
				gcb2.setCode(rs.getString("code"));
				gcb2.setName(rs.getString("name"));
				gcb2.setCategory_1_code(rs.getString("category_1_code"));
				getCategory_2List.add(gcb2);
			}
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		ServletContext application =  request.getServletContext();
		application.setAttribute("getCategory_2List", getCategory_2List);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/category/getCategory_2.jsp");
		dispatcher.forward(request, response);
	}
}
