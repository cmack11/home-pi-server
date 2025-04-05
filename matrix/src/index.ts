import {
  GpioMapping,
  LedMatrix,
  LedMatrixUtils,
  PixelMapperType,
  type LedMatrixInstance
} from 'rpi-led-matrix';

export class ConfiguredMatrix {

  private matrix: LedMatrixInstance;

  constructor() {
    this.matrix = new LedMatrix(
      {
        ...LedMatrix.defaultMatrixOptions(),
        rows: 32,
        cols: 64,
        chainLength: 2,
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

  public testBlueSquare(): LedMatrixInstance {
    setTimeout(() => {
      this.matrix.clear().sync();
    }, 5000);

    return this.matrix.fgColor(0x0000ff).fill()
  }

}


