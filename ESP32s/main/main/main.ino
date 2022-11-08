#include "getSensorVal.h"
#include "mqtt.h"
#include "common.h"
#include "Credential.h"

//object declaration
PM2008_I2C pm2008_i2c;
DHT dht(DHT22_pin, DHTTYPE);
EspMQTTClient client(ssid, password, mqttBrokerIP, clientName, mqttPort);
StaticJsonDocument<200> doc;

// CM1106_I2C cm1106_i2c;


void setup() {
  Serial.begin(115200);
  Wire.begin();
  dht.begin();
  relay_begin();
  pm2008_i2c.command();
  // cm1106_i2c.read_serial_number();
  // cm1106_i2c.check_sw_version();
  client.enableDebuggingMessages();
}

void onConnectionEstablished() {
  client.subscribe(topic_sub_auto, [](const String &payload) {
    updateControlTable(payload);
  });

  client.subscribe(topic_sub_autoVal, [](const String &payload) {
    Serial.println(payload);
  });

  client.subscribe(topic_sub_manual, [](const String &payload) {
    Serial.println(payload);
  });
}

void loop() {
  //dht.readTemperature() |  dht.readHumidity()
  //getCDS()
  //pm2008_i2c.pm2p5_grimm | pm2008_i2c.pm10_grimm
  //digitalWrite(Relay_IN1,HIGH), digitalWrite(Relay_IN1,LOW);
  client.loop();
  //Serial.println(analogRead(Soil_pin));
  //Serial.println(getCO2(CM1106_I2C cm1106_i2c))
}