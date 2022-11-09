#include <ArduinoJson.h>

struct control{
  int temp_h;
  int temp_l;
  int humid;
  int co2;
  int led_s;
  int led_e;
};

extern StaticJsonDocument<200> doc;
extern int controlTable[];
extern int manualTable[];
extern control controlVal;

void updateControlTable(String payload){
  deserializeJson(doc,payload);
  int temp = doc["temp"] | -999; 
  if(temp != -999) controlTable[0] = temp;
  
  int led = doc["led"] | -999; 
  if(led != -999) controlTable[1] = led;
  
  int fan = doc["fan"] | -999; 
  if(fan != -999) controlTable[2] = fan;
  
  int pump = doc["pump"] | -999; 
  if(pump!= -999) controlTable[3] = pump;
  
  int buzzer = doc["buzzer"] | -999; 
  if(buzzer!=-999) controlTable[4] = buzzer;
}

void updateManualTable(String payload){
  deserializeJson(doc,payload);
  int temp = doc["temp"] | -999; 
  if(temp != -999) manualTable[0] = temp;

  int led = doc["led"] | -999; 
  if(led != -999) manualTable[1] = led;
  
  int fan = doc["fan"] | -999;
  if(fan != -999) manualTable[2] = fan;
  
  int pump = doc["pump"] | -999; 
  if(pump != -999) manualTable[3] = pump;
  
  int buzzer = doc["buzzer"] | -999;
  if(buzzer != -999) manualTable[4] = buzzer;
}

void updateControlVal(String payload){
  deserializeJson(doc,payload);
  int temp_h = doc["temp"][0] | -999;
  Serial.println(temp_h);
  if(temp_h != -999) controlVal.temp_h = temp_h;

  int temp_l = doc["temp"][1] | -999; 
  Serial.println(temp_l);
  if(temp_l != -999) controlVal.temp_l = temp_l;

  int humid = doc["soilHumidity"] | -999; 
  if(humid != -999) controlVal.humid = humid;

  int co2 = doc["co2"] | -999; 
  if(co2 != -999) controlVal.co2 = co2;

  int led_s = doc["led"][0] | -999; 
  if(led_s != -999) controlVal.led_s = led_s;

  int led_e = doc["led"][1] | -999;
  if(led_s != -999) controlVal.led_e = led_e;
}