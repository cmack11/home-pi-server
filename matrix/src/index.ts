import {
  GpioMapping,
  LedMatrix,
  LedMatrixUtils,
  PixelMapperType,
  type LedMatrixInstance,
  type MatrixOptions
} from 'rpi-led-matrix';

export class ConfiguredMatrix {

  private matrix: LedMatrixInstance;

  private static DEVICE_MATRIX_ROW_SIZE: MatrixOptions["rows"] = 32;
  private static DEVICE_MATRIX_COLS_SIZE: MatrixOptions["cols"] = 64;
  private static NUM_DEVICE_MATRICES: MatrixOptions["chainLength"]  = 2;

  private static TOTAL_ROWS = this.DEVICE_MATRIX_COLS_SIZE * this.NUM_DEVICE_MATRICES;
  private static TOTAL_COLS = this.DEVICE_MATRIX_COLS_SIZE;

  constructor() {
    this.matrix = new LedMatrix(
      {
        ...LedMatrix.defaultMatrixOptions(),
        rows: ConfiguredMatrix.DEVICE_MATRIX_ROW_SIZE,
        cols: ConfiguredMatrix.DEVICE_MATRIX_COLS_SIZE,
        chainLength: ConfiguredMatrix.NUM_DEVICE_MATRICES,
        hardwareMapping: GpioMapping.AdafruitHat,
        pixelMapperConfig: LedMatrixUtils.encodeMappers({
          type: PixelMapperType.U,
        }),
      },
      {
        ...LedMatrix.defaultRuntimeOptions(),
        gpioSlowdown: 1,
      },
    );
  }

  public clear(): LedMatrixInstance {
    return this.matrix.clear();
  }

  public reset(): LedMatrixInstance {
    return this.clear().brightness(100);
  }

  public sync(): void {
    return this.matrix.sync();
  }

  public setPixel(row: number, col: number, color: number): LedMatrixInstance {
    return this.matrix.fgColor(color).setPixel(row, col);
  }

  public testBlueSquare(): LedMatrixInstance {
    setTimeout(() => {
      this.matrix.clear().sync();
    }, 5000);

    return this.matrix.fgColor(0x0000ff).fill()
  }

  // New pixel-by-pixel color cycle animation
  public async pixelColorCycleAnimation(): Promise<void> {
    const colors = [
      0xFF0000, // Red
      0x00FF00, // Green
      0x0000FF, // Blue
      0xFFFF00, // Yellow
      0xFF00FF, // Magenta
      0x00FFFF, // Cyan
    ];

    let colorIndex = 0;

    // Function to fill the matrix pixel by pixel
    const fillPixelByPixel = (color: number) => {
      return new Promise<void>((resolve) => {
        let row = 0;
        let col = 0;

        // Function to update each pixel on the matrix
        const updateNextPixel = () => {
          this.setPixel(col, row, color);
          this.sync();
          
          col++;

          // Move to the next row once a row is filled
          if (col >= ConfiguredMatrix.TOTAL_COLS) {
            col = 0;
            row++;
          }

          // When all pixels are updated, resolve the promise
          if (row >= ConfiguredMatrix.TOTAL_ROWS) {
            resolve();
          } else {
            setTimeout(updateNextPixel, 50); // Adjust speed by modifying timeout
          }
        }

        updateNextPixel(); // Start the pixel update process
      });
    }

    // Function to cycle colors and update pixel by pixel
    const cycleColors = async () => {
      // Fill the matrix with the current color pixel by pixel
      await fillPixelByPixel(colors[colorIndex]);

      // Once the matrix is fully filled, change to the next color
      colorIndex = (colorIndex + 1) % colors.length;

      // Start the next cycle
      cycleColors();
    };

    cycleColors(); // Start the animation
  }
}
