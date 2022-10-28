import axios from "axios";
import React, { useEffect } from "react";
import Alarm from "../api/Alarm";
import {LOCAL_URL} from "../../config";

const MyFarm = () => {
  const URL = `${LOCAL_URL}/notice/count`
  const accessToken = localStorage.getItem('access_token')

  // useEffect(() => {
  //   axios(URL, {
  //     method: "GET",
  //     headers : {
  //       'Authorization' : accessToken
  //     }
  //   })
  //     .then(response => {console.log(response)})
  // }, [])

  return (
    <div>
      내 농장 페이지임
      <button>
        {/* 알람 들어옴?? */}
      </button>
    </div>
  )
};

export default MyFarm;
