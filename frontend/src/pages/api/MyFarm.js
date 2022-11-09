import { BASE_URL } from "../../config";
import axios from "axios";

// 농장 등록 API
export async function myFarmCreate({ deviceID, myFarmName, myCrops }) {  

  const URL = `${BASE_URL}/farm`
  let data = {
    'deviceNo': deviceID,
    'deviceName': myFarmName, 
    'deviceCrops': myCrops
  }
  
  return await axios.post(URL, JSON.stringify(data), {
    headers: {
      "Content-Type": `application/json`,
      accessToken: localStorage.getItem("access_token"),
    }
  })
    .then(response => {
      console.log(response.data)
      return response.data.message
    })
    .catch(err => {
      console.log(err)
    })
};

export async function sensorManual({ deviceId, highTemp, lowTemp }) {
  const URL = `${BASE_URL}/farm/${deviceId}/auto`
  let data = {
    controlName: 'temp',
    controlValue: [highTemp, lowTemp]
  }
  axios.put(URL, JSON.stringify(data), {
    headers: {
      "Content-Type": `application/json`,
      accessToken: localStorage.getItem("access_token"),
    }
  })
    .then(response => {
      console.log(response.data)
    })
}