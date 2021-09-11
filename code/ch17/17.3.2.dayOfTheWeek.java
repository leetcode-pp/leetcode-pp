import java.util.*;

public class Solution {
  public String dayOfTheWeek(int day, int month, int year) {
    String[] list_of_days = {
      "Saturday", "Sunday", "Monday", "Tuesday",
      "Wednesday", "Thursday", "Friday"
    };
    if (month == 1 || month == 2) {
      year -= 1;
      month += 12;
    }
    int y = year % 100, c = year / 100;
    int weekday = (day + 13 * (month + 1) / 5 + y
        + y / 4 + c / 4 + 5 * c) % 7;
    return list_of_days[weekday];
  }
}
