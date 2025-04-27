// The Computer Language Benchmarks Game
// http://benchmarksgame.alioth.debian.org/
//
// contributed by Ian Osgood
// Optimized by Roy Williams

function A(i, j) {
    return 1 / (((i + j) * (i + j + 1) >>> 1) + i + 1);
}

function computeAuRow(i, u, n) {
    let t = 0;
    for (let j = 0; j < n; ++j) {
        t += A(i, j) * u[j];
    }
    return t;
}

function computeAtuRow(i, u, n) {
    let t = 0;
    for (let j = 0; j < n; ++j) {
        t += A(j, i) * u[j];
    }
    return t;
}

function Au(u, v) {
    let n = u.length;
    for (let i = 0; i < n; ++i) {
        v[i] = computeAuRow(i, u, n);
    }
}

function Atu(u, v) {
    let n = u.length;
    for (let i = 0; i < n; ++i) {
        v[i] = computeAtuRow(i, u, n);
    }
}

function AtAu(u, v, w) {
    Au(u, w);
    Atu(w, v);
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
        AtAu(u, v, w);
        AtAu(v, u, w);
    }
    for (i = 0; i < n; ++i) {
        vBv += u[i] * v[i];
        vv += v[i] * v[i];
    }
    return Math.sqrt(vBv / vv);
}

spectralnorm(x);
