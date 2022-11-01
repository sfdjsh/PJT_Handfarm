import React from "react";
import { useState } from "react";
import { BASE_URL } from "../../config";
import axios from 'axios'

const AlarmDelete = ({alarmId}) => {
  const accessToken = localStorage.getItem('access_token')
  if (alarmId !== 0) {
    axios({
      method: 'DELETE',
      url: `${BASE_URL}/alarm/${alarmId}`,
      headers : {
        accessToken: accessToken
      }
      .then(alert('정말 삭제하시겠습니까?'))
    })
  }
  
  return (
    <>
    </>
  )
}
  

export default AlarmDelete;