import React, {useEffect} from 'react';
import axios from 'axios'

export const CommunityMain = () => {
    const href = window.location.href;
    console.log(href)
    let params = new URL(document.URL).searchParams
    let code = params.get("code")
    console.log(code)
  
    // const [user, Setuser] = useState({
    //     userinfo: '',
    //     accessToken: '',
    //     refreshToken: '',
    //     isRegisted: null
    // });
  
    useEffect(() => { 
        axios.get(`https://handfarm.co.kr/api/kakao?code=${code}`)
            .then(response => {console.log(response.data)})
    })

    return (
        <div>
            <h1>잠시만 기달려봐유</h1>
        </div>
    );
};

export default CommunityMain;