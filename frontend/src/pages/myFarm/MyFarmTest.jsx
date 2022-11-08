import React, {useState} from 'react'
// import { useRecoilState } from 'recoil';
// import {userInfo} from '../../atom'

const MyFarmTest = ({i}) => {
  const zzz = i
  console.log(zzz)
//   const [device, setDevice] = useRecoilState(userInfo)
//   const [deviceNum, setDeviceNum] = useState([])
//   const test12 = device.deviceId

//   test12.map((devicesss) => { 
//     setDeviceNum(devicesss.deviceNo)
//   })

//   console.log(deviceNum)
  
  return (
    <div>
      <p>{zzz}</p>
    </div>
  )
}

export default MyFarmTest;