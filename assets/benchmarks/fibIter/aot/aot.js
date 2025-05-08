function fib(n: int32): int32 {
    let n0: int32 = 0;
    let n1: int32 = 1;
    let n2: int32 = 0;

    if (n == 0) {
        return n0;
    }
    for (let i: int32 = 2; i <= n; i = i + 1) {
        n2 = n0 + n1;
        n0 = n1;
        n1 = n2;
    }

    return n1;
}

fib(x);
exit(0);
