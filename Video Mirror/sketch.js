let capture;
let flag = 1;
let x = 0;
let y = 0;
let count = 0;

let serial; // variable for the serial object
let inData;

function setup() {
  x = (windowWidth * 3.2) / 26;
  createCanvas(windowWidth, windowHeight);
  background("#000000");
  capture = createCapture(VIDEO);
  capture.size(48, 48);
  capture.hide();

  // serial constructor
  serial = new p5.SerialPort();
  // get a list of all connected serial devices
  serial.list();
  // serial port to use - you'll need to change this
  serial.open("/dev/tty.usbmodem1101");
  // callback for when the sketchs connects to the server
  serial.on("connected", serverConnected);
  // callback to print the list of serial devices
  serial.on("list", gotList);
  // what to do when we get serial data
  serial.on("data", gotData);
  // what to do when there's an error
  serial.on("error", gotError);
  // when to do when the serial port opens
  serial.on("open", gotOpen);
  // what to do when the port closes
  serial.on("close", gotClose);
}

function serverConnected() {
  console.log("Connected to Server");
}

// list the ports
function gotList(thelist) {
  console.log("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    console.log(i + " " + thelist[i]);
  }
}

function gotOpen() {
  console.log("Serial Port is Open");
}

function gotClose() {
  console.log("Serial Port is Closed");
  // latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  console.log(theerror);
}

// when data is received in the serial buffer

function gotData() {
  inData = Number(serial.read());
  // console.log(inData);

  // let currentString = serial.readLine(); // store the data in a variable
  // trim(currentString); // get rid of whitespace
  // if (!currentString) return; // if there's nothing in there, ignore it
  // console.log(currentString); // print it out
  // latestData = currentString; // save it to the global variable
}

function draw() {
  if (inData == 1) {
    // if (flag % 60 == 0)
    noStroke();
    // rect(x, y, 24, 24);
    image(
      capture,
      x - 0.24,
      y,
      (windowWidth * 0.64) / 26,
      (windowWidth * 0.64) / 26
    );
    x += (windowWidth * 0.64) / 26;
    count++;
    if (count % 30 == 0) {
      x = 6 * 28;
      y += (windowWidth * 0.64) / 26;
    }
    inData = 0;
  }

  // flag++;
}
