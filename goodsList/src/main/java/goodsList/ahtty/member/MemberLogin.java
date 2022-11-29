package goodsList.ahtty.member;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@WebServlet("/member/login")
public class MemberLogin extends HttpServlet {

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
	    String userId = "";
	    String userPw = "";
	    try {
	        getPara = new JSONParser();
	        jObj = (JSONObject)getPara.parse(builder.toString());
	        userId = (String) jObj.get("userId");
	        userPw = (String) jObj.get("userPw");
	    } catch (ParseException e) {
				e.printStackTrace();
		} 
		
		GetMemberInfo gmi = new GetMemberInfo();
		Vector<GetMemberInfoBean> memberLogin = gmi.login(userId, userPw);
		GetMemberInfoBean gmbi = (GetMemberInfoBean)memberLogin.elementAt(0);
		String condi = gmbi.getCondi();
		if(condi.equals("MEMBER")) {
			HttpSession session = request.getSession();
			session.setAttribute("idx", gmbi.getIdx());
			session.setAttribute("userId", gmbi.getUserId());
			session.setAttribute("userPw", gmbi.getUserPw());
			session.setAttribute("userMail", gmbi.getUserMail());
			session.setAttribute("userCellphone", gmbi.getUserCellphone());
			session.setAttribute("companyName", gmbi.getCompanyName());
			session.setAttribute("companyRegistrationNumber", gmbi.getCompanyRegistrationNumber());
			session.setAttribute("companyPhone", gmbi.getCompanyPhone());
			session.setAttribute("companyFAX", gmbi.getCompanyFAX());
			session.setAttribute("companyZipcode", gmbi.getCompanyZipcode());
			session.setAttribute("companyAddress_1", gmbi.getCompanyAddress_1());
			session.setAttribute("companyAddress_2", gmbi.getCompanyAddress_2());
			session.setAttribute("registrationDate", gmbi.getRegistrationDate());
			session.setAttribute("modifyDate", gmbi.getModifyDate());
			session.setAttribute("authority", gmbi.getAuthority());
		}
		
		ServletContext application =  request.getServletContext();
		application.setAttribute("condi", condi);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/member/login.jsp");
		dispatcher.forward(request, response);
	}
}
