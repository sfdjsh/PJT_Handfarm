import { BASE_URL } from "../../config";
import axios from "axios";

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