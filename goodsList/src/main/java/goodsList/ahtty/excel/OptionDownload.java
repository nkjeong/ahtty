package goodsList.ahtty.excel;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import goodsList.ahtty.dbConnection.ConnectionDB;

public class OptionDownload {
	public String[] getOption(String imgCode, String manufacturCode) {
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		
		String sql = "SELECT `name`, `optionValue` FROM `option` WHERE `code`='"+imgCode+"' AND `manufacturingcompanyCode`='"+manufacturCode+"'";
		String [] opt = new String[2];
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			rs.next();
			opt[0] = rs.getString("name");
			opt[1] = rs.getString("optionValue");
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		return opt;
	}
}