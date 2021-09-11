class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        # 最终结果由两部分组成， 符号和值
        # 简单起见，全部取绝对值，计算出最终结果的值
        # 符号我们可以通过除是否大于0来判断

        # 长除法
        n, remainder = divmod(abs(numerator), abs(denominator))
        sign = ""
        if numerator // denominator < 0:
            sign = "-"

        res = [str(n), "."]
        seen = []
        while remainder not in seen:
            seen.append(remainder)
            n, remainder = divmod(remainder * 10, abs(denominator))
            res.append(str(n))
        # 处理循环节的格式
        index = seen.index(remainder)
        res.insert(index + 2, "(")
        res.append(")")

        return sign + "".join(res).replace("(0)", "").rstrip(".")
