import { BASE_URL } from "../../config";
import {LOCAL_URL} from "../../config";
import axios from "axios";

export async function fetchUserInfo() {
    const URL = `${LOCAL_URL}/mypage`
    const response = await fetch(URL, {
        method : "GET",
        headers : {
            accessToken : localStorage.getItem("access_token")
        }
    })
    return response
}