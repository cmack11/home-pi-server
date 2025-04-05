import { ConfiguredMatrix } from "..";

const matrix = new ConfiguredMatrix();

for(let i = 0; i < ConfiguredMatrix.TOTAL_ROWS; i++) {
    matrix.setPixel(0,i,0xFF00FF);
    matrix.sync();
}

setTimeout(() => {
    matrix.reset().sync();
}, 1000 * 10)
