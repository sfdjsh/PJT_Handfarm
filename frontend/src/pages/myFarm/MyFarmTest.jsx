import React, {useState} from 'react'
import { useRecoilState } from 'recoil';
import {userInfo} from '../../atom'

const MyFarmTest = () => {
  const [device, setDevice] = useRecoilState(userInfo)
  const [deviceNum, setDeviceNum] = useState([])
  const test12 = device.deviceId

  test12.map((devicesss) => { 
    setDeviceNum(devicesss.deviceNo)
  })

  console.log(deviceNum)
  
  return (
    <div>ㅋㅋㅋㅋ</div>
  )
}

export default MyFarmTest;