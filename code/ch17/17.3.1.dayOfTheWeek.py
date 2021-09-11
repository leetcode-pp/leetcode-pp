class Solution:
    def dayOfTheWeek(self, day: int, month: int, year: int) -> str:
        months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        leap_months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        # 1971-01-01 作为基准日期
        # 1971-01-01 是周五
        days = [
            "Friday",
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
        ]
        years = year - 1971
        leaps = 0
        i = 1972
        # 处理年
        while i < year:
            if i % 400 == 0 or (i % 4 == 0 and i % 100 != 0):
                leaps += 1
            i += 1
        diff = (years * 365) + leaps
        # 处理月
        for m in range(month - 1):
            if i % 400 == 0 or (i % 4 == 0 and i % 100 != 0):
                diff += leap_months[m]
            else:
                diff += months[m]
        # 处理日
        diff += day - 1
        return days[diff % 7]
