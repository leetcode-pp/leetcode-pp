public class Gcd {
  public int gcd(int a, int b) {
    if (a == b) return a;
    if (a < b)
      return gcd(b - a, a);
    return gcd(a - b, b);
  }
}
