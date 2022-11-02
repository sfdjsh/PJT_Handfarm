import React from "react";
import { useState } from "react";
import { BASE_URL } from "../../config";
import axios from 'axios'

const AlarmDelete = ({readId}) => {
  const accessToken = localStorage.getItem('access_token')
  if (readId !== 0) {
    axios({
      method: 'POST',
      url: `${BASE_URL}/alarm/${readId}`,
      headers : {
        accessToken: accessToken
      }
    })
      .then(response => {
        console.log(response.data)
      })
  }
}
  

export default AlarmDelete;