import { BASE_URL } from "../../config";
import axios from "axios";

export async function Alarm() {
  const accessToken = localStorage.getItem("access_token");
  const alarmAxios = await axios({
    method: "GET",
    url: `${BASE_URL}/alarm`,
    headers: {
      accessToken: accessToken,
    }
  })
  return alarmAxios.data.noticeList
};

export default Alarm;
