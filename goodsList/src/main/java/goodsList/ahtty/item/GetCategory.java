package goodsList.ahtty.item;

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

@WebServlet("/goods/getCategory")
public class GetCategory extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM `category_1`";
		Vector <GetCategoryBean> GetCategoryList = new Vector<GetCategoryBean>();
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()){
				GetCategoryBean gcb = new GetCategoryBean();
				gcb.setCode(rs.getString("code"));
				gcb.setName(rs.getString("name"));
				GetCategoryList.add(gcb);
			}
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		ServletContext application =  request.getServletContext();
		application.setAttribute("GetCategoryList", GetCategoryList);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/goods/getCategory.jsp");
		dispatcher.forward(request, response);
	}
}
