import React from "react";
import { useState } from "react";
import { BASE_URL } from "../../config";
import axios from 'axios'

const AlarmRead = ({readId}) => {
  if (readId !== 0) {
    axios({
      method: 'POST',
      url: `${BASE_URL}/alarm/${readId}`,
      headers : {
        accessToken: localStorage.getItem('access_token')
      }
    })
      .then(response => {
        console.log(response.data)
      })
  }
}
  

export default AlarmRead;