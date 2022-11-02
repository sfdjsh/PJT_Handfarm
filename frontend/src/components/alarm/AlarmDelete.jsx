import React from "react";
import { useState } from "react";
import { BASE_URL } from "../../config";
import axios from 'axios'

const AlarmDelete = ({alarmId}) => {
  console.log(alarmId)
  if (alarmId !== 0) {
    axios({
      method: 'DELETE',
      url: `${BASE_URL}/alarm/${alarmId}`,
      headers : {
        accessToken: localStorage.getItem('access_token')
      }
    })
      .then(response => {
        if (alert('정말 삭제하시겠습니까?')) {
          console.log(response.data)
          window.location.reload()
        }
      })
  }
}
  

export default AlarmDelete;