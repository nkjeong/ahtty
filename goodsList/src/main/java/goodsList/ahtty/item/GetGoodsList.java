package goodsList.ahtty.item;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import goodsList.ahtty.dbConnection.ConnectionDB;

public class GetGoodsList {
	public String getItemList() {
		
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM `goods_sub_data`";
		String str = "";
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			rs.next();
			str = rs.getString("barcode");
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		return str;
	}
}