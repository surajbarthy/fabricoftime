/* Photocell simple testing sketch. 
 
Connect one end of the photocell to 5V, the other end to Analog 0.
Then connect one end of a 10K resistor from Analog 0 to ground 
Connect LED from pin 11 through a resistor to ground 
For more information see http://learn.adafruit.com/photocells */

const int stepPin = 2;
const int dirPin = 5;

int photocellPin = 0;     // the cell and 10K pulldown are connected to a0
int photocellReading;     // the analog reading from the sensor divider

int currentState = 0;
int lastState = 0;
int flag = 0;

void setup(void) {
    pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);
  // We'll send debugging information via the Serial monitor
  Serial.begin(9600);   
}
 
void loop(void) {
  photocellReading = analogRead(photocellPin);  
 
  // Serial.print("Analog reading = ");
  // Serial.println(photocellReading);     // the raw analog reading
 
// currentstate =1 if photocellReading>10
  // currentstate =0 if photocellReading<10

  if (photocellReading > 10)
    currentState = 1;  // shuttle in loom
  else
    currentState = 0;  // shuttle in case

  // if laststate=0 and currentstate=1
  // flag=1 laststate=currentstate
  // if laststate=1 and currentstate=0
  // flag=2 laststate=currentstate

  if (currentState == 1 && lastState == 0) {
    flag = 1;
    lastState = currentState;
  } else if (currentState == 0 && lastState == 1) {
    flag = 2;
    lastState = currentState;
  }

  // if flag==2 rotate servo and flag=0

  if (flag == 2) {
    // 400 because total steps is 200 * 1.8 = 1600; 1.8 degree is the driver step
    for (int i = 0; i < 400; i++) {

      digitalWrite(stepPin, HIGH);
      delay(1);
      digitalWrite(stepPin, LOW);
      delay(1);
    }
    // Serial.println("Step");
    delay(1000);
    flag = 0;

    Serial.write(1);
  }

  delay(100);
}
