function setPx(array, width, x, y, value) {
    array[y * width + x] = value;
}


function line(array, width, x0, y0, x1, y1) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let gradient = dy / dx;

    let xPixel1 = x0;
    let yPixel1 = y0;

    setPx(array, width, xPixel1, yPixel1, 255);

    let intery = y0 + gradient;

    let xPixel2 = x1;
    let yPixel2 = y1;

    setPx(array, width, xPixel2, yPixel2, 255);

    for (let x = xPixel1 + 1; x < xPixel2; x++) {
        let floorIntery = Math.floor(intery);
        setPx(array, width, x, floorIntery, Math.round((1 - (intery - floorIntery)) * 255));
        setPx(array, width, x, floorIntery + 1, Math.round((intery - floorIntery) * 255));
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
