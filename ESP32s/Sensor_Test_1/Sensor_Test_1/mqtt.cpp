#pragma once

#ifndef
define
#include "EspMQTTClient.h"
#include "Credential.h"
#endif

void onConnectionEstablished(EspMQTTClient client){
  client.subscribe(topic_sub_auto, [] (const String &payload){
    Serial.println(payload);
    });
  
  client.subscribe(topic_sub_autoVal, [] (const String &payload){
    Serial.println(payload);
    });

  client.subscribe(topic_sub_manual, [] (const String &payload){
    Serial.println(payload);
    });
 }