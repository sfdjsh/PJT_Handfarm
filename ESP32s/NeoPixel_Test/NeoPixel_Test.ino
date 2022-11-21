#include <Adafruit_NeoPixel.h>

#define PIN 23
#define STRIPSIZE 100

Adafruit_NeoPixel strip = Adafruit_NeoPixel(STRIPSIZE, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  strip.begin();
  strip.setBrightness(255);  // Lower brightness and save eyeballs!
  strip.show(); // Initialize all pixels to 'off'
}

void loop() {
  colorWave(50);
}

void colorWave(uint8_t wait) {
  int i, j, stripsize, cycle;
  float ang, rsin, gsin, bsin, offset;
  static int tick = 0;
  stripsize = strip.numPixels();
  cycle = stripsize * 25; // times around the circle...

  while (++tick % cycle) {
    offset = map2PI(tick);
    for (i = 0; i < stripsize; i++) {
      ang = map2PI(i) - offset;
      rsin = sin(ang);
      gsin = sin(2.0 * ang / 3.0 + map2PI(int(stripsize/6)));
      bsin = sin(4.0 * ang / 5.0 + map2PI(int(stripsize/3)));
      //strip.setPixelColor(i, strip.Color(trigScale(rsin), 0, 0));
      strip.setPixelColor(i, strip.Color(trigScale(bsin), trigScale(bsin), trigScale(bsin)));
    }
    strip.show();
    delay(wait);
  }
}

byte trigScale(float val) {
  val += 1.0; // move range to [0.0, 2.0]
  val *= 127.0; // move range to [0.0, 254.0]

  return int(val) & 255;
}
float map2PI(int i) {
  return PI*2.0*float(i) / float(strip.numPixels());
}