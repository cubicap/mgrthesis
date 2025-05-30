function setPx(array: object, width: int32, x: int32, y: int32, value: int32): void {
    array[y * width + x] = value;
}
function floor(x: float64): int32 {
    return x;
}
function round(x: float64): int32 {
    return x + 0.5;
}


function line(array: object, width: int32, x0: int32, y0: int32, x1: int32, y1: int32): void {
    let dx: int32 = x1 - x0;
    let dy: int32 = y1 - y0;
    let dxFloat: float64 = dx;
    let gradient: float64 = dy / dxFloat;

    let xPixel1: int32 = x0;
    let yPixel1: int32 = y0;

    setPx(array, width, xPixel1, yPixel1, 255);

    let intery: float64 = y0 + gradient;

    let xPixel2: int32 = x1;
    let yPixel2: int32 = y1;

    setPx(array, width, xPixel2, yPixel2, 255);

    for (let x: int32 = xPixel1 + 1; x < xPixel2; x++) {
        let floorIntery: int32 = floor(intery);
        setPx(array, width, x, floorIntery, round((1 - (intery - floorIntery)) * 255));
        setPx(array, width, x, floorIntery + 1, round((intery - floorIntery) * 255));
        intery += gradient;
    }
}


function run(size, count) {
    const width = size * 1.5;
    const height = size;
    let buf = new ArrayBuffer(width * height);
    let array = new Uint8Array(buf);
    let x1 = 0;
    let y1 = 0;
    let x2 = width;
    let y2 = height;

    for (let i = 0; i < count; i++) {
        line(array, width, x1, y1, x2, y2);
    }
}

run(s, n);
exit(0);
