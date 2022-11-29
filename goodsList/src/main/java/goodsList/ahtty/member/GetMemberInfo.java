package goodsList.ahtty.member;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import javax.sql.DataSource;

import goodsList.ahtty.dbConnection.ConnectionDB;

public class GetMemberInfo {
	public Vector<GetMemberInfoBean> login(String userId, String userPw) {
		Vector<GetMemberInfoBean> getMember = new Vector<GetMemberInfoBean>();
		
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM `user` WHERE `userId`='"+userId.trim()+"'";
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			GetMemberInfoBean gmib = new GetMemberInfoBean();
			if(rs.next()) {
				if(rs.getString("userPw").equals(userPw.trim())) {
					gmib.setCondi("MEMBER");
					gmib.setIdx(rs.getString("idx"));
					gmib.setUserId(rs.getString("userId"));
					gmib.setUserPw(rs.getString("userPw"));
					gmib.setUserMail(rs.getString("userMail"));
					gmib.setUserCellphone(rs.getString("userCellphone"));
					gmib.setCompanyName(rs.getString("companyName"));
					gmib.setCompanyRegistrationNumber(rs.getString("companyRegistrationNumber"));
					gmib.setCompanyPhone(rs.getString("companyPhone"));
					gmib.setCompanyFAX(rs.getString("companyFAX"));
					gmib.setCompanyZipcode(rs.getString("companyZipcode"));
					gmib.setCompanyAddress_1(rs.getString("companyAddress_1"));
					gmib.setCompanyAddress_2(rs.getString("companyAddress_2"));
					gmib.setRegistrationDate(rs.getString("registrationDate"));
					gmib.setModifyDate(rs.getString("modifyDate"));
					gmib.setAuthority(rs.getString("authority"));
					getMember.add(gmib);
				}else {
					gmib.setCondi("WRONG-PASSWORD");
					getMember.add(gmib);
				}
			}else {
				gmib.setCondi("NO-MEMBER");
				getMember.add(gmib);
			}
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		
		return getMember;
	}
}
