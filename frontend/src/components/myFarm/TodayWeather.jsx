import React from 'react'
import { useEffect } from 'react';
import { useRecoilState } from "recoil";
import { locations } from "../../atom";
import { getWeather } from "../../pages/api/MyFarm"

const TodayWeather = ({deviceId}) => {
  const [location, setLocation] = useRecoilState(locations)
  const lat = location[0]
  const lon = location[1]
  useEffect(() => {
    getWeather({lat, lon})
  })

  return (
    <>
      <p>날씨 정보</p>
    </>
  )
}

export default TodayWeather;