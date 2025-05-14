function multiply(a, b, res, n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let sum = 0;
            for (let k = 0; k < n; k++) {
                let x = a[i * n + k];
                let y = b[k * n + j];
                sum += x * y;
            }
            res[i * n + j] = sum;
        }
    }
}

function matMul(n) {
    let storage = new ArrayBuffer(n * n * 4 * 3);
    let a = new Int32Array(storage, 0, n * n);
    let b = new Int32Array(storage, n * n * 4, n * n);
    let res = new Int32Array(storage, n * n * 4 * 2, n);

    for (let i = 0; i < n * n; ++i) {
        a[i] = Math.random() * 1000;
        b[i] = Math.random() * 1000;
    }

    multiply(a, b, res, n);
}

matMul(x);
exit(0);
