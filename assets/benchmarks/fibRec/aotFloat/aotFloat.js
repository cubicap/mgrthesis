function fib(n: float64): float64 {
    if (n == 0) {
        return 0;
    }
    else if (n == 1) {
        return 1;
    }

    return fib(n - 1) + fib(n - 2);
}

fib(x);
exit(0);
