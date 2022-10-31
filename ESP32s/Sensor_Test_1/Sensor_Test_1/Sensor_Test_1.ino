#include "getTempHumid.h"

void setup() {
  Serial.begin(115200);
}

void loop() {
  // float* TempHumidArr = getTempHumid();           //get Temp, Humid | TempHumidArr[0] = Temp, TempHumidArr[1] = Humid;
  // Serial.println(getCDS());                       //get CDS Value
  float* pm_arr = get_pm();
  Serial.print("Number of 2.5 um :");
  Serial.println(pm_arr[0]);
  Serial.print("Number of 10 um : ");
  Serial.println(pm_arr[1]);
}

