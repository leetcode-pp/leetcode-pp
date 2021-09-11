#include <string>
using namespace std;

class Solution {
public:
  string dayOfTheWeek(int day, int month, int year) {
    int months[] = {31, 28, 31, 30, 31, 30, 31, 31,
                    30, 31, 30, 31};
    int leap_months[] = {31, 29, 31, 30, 31, 30, 31,
                        31, 30, 31, 30, 31};
    string days[] = {"Friday", "Saturday", "Sunday",
                    "Monday", "Tuesday",
                    "Wednesday", "Thursday"};
    int years = year - 1971, leaps = 0, i = 1972;
    while (i < year) {
      if (i % 400 == 0 || (i % 4 == 0 && i % 100))
        leaps += 1;
      i += 1;
    }
    int diff = (years * 365) + leaps;
    for (int m = 0; m < month - 1; m++) {
      if (i % 400 == 0 || (i % 4 == 0 && i % 100))
        diff += leap_months[m];
      else
        diff += months[m];
    }
    diff += day - 1;
    return days[diff % 7];
  }
};
