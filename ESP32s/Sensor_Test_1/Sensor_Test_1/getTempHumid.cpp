#include "getTempHumid.h"
#include "Definition_Pin.h"
#include "DHT.h"

void pinSetting(){
  pinMode(DHT22_pin,INPUT);
}

float* getTempHumid(){                      //return array --> arr[0] : Temp, arr[1] : Humid
  DHT dht(DHT22_pin,DHTTYPE);
  dht.begin();
  static float arr[2];
  arr[0] = dht.readTemperature(); 
  arr[1] = dht.readHumidity();
  return arr;
}

int getCDS(){                              //return average (cnt)
  int cnt = 0;
  for(int i=0;i<1000;i++){
    cnt += analogRead(CDS_pin);
  }
  cnt /= 1000;
  return cnt;
}