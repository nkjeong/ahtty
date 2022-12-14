package goodsList.ahtty.manufactur;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import goodsList.ahtty.dbConnection.ConnectionDB;

public class BrandCount {
	public int getBrandAllCount() {
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		int count = 0;
		String sql = "SELECT COUNT(`code`) AS cnt FROM `manufacturingcompany`";
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
		return count;
	}
}
