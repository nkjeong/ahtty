package goodsList.ahtty.item;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
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

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import goodsList.ahtty.dbConnection.ConnectionDB;

@WebServlet("/goods/getMyGoods")
public class GetMyGoods extends HttpServlet {

	private static final long serialVersionUID = 1L;
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		BufferedReader input = new BufferedReader(new InputStreamReader(request.getInputStream()));
	    StringBuilder builder = new StringBuilder();
	    String buffer;
	    JSONParser getPara;
	    JSONObject jObj;

	    while ((buffer = input.readLine()) != null) {
	        if (builder.length() > 0) {
	            builder.append("\n");
	        }
	        builder.append(buffer);
	    }
	    
	    Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		
		Vector<GetGoodsListBean> getMyGoodsList = new Vector<GetGoodsListBean>();
		
	    try {
	        getPara = new JSONParser();
	        jObj = (JSONObject)getPara.parse(builder.toString());
	        String userId = (String) jObj.get("userId");
	        
			String sql = "SELECT * FROM `"+userId.trim()+"`";
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				GetGoodsListBean gglb = new GetGoodsListBean();
				gglb.setCode(rs.getString("code"));
				gglb.setItem_name(rs.getString("item_name"));
				gglb.setRegistrationDate(rs.getString("registrationDate"));
				gglb.setModifyDate(rs.getString("modifyDate"));
				gglb.setCategory(rs.getString("category"));
				getMyGoodsList.add(gglb);
			}
	    }catch(ParseException e) {
			e.printStackTrace();
		}catch(SQLException e) {
			System.out.print(e);
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
	    
	    ServletContext application =  request.getServletContext();
		application.setAttribute("getMyGoodsList", getMyGoodsList);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/goods/getMyGoods.jsp");
		dispatcher.forward(request, response);
	}
}
