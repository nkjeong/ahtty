package goodsList.ahtty.calendar;

import java.util.Calendar;

public class GetCalendar {
	public String calendar() {
		Calendar getDate = Calendar.getInstance();
		
		int year = getDate.get(Calendar.YEAR);
		int month = getDate.get(Calendar.MONTH)+1;
		int date = getDate.get(Calendar.DATE);
		int day = getDate.get(Calendar.DAY_OF_WEEK);
		
		
		String toDay = "";
		switch(day) {
			case 1 : toDay = "SUNDAY";break;
			case 2 : toDay = "MONDAY";break;
			case 3 : toDay = "TUESDAY";break;
			case 4 : toDay = "WEDNESDAY";break;
			case 5 : toDay = "THURSDAY";break;
			case 6 : toDay = "FRIDAY";break;
			case 7 : toDay = "SATURDAY";break;
		}
		
		String reMonth = month < 10 ? "0"+month : Integer.toString(month);
		String reDate = date < 10 ? "0"+date : Integer.toString(date);
		
		String cal = "{\"year\":\""+year+"\", \"month\":\""+reMonth+"\", \"date\":\""+reDate+"\", \"day\":\""+day+"\", \"toDay\":\""+toDay+"\"}";
		
		return cal;
	}
}
