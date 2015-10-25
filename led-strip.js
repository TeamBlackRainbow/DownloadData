var SerialPort = require("serialport");
var serialPort = new SerialPort.SerialPort("/dev/tty.usbmodem1421", {
  baudrate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

serialPort.on("open", function () {
  console.log('serial port open');
});

var setPixel = function(i, r, g, b) {
  serialPort.write(i+'I'+r+'R'+g+'G'+b+'BD\n');
}

module.exports = {
  setPixel: setPixel
}
