import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useRecoilState } from "recoil";
import { userFarm } from "../../atom";
import { EventSourcePolyfill } from 'event-source-polyfill'

const SensorList = ({ deviceId }) => {
  const [myFarm, setMyFarm] = useRecoilState(userFarm)
  const [count, setCount] = useState(null)

  const handleConnect = () => {
    console.log(deviceId)
    const sse = new EventSourcePolyfill(`${BASE_URL}/connect/${deviceId}`)
    sse.addEventListener('connect', (e) => {
      const {data: receivedConnectData} = e;
      console.log('connent event data:', receivedConnectData)
    })
    sse.CLOSED();
    sse.addEventListener('count', e => {
      const {data: receivedCount } = e;
      console.log("count event data", receivedCount);
      setCount(receivedCount)
    })
  }
  // const sse = new EventSourcePolyfill(`${BASE_URL}/connect/${deviceId}`)
  // sse.addEventListener('connect', (e) => {
  //   const { data: receivedConnectData } = e;
  //   setCount(receivedConnectData)
  // })

  // console.log(myFarm)
  // axios({
  //   url: `${BASE_URL}/farm/${deviceId}`,
  //   method: "GET",
  //   headers: {
  //     accessToken: localStorage.getItem("access_token"),
  //   },
  // }).then((response) => {
  //   console.log(response.data)
  //   setMyFarm(response.data);
  // }, []);
  console.log(count)

  // 데이터는 받는데.. 화면단에 보이는게 안됨...
  return (
    <div>
      <button onClick={handleConnect}>connect 요청</button>
      {/* <button onClick={handleCountClick}>count 요청</button> */}
      {count}
      {/* <div>
        {count.humid}
      </div>
      <div>
        {count.soilHumid}
      </div> */}
    </div>
  )
};

export default SensorList;
