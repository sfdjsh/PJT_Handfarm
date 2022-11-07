#include "getSensorVal.h"
#include "common.h"

void relay_begin(){
  pinMode(Relay_IN1,OUTPUT);
  pinMode(Relay_IN2,OUTPUT);
  pinMode(Relay_IN3,OUTPUT);
}

int getCDS(){                              //return average (cnt)
  int cnt = 0;
  for(int i=0;i<1000;i++){
    cnt += analogRead(CDS_pin);
  }
  cnt /= 1000;
  return cnt;
}
