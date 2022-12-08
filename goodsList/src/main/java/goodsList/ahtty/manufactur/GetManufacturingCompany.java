package goodsList.ahtty.manufactur;

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

@WebServlet("/manufactur/getManufacturingCompany")
public class GetManufacturingCompany extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM `manufacturingcompany` ORDER BY `nameKor`";
		Vector <GetManufacturingCompanyBean> getManufacturingCompanyList = new Vector<GetManufacturingCompanyBean>();
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()){
				GetManufacturingCompanyBean gmc = new GetManufacturingCompanyBean();
				gmc.setCode(rs.getString("code"));
				gmc.setNameEng(rs.getString("nameEng"));
				gmc.setNameKor(rs.getString("nameKor"));
				getManufacturingCompanyList.add(gmc);
			}
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		ServletContext application =  request.getServletContext();
		application.setAttribute("getManufacturingCompanyList", getManufacturingCompanyList);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/manufactur/getManufacturingCompany.jsp");
		dispatcher.forward(request, response);
	}

}
