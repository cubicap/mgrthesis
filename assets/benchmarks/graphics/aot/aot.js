function setPx(array: object, width: int32, x: int32, y: int32, value: int32): void {
    array[y * width + x] = value;
}
function floor(x: float64): int32 {
    return x;
}
function round(x: float64): int32 {
    return x + 0.5;
}


function line(array: object, width: int32, x0: int32, y0: int32, x1: int32, y1: int32, m: object): void {
    let dx: int32 = x1 - x0;
    let dy: int32 = y1 - y0;
    let dxFloat: float64 = dx;
    let gradient: float64 = dy / dxFloat;

    let xEnd: int32 = x0;
    let yEnd: int32 = y0;
    let xGap: float64 = 1 - (x0 + 0.5 - floor(x0 + 0.5));
    let xPixel1: int32 = xEnd;
    let yPixel1: int32 = yEnd;

    setPx(array, width, xPixel1, yPixel1, floor((1 - (yEnd - yPixel1)) * xGap * 255));
    setPx(array, width, xPixel1, yPixel1 + 1, floor((yEnd - yPixel1) * xGap * 255));

    let intery: float64 = yEnd + gradient;

    xEnd = x1;
    yEnd = y1;
    xGap = x1 + 0.5 - floor(x1 + 0.5);
    let xPixel2: int32 = xEnd;
    let yPixel2: int32 = yEnd;

    setPx(array, width, xPixel2, yPixel2, round((1 - (yEnd - yPixel2)) * xGap * 255));
    setPx(array, width, xPixel2, yPixel2 + 1, round((yEnd - yPixel2) * xGap * 255));

    for (let x: int32 = xPixel1 + 1; x < xPixel2; x++) {
        let floorIntery: int32 = floor(intery);
        setPx(array, width, x, floorIntery, round((1 - (intery - floorIntery)) * 255));
        setPx(array, width, x, floorIntery + 1, round((intery - floorIntery) * 255));
        intery += gradient;
    }
}


const width = 4000;
const height = 3000;
let buf = new ArrayBuffer(width * height);
let array = new Uint8Array(buf);
let x1 = 500;
let y1 = 500;
let x2 = 3500;
let y2 = 2300;
line(array, width, x1, y1, x2, y2, Math);

for (let i = 0; i < 1000; i++) {
    line(array, width, x1, y1, x2, y2, Math);
}
