// Three ways to sum to n

// 1. Using a Loop
var sum_to_n_a = function(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
      total += i;
  }
  return total;
};

// 2. Using the Arithmetic Series Formula
var sum_to_n_b = function(n) {
  return (n * (n + 1)) / 2;
};

// 3. Using Recursion
var sum_to_n_c = function(n) {
  if (n === 0) return 0;
  return n + sum_to_n_c(n - 1);
};