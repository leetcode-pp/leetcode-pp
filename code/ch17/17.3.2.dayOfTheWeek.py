class Solution:
    def dayOfTheWeek(self, day: int, month: int, year: int) -> str:
        list_of_days = [
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
        ]
        if month == 1 or month == 2:
            year = year - 1
            month = month + 12
        y = year % 100
        c = year // 100
        weekday = int((day + 13 * (month + 1) // 5 + y + y // 4 + c // 4 + 5 * c) % 7)
        required_day = list_of_days[weekday]
        return required_day
