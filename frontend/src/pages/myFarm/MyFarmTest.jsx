import React, {useState} from 'react'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { BASE_URL } from "../../config";

const MyFarmTest = () => {
  const EventSource = EventSourcePolyfill || NativeEventSource;

  const [count, setCount] = useState(null)

  const d30Info = () => {
    const eventSource = new EventSource(`${BASE_URL}/connect/D30`)
    eventSource.addEventListener('connect', (e) => {
      const {data: receivedConnectData1} = e;
      console.log(receivedConnectData1)
      setCount(JSON.parse(receivedConnectData1))
    })
  }

  const d33Info = () => {
    const eventSource = new EventSource(`${BASE_URL}/connect/D33`)
    eventSource.addEventListener('connect', (e) => {
      const {data: receivedConnectData2} = e;
      console.log(receivedConnectData2)
      setCount(JSON.parse(receivedConnectData2))
    })
  }

  return (
    <div>
      <button style={{width:'100px', height:'100px'}}
      onClick={d30Info}>D30</button><br />
      <button style={{width:'100px', height:'100px', marginTop:'50px'}}
      onClick={d33Info}>D33</button>
    </div>
  )
}

export default MyFarmTest;