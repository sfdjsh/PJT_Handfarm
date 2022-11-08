#include <ArduinoJson.h>


void updateControlTable(String payload){
  StaticJsonDocument<200> doc;
  deserializeJson(doc,payload);
  int temp = doc["temp"];
}