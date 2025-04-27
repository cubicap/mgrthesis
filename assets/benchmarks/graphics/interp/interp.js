function setPx(array, width, x, y, value) {
    array[y * width + x] = value;
}


function line(array, width, x0, y0, x1, y1, m) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let dxFloat = dx;
    let gradient = dy / dxFloat;

    let xEnd = x0;
    let yEnd = y0;
    let xGap = 1 - (x0 + 0.5 - Math.floor(x0 + 0.5));
    let xPixel1 = xEnd;
    let yPixel1 = yEnd;

    array[yPixel1 * width + xPixel1] = Math.floor((1 - (yEnd - yPixel1)) * xGap * 255);
    array[(yPixel1 + 1) * width + xPixel1] = Math.floor((yEnd - yPixel1) * xGap * 255);

    let intery = yEnd + gradient;

    xEnd = x1;
    yEnd = y1;
    xGap = x1 + 0.5 - Math.floor(x1 + 0.5);
    let xPixel2 = xEnd;
    let yPixel2 = yEnd;

    array[ yPixel2 * width + xPixel2] = Math.round((1 - (yEnd - yPixel2)) * xGap * 255);
    array[(yPixel2 + 1) * width + xPixel2] = Math.round((yEnd - yPixel2) * xGap * 255);

    for (let x = xPixel1 + 1; x < xPixel2; x++) {
        let floorIntery = Math.floor(intery);
        array[floorIntery * width + x] = Math.round((1 - (intery - floorIntery)) * 255);
        array[(floorIntery + 1) * width + x] = Math.round((intery - floorIntery) * 255);
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

for (let i = 0; i < 1000; i++) {
    line(array, width, x1, y1, x2, y2, Math);
}
