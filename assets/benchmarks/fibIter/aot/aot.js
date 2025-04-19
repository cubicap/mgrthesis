function fib(n: Int32): Int32 {
    let n0: Int32 = 0;
    let n1: Int32 = 1;
    let n2: Int32 = 0;

    if (n == 0) {
        return n0;
    }
    for (let i: Int32 = 2; i <= n; i = i + 1) {
        n2 = n0 + n1;
        n0 = n1;
        n1 = n2;
    }

    return n1;
}

fib(Number(x).valueOf());
