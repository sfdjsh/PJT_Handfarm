#include "getSensorVal.h"
#include "neopixelControl.h"
#include "mqtt.h"
#include "controlLogic.h"
#include "common.h"
#include "Credential.h"

//freeRtos
TaskHandle_t Task1;
TaskHandle_t Task2;

//table
int controlTable[] = {0,0,0,0,0};                    //tenp, led, fan, pump, buzzer
int manualTable[] = {1,0,0,0,0};
control controlVal = {30,10,30,500,12,14}; 

//object declaration
PM2008_I2C pm2008_i2c;
DHT dht(DHT22_pin, DHTTYPE);
EspMQTTClient client(ssid, password, mqttBrokerIP, clientName, mqttPort);
StaticJsonDocument<200> doc;
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NeoPixel_num, NeoPixel_pin, NEO_GRB + NEO_KHZ800);
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
  
  strip.begin();
  strip.setBrightness(255);
  strip.show();

  //Declaration Task
  xTaskCreatePinnedToCore(
    neopixelloop,         // 태스크 함수
    "Task1",           // 테스크 이름
    10000,             // 스택 크기(워드단위)
    NULL,              // 태스크 파라미터
    1,                 // 태스크 우선순위
    &Task1,            // 태스크 핸들
    0);                // 실행될 코어

  xTaskCreatePinnedToCore(
    mqttloop,          // 태스크 함수
    "Task2",           // 테스크 이름
    10000,             // 스택 크기(워드단위)
    NULL,              // 태스크 파라미터
    1,                 // 태스크 우선순위
    &Task2,            // 태스크 핸들
    1);                // 실행될 코어

}

void onConnectionEstablished();

void neopixelloop(void *param){
  if(client.onWiFiConnectionLost() == 1000){
    colorWave(strip, 50, 'r');
  }
  else{
    colorWave(strip, 50, 'g');
  }
}

void mqttloop(void *param){
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

void loop() {
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