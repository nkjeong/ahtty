package goodsList.ahtty.item;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import goodsList.ahtty.dbConnection.ConnectionDB;

@WebServlet("/goods/getGoodsCount")
public class GoodsCount extends HttpServlet {

	private static final long serialVersionUID = 1L;
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String sql = "SELECT COUNT(CODE) AS cnt FROM `goods`";
		int count = 0;
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			rs.next();
			count = rs.getInt("cnt");
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		ServletContext application =  request.getServletContext();
		application.setAttribute("gcount", count);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/goods/getGoodsCount.jsp");
		dispatcher.forward(request, response);
	}
}
