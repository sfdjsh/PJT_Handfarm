const REST_API_KEY = "115759604dfe8a9071598cf92c78fc6d";
const REDIRECT_URI = "https://handfarm.co.kr/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
