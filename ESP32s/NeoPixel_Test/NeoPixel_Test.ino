#include<Adafruit_NeoPixel.h>                        //네오픽셀 라이브레리
#define ledPin 12                                     //아두이노의 디지털 6번핀을 "ledPin"로 지정 (네오픽셀이 아두이노에 연결된 핀)
#define numLeds 12                                   //12(네오픽셀의 led개수) 를 "numLeds"로 지정
Adafruit_NeoPixel strip(numLeds, ledPin, NEO_GRB + NEO_KHZ800); 

// NEO_GRB 네오픽셀들이 GRB 비트스트림으로 연결되어있음 (비트스트림 : 한번에 한비트씩 직렬 통신선로를 통해 연속적으로 전송되는 데이터의 흐름)
// NEO_KHZ800 800KHz의 비트스트림

void setup() {
  strip.begin();                 //작동시작
  strip.show();                  //초기값 (LED 모두꺼짐)
  strip.setBrightness(255);      // 밝기지정 (0~255 값이 있으며 255 일 때 가장 밝다))
}

void loop() {
   for(int i=0;i<numLeds;i++){                       // i를 정수 0 으로 지정하고 i가 12보다 작을때까지 실행문을 반복한다 (i가 11이 될때까지 총 12번)
    strip.setPixelColor(i,255,255,255);            // i번째 LED를 파랑색으로 켠다
    strip.show();                               //업데이트
    delay(100);
    strip.setPixelColor(i,0,0,0);            // i번째 LED를 파랑색으로 켠다
    }
}