import { GpioMapping, LedMatrix, LedMatrixUtils, PixelMapperType } from 'rpi-led-matrix';

const matrix = new LedMatrix ({
    ...LedMatrix.defaultMatrixOptions(),
    rows: 32,
    cols: 64,
    chainLength: 2, 
    hardwareMapping: GpioMapping.AdafruitHat,
    pixelMapperConfig: LedMatrixUtils.encodeMappers({
        type: PixelMapperType.U
    })
}, {
    ...LedMatrix.defaultRuntimeOptions(),
    gpioSlowdown: 1
})

matrix
    .clear()
    .brightness(100)
    .fgColor(0x0000ff)
    .fill()
    .sync();

// Exit after 5 seconds (5000 milliseconds)
setTimeout(() => {
    console.log('Exiting');
    matrix.clear().sync();
    process.exit(0); // 0 indicates successful exit
  }, 5000);