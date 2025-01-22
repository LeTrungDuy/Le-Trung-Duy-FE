## Performance Issues in WalletPage Component

## 1. Missing field in interface:

- Because the balance data type is declared as `WalletBalance`, but WalletBalance does not have the `blockchain` attribute, it will break. This field needs to be added to the `WalletBalance` interface.

## 2. Unnecessary Computation in useMemo:

The useMemo hook is used to optimize performance by memoizing values. However, within the `sortedBalances` computation:

- Filtering logic `(balance.amount <= 0)` and priority assignment seem flawed because it doesn't properly account for `lhsPriority`.

## 3. Incorrect Dependency in `useMemo`:

`prices` is included as a dependency of `useMemo`, but it is not directly used in the computation of `sortedBalances`. This could lead to unnecessary re-computation.

## 4. Logic Issue in Filtering:

- The filter condition only checks `balance.amount <= 0` if `getPriority(balance.blockchain) > -99`. This may cause logical errors, as balances with a valid priority but positive amounts are excluded.

## 5. Repetitive Calls to `getPriority`:

- `getPriority` is called multiple times for the same balance in both filtering and sorting, leading to redundant computation.

## 6. Improper Use of map:

- `sortedBalances` is mapped twice: once to `format balances` and once to generate `rows`. This leads to repetitive processing that can be avoided by combining these operations.

## 7. Key Property Issue:

- Using the index as the key for WalletRow can lead to rendering issues when the list changes dynamically.
