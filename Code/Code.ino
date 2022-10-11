#include "U8glib.h"
#include <TinyGPS++.h>
#include <SoftwareSerial.h>

U8GLIB_SH1106_128X64 u8g(13, 11, 10, 9); // SCK = 13, MOSI = 11, CS = 10, A0 = 9

static const int RXPin = 4, TXPin = 5;
static const uint32_t GPSBaud = 9600;


// The TinyGPS++ object
TinyGPSPlus gps;

// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);

void setup(void) {
  Serial.begin(9600);
  ss.begin(GPSBaud);
}

void loop(void) {
  while (ss.available() > 0){
    gps.encode(ss.read());
    if (gps.location.isUpdated()){
      Serial.print(gps.speed.kmph(),9);
      Serial.print(",");
      Serial.print(gps.location.lng(),9);
      Serial.print(",");
      Serial.print(gps.location.lat(),9);
      Serial.print(",\n");
      // picture loop
      u8g.firstPage();
      do {
        u8g.setFont(u8g_font_5x7);
        u8g.setPrintPos(0, 43);
        u8g.print(gps.location.lat(),12);
        u8g.setPrintPos(0, 50);
        u8g.print(gps.location.lng(),12);
        u8g.setFont(u8g_font_unifont);
        u8g.setPrintPos(0, 60);
        u8g.print(TinyGPSPlus::distanceBetween(gps.location.lat(), gps.location.lng(),-37.794366572722275, 145.05052873816106));
      } while( u8g.nextPage() );
      // rebuild the picture after some delay
    }
  }
}
