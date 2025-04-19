function fib(n) {
    let n0 = 0;
    let n1 = 1;
    let n2 = 0;

    if (n == 0) {
        return n0;
    }
    for (let i = 2; i <= n; i++) {
        n2 = n0 + n1;
        n0 = n1;
        n1 = n2;
    }

    return n1;
}

fib(Number(x).valueOf());
