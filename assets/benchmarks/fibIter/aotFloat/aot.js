function fib(n: float64): float64 {
    let n0: float64 = 0;
    let n1: float64 = 1;
    let n2: float64 = 0;

    if (n == 0) {
        return n0;
    }
    for (let i: float64 = 2; i <= n; i = i + 1) {
        n2 = n0 + n1;
        n0 = n1;
        n1 = n2;
    }

    return n1;
}

fib(x);
exit(0);
