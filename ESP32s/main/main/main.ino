#include "getSensorVal.h"
#include "neopixelControl.h"
#include "mqtt.h"
#include "controlLogic.h"
#include "common.h"
#include "Credential.h"

//table
int controlTable[] = { 0, 0, 0, 0, 0 };  //tenp, led, fan, pump, buzzer
int manualTable[] = { 1, 0, 0, 0, 0 };
control controlVal = { 30, 10, 30, 500, 12, 14 };

//object declaration
PM2008_I2C pm2008_i2c;
DHT dht(DHT22_pin, DHTTYPE);
EspMQTTClient client(ssid, password, mqttBrokerIP, clientName, mqttPort);
StaticJsonDocument<200> doc;
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NeoPixel_num, NeoPixel_pin, NEO_GRB + NEO_KHZ800);
CM1106_I2C cm1106_i2c;

unsigned long Post_Time = millis();
unsigned long Post_Delay = 2 * 1000;

void setup() {
  Serial.begin(115200);
  Wire.begin();
  dht.begin();
  relay_begin();
  cm1106_i2c.begin();
  pm2008_i2c.command();
  cm1106_i2c.read_serial_number();
  cm1106_i2c.check_sw_version();
  client.enableDebuggingMessages();
  pwmControl_begin();

  strip.begin();
  strip.setBrightness(255);
  strip.show();
}

void onConnectionEstablished();
void tx(float temp, float humid, float pm2p5, float pm10, int cds, int co2, int soilHumidity);

void loop() {
  //dht.readTemperature() |  dht.readHumidity()
  //getCDS()
  //Serial.println(getCO2(CM1106_I2C cm1106_i2c))

  //float temp = dht.readTemperature();
  //float humid = dht.readHumidity();
  //float pm2p5 = pm2008_i2c.pm2p5_grimm;
  //float pm10 = pm2008_i2c.pm10_grimm;
  //int solidHumidity = analogRead(Soil_pin);
  int co2 = getCO2(cm1106_i2c);
  int soilHumidity = analogRead(Soil_pin);

  client.loop();
  for (int i = 0; i < 5; i++) {
    if (controlTable[i] == 0) {
      manualMode(i);
    }
    if (controlTable[i] == 1) {
      //autoMode(i, temp, solidHumidity, co2);
    }
  }

  if (((millis() - Post_Time) > Post_Delay)) {
    pm2008_i2c.read();
    tx(dht.readTemperature(), dht.readHumidity(), pm2008_i2c.pm2p5_grimm, pm2008_i2c.pm10_grimm, getCDS(), co2,soilHumidity);
    Serial.println(getCDS());
    Post_Time = millis();
  }
  //check
  /*
    for(int i=0;i<5;i++){
      Serial.print(manualTable[i]);
      Serial.print(" ");
    }
    Serial.println();

    for(int i=0;i<5;i++){
      Serial.print(controlTable[i]);
      Serial.print(" ");
    }
    Serial.println();
    Serial.print(controlVal.temp_h);
    Serial.print(" ");
    Serial.print(controlVal.temp_l);
    Serial.print(" ");
    Serial.print(controlVal.humid);
    Serial.print(" ");
    Serial.print(controlVal.co2);
    Serial.print(" ");
    Serial.print(controlVal.led_s);
    Serial.print(" ");
    Serial.print(controlVal.led_e);
    Serial.println();
     */
}

void onConnectionEstablished() {
  client.subscribe(topic_sub_auto, [](const String &payload) {
    updateControlTable(payload);
  });

  client.subscribe(topic_sub_autoVal, [](const String &payload) {
    updateControlVal(payload);
  });

  client.subscribe(topic_sub_manual, [](const String &payload) {
    updateManualTable(payload);
  });
}

void tx(float temp, float humid, float pm2p5, float pm10, int cds, int co2,int soilHumidity) {
  char publish_msg[100];
  char str_temp[10];
  char str_humid[10];
  char str_pm2p5[10];
  char str_pm10[10];
  dtostrf(temp, 4, 1, str_temp);
  dtostrf(humid, 4, 1, str_humid);
  dtostrf(pm2p5, 4, 1, str_pm2p5);
  dtostrf(pm10, 4, 1, str_pm10);
  sprintf(publish_msg, "{temp:%s,humid:%s,pm2p5:%s,pm10:%s,cds:%d,co2:%d,humidSoil:%d}", str_temp, str_humid, str_pm2p5, str_pm10, cds, co2,soilHumidity);
  client.publish(topic_pub, publish_msg);
}

void colorWave(uint8_t wait) {
  int i, j, stripsize, cycle;
  float ang, rsin, gsin, bsin, offset;
  static int tick = 0;
  stripsize = strip.numPixels();
  cycle = stripsize * 25;  // times around the circle...

  while (++tick % cycle) {
    offset = map2PI(tick);
    for (i = 0; i < stripsize; i++) {
      ang = map2PI(i) - offset;
      rsin = sin(ang);
      gsin = sin(2.0 * ang / 3.0 + map2PI(int(stripsize / 6)));
      bsin = sin(4.0 * ang / 5.0 + map2PI(int(stripsize / 3)));
      //strip.setPixelColor(i, strip.Color(trigScale(rsin), 0, 0));
      strip.setPixelColor(i, strip.Color(0, 0, trigScale(bsin)));
    }
    strip.show();
    delay(wait);
  }
}

byte trigScale(float val) {
  val += 1.0;    // move range to [0.0, 2.0]
  val *= 127.0;  // move range to [0.0, 254.0]

  return int(val) & 255;
}
float map2PI(int i) {
  return PI * 2.0 * float(i) / float(strip.numPixels());
}