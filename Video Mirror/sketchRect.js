let capture;
let flag = 1;
let x = 0;
let y =0;
let count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(GRAY);
  // capture = createCapture(VIDEO);
  // capture.size(320, 240);
  // capture.hide();
}

function draw() {
  if(flag%60 == 0){
    rect(x, y, 40, 30);
    x+=80;
    count++;
    if(count%12==0){
      x=0;
      y+=60;
    }
    }
  
  flag++;
}