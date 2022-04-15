// Demonstrates basic web serial input with p5js. See:
// https://makeabilitylab.github.io/physcomp/communication/p5js-serial
// 
// By Jon E. Froehlich
// @jonfroehlich
// http://makeabilitylab.io/
//

let shapeFraction = 0; // tracks the new shape fraction off serial
let pulse = 0;
let serial; // the Serial object
let serialOptions = { baudRate: 9600 };

function setup() {
  //createCanvas(700, 400);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(8);
  // Setup Web Serial using serial.js
  serial = new Serial();
  serial.on(SerialEvents.CONNECTION_OPENED, onSerialConnectionOpened);
  serial.on(SerialEvents.CONNECTION_CLOSED, onSerialConnectionClosed);
  serial.on(SerialEvents.DATA_RECEIVED, onSerialDataReceived);
  serial.on(SerialEvents.ERROR_OCCURRED, onSerialErrorOccurred);

  // If we have previously approved ports, attempt to connect with them
  serial.autoConnectAndOpenPreviouslyApprovedPort(serialOptions);

  // Add in a lil <p> element to provide messages. This is optional
  //pHtmlMsg = createP("Click anywhere on this page to open the serial connection dialog");
}

function draw() {
  background(5, 10);
  
  noStroke(); // turn off outline
  //fill(250); // white circle

  // Get x,y center of drawing Canvas
  let xCenter = width/2;
  let yCenter = random(height)

  // Set the diameter based on mouse x position
  const maxDiameter = min(width, height);
  // let shapeFraction = mouseX / width;
  //console.log(shapeFraction);
  
  // let circleDiameter =  map(shapeFraction, -100, 100, 1, 180);
  //fill(circleDiameter, 100, 100)
  
  if (pulse >= 0){
    fill(0, 100, 100, random(30));
    circleD = width/5;
  } else if (pulse <= 0) {
    fill(180, 50, 100, random(30));
    circleD = width/5;
  }
  circle(xCenter-random(width/4), yCenter, circleD);
  circle(xCenter+random(width/4), yCenter, circleD);
  circle(xCenter-random(width/1.5), yCenter, circleD);
  circle(xCenter+random(width/1.5), yCenter, circleD);
  
//   fill(0);
//   circle(xCenter-100, yCenter, 10);
//   circle(xCenter+100, yCenter, 10);
  
}

function onSerialErrorOccurred(eventSender, error) {
  console.log("onSerialErrorOccurred", error);
}

function onSerialConnectionOpened(eventSender) {
  console.log("onSerialConnectionOpened");
}

function onSerialConnectionClosed(eventSender) {
  console.log("onSerialConnectionClosed");
}

function onSerialDataReceived(eventSender, newData) {
  console.log("onSerialDataReceived", newData);
  //pHtmlMsg.html("onSerialDataReceived: " + newData);

  pulse = parseFloat(newData);
}

function mouseClicked() {
  if (!serial.isOpen()) {
    serial.connectAndOpen(null, serialOptions);
  }
  let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}