#include "getTempHumid.h"
#include "Definition_Pin.h"
#include "DHT.h"
#include <pm2008_i2c.h>

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

float* get_pm(){
  PM2008_I2C pm2008_i2c;
  #ifdef PM2008N
  // wait for PM2008N to be changed to I2C mode
    delay(10000);
  #endif

  pm2008_i2c.begin();
  pm2008_i2c.command();
  delay(1000);

  uint8_t ret = pm2008_i2c.read();
  if(ret == 0){
    static float arr[2] = {0};
    arr[0] = pm2008_i2c.pm2p5_grimm;
    arr[1] = pm2008_i2c.pm10_grimm;
    return arr;
  }
}