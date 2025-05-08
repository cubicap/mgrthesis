// The Computer Language Benchmarks Game
// http://benchmarksgame.alioth.debian.org/
//
// contributed by Ian Osgood
// Optimized by Roy Williams

function A(i: int32, j: int32): float64 {
    return 1 / (((i + j) * (i + j + 1) >>> 1) + i + 1);
}

function calculateRowSum(i: int32, u: object, n: int32): float64 {
    let t: float64 = 0;
    for (let j: int32 = 0; j < n; ++j) {
        t += A(i, j) * u[j];
    }
    return t;
}

function calculateColumnSum(i: int32, u: object, n: int32): float64 {
    let t: float64 = 0;
    for (let j: int32 = 0; j < n; ++j) {
        t += A(j, i) * u[j];
    }
    return t;
}

function Au(u: object, v: object): void {
    let n: int32 = u.length;
    for (let i: int32 = 0; i < n; ++i) {
        v[i] = calculateRowSum(i, u, n);
    }
}

function Atu(u: object, v: object, c: object): void {
    let n: int32 = u.length;
    for (let i: int32 = 0; i < n; ++i) {
        v[i] = calculateColumnSum(i, u, n);
    }
}

function AtAu(u, v, w, c) {
    Au(u, w);
    Atu(w, v, c);
}

function spectralnorm(n) {
    let storage_ = new ArrayBuffer(n * 24);
    let u = new Float64Array(storage_, 0, n),
        v = new Float64Array(storage_, 8 * n, n),
        w = new Float64Array(storage_, 16 * n, n);
    let i, vv = 0, vBv = 0;
    for (i = 0; i < n; ++i) {
        u[i] = 1; v[i] = w[i] = 0;
    }
    for (i = 0; i < 10; ++i) {
        AtAu(u, v, w, console);
        AtAu(v, u, w, console);
    }
    for (i = 0; i < n; ++i) {
        vBv += u[i] * v[i];
        vv += v[i] * v[i];
    }
    return Math.sqrt(vBv / vv);
}

spectralnorm(x);
exit(0);
