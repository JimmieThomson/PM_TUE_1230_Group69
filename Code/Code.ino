/*
 * Rui Santos 
 * Complete Project Details https://randomnerdtutorials.com
 *
 * Based on the example TinyGPS++ from arduiniana.org
 *
 */
 
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <U8glib.h>

static const int RXPin = 3, TXPin = 4;
static const uint32_t GPSBaud = 9600;

U8GLIB_SH1106_128X64 u8g(13, 11, 10, 9); // SCK = 13, MOSI = 11, CS = 10, A0 = 9

// The TinyGPS++ object
TinyGPSPlus gps;

// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);

void setup(){
  u8g.setRot180();
  Serial.begin(9600);
  ss.begin(GPSBaud);
}

void loop(){
  // This sketch displays information every time a new sentence is correctly encoded.
  while (ss.available() > 0){
    gps.encode(ss.read());
    if (gps.location.isUpdated()){
      // Latitude in degrees (double)
      Serial.print("Latitude= "); 
      Serial.print(gps.location.lat(), 6);      
      // Longitude in degrees (double)
      Serial.print(" Longitude= "); 
      Serial.println(gps.location.lng(), 6); 
       
     
      Serial.print("Speed in km/h = "); 
      Serial.println(gps.speed.kmph()); 

      u8g.firstPage(); do {
      // picture loop u8g.firstPage(); do {
      u8g.setFont(u8g_font_unifont);
      u8g.drawStr( 0, 22, "Hello World!");
      } while( u8g.nextPage() );
      // rebuild the picture after some delay delay(50);
    }
  }
}
