#include "U8glib.h"
#include <TinyGPS++.h>
#include <SoftwareSerial.h>

U8GLIB_SH1106_128X64 u8g(13, 11, 10, 9); // SCK = 13, MOSI = 11, CS = 10, A0 = 9

static const int RXPin = 3, TXPin = 4;
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
        u8g.setFont(u8g_font_unifont);
        u8g.setPrintPos(0, 10);
        u8g.print(gps.location.lat(),12);
        u8g.setPrintPos(0, 30);
        u8g.print(gps.location.lng(),12);
      } while( u8g.nextPage() );
      // rebuild the picture after some delay
    }
  }
}
