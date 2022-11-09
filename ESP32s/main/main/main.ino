#include "getSensorVal.h"
#include "mqtt.h"
#include "controlLogic.h"
#include "common.h"
#include "Credential.h"

//table
int controlTable[] = {0,0,0,0,0};                    //tenp, led, fan, pump, buzzer
int manualTable[] = {0,0,0,0,0};
control controlVal = {30,10,30,500,12,14}; 

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
  pwmControl_begin();
}

void onConnectionEstablished();

void loop() {
  //dht.readTemperature() |  dht.readHumidity()
  //getCDS()
  //pm2008_i2c.pm2p5_grimm | pm2008_i2c.pm10_grimm
  //digitalWrite(Relay_IN1,HIGH), digitalWrite(Relay_IN1,LOW);
  //Serial.println(analogRead(Soil_pin));
  //Serial.println(getCO2(CM1106_I2C cm1106_i2c))
  int temp;
  int solidHumidity;
  int co2;

  client.loop();
  for(int i=0;i<5;i++){
    if(controlTable[i] == 0){
      manualMode(i);
    }
    if(controlTable[i] == 1){
      autoMode(i, temp, solidHumidity, co2);
    }
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