#include "getSensorVal.h"
#include "mqtt.h"
#include "common.h"
#include "Credential.h"

//object declaration
PM2008_I2C pm2008_i2c;
DHT dht(DHT22_pin,DHTTYPE);
EspMQTTClient client(ssid, password, mqttBrokerIP, clientName, mqttPort);

void setup() {
  Serial.begin(115200);
  Wire.begin();
  dht.begin();
  relay_begin();
  pm2008_i2c.command();

  client.enableDebuggingMessages();
  onConnectionEstablished(client);
}

void loop() {
  //dht.readTemperature() |  dht.readHumidity()
  //getCDS()
  //pm2008_i2c.pm2p5_grimm | pm2008_i2c.pm10_grimm
  //digitalWrite(Relay_IN1,HIGH), digitalWrite(Relay_IN1,LOW);
  client.loop();
  //Serial.println(analogRead(Soil_pin));
}

