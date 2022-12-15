package goodsList.ahtty.item;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import javax.sql.DataSource;

import goodsList.ahtty.dbConnection.ConnectionDB;

public class GetSpecialItem {
	public int getSpecialCnt(String specialCode, String mode) {
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		int count = 0;
		String sql = "";
		if(mode.equals("brand")){
			sql = "SELECT COUNT(`code`) AS cnt FROM `goods` WHERE `manufacturingCompany_code` = '"+specialCode+"'";
		}else {
			sql = "SELECT COUNT(`code`) AS cnt FROM `goods` WHERE `category` LIKE '"+specialCode+"%'";
		}
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
	public Vector<GetGoodsListBean> getSpecialItem(String specialCode, String itemCode, String mode){
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		Vector<GetGoodsListBean> specialItem = new Vector<GetGoodsListBean>();
		String sql = "";
		
		if(mode.equals("brand")) {
			sql = "SELECT g.*, m.`nameEng`, m.`nameKor` FROM `goods` AS g LEFT JOIN `manufacturingcompany` AS m ON g.`manufacturingCompany_code`=m.`code` WHERE g.`manufacturingCompany_code` = '"+specialCode+"' AND g.`code` = '"+itemCode+"'";
		}else {
			sql = "SELECT g.*, m.`nameEng`, m.`nameKor` FROM `goods` AS g LEFT JOIN `manufacturingcompany` AS m ON g.`manufacturingCompany_code`=m.`code` WHERE g.`category` LIKE '"+specialCode+"%' LIMIT "+itemCode+", 1";
		}
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			rs.next();
			GetGoodsListBean gglb = new GetGoodsListBean();
			gglb.setCode(rs.getString("code"));
			gglb.setBarcode(rs.getString("barcode"));
			gglb.setItem_name(rs.getString("item_name"));
			gglb.setItem_name_reg(rs.getString("item_name_reg"));
			gglb.setItem_number(rs.getString("item_number"));
			gglb.setItem_standard(rs.getString("item_standard"));
			gglb.setItem_origin(rs.getString("item_origin"));
			gglb.setManufacturingCompany_code(rs.getString("manufacturingCompany_code"));
			gglb.setItem_unit(rs.getString("item_unit"));
			gglb.setItem_retailPrice(rs.getInt("item_retailPrice"));
			gglb.setItem_purchasePrice(rs.getInt("item_purchasePrice"));
			gglb.setItem_SalePrice_1(rs.getInt("item_SalePrice_1"));
			gglb.setItem_SalePrice_2(rs.getInt("item_SalePrice_2"));
			gglb.setItem_SalePrice_3(rs.getInt("item_SalePrice_3"));
			gglb.setNotice(rs.getString("notice"));
			gglb.setKeyword(rs.getString("keyword"));
			gglb.setCategory(rs.getString("category"));
			gglb.setRegistrationDate(rs.getString("registrationDate"));
			gglb.setModifyDate(rs.getString("modifyDate"));
			gglb.setDiscontinued(rs.getString("discontinued"));
			gglb.setOutOfStock(rs.getString("outOfStock"));
			gglb.setOption(rs.getString("option"));
			gglb.setHit(rs.getInt("hit"));
			gglb.setNameEng(rs.getString("nameEng"));
			gglb.setNameKor(rs.getString("nameKor"));
			specialItem.add(gglb);
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		return specialItem;
	}
}