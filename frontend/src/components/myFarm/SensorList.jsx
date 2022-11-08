import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../atom";

const SensorList = ({ deviceId }) => {
  const [sensor, setSensor] = useRecoilState(deviceSensor)
  const zzz = [sensor[deviceId]]
  return (
    <div>
      {
        zzz.map((wpqkf) => {
          if (wpqkf.temp) {
            <div>
              {wpqkf.temp} 
            </div>
          }
        })
      }
    </div>
  )
};

export default SensorList;
