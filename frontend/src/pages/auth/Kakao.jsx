import React, {useState, useEffect} from "react";
import axios from 'axios'

export const Kakao = () => {

  const href = window.location.href;
  console.log({href})
  let params = new URL(document.URL).searchParams
  let code = params.get("code")

  const [user, Setuser] = useState({});

  useEffect(async () => { 
    axios.get()
  })
}

export default Kakao