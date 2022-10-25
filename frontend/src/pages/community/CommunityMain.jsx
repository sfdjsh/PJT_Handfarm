import React, {useEffect} from 'react';
import axios from 'axios'
import {LOCAL_URL} from "../../config";

export const CommunityMain = () => {
    const href = window.location.href;
    let params = new URL(document.URL).searchParams
    let code = params.get("code")
    console.log(code)
  
    // const [user, Setuser] = useState({
    //     userinfo: '',
    //     accessToken: '',
    //     refreshToken: '',
    //     isRegisted: null
    // });
  
    useEffect(async () => { 
    //   axios({
    //     method: 'GET',
    //     url: `${LOCAL_URL}/api/kakao`,
    //     Headers: {code}
    //   })
    //     .then(response => {
    //         console.log(response.data)
    //     })
    })

    return (
        <div>
            <h1>토큰 받아와지나??</h1>
        </div>
    );
};

export default CommunityMain;