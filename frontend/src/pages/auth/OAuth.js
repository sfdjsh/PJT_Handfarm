const REST_API_KEY = "115759604dfe8a9071598cf92c78fc6d";
const REDIRECT_URI = "http://localhost:3000/kakao";
const LOGOUT_REDIRECT_URI = "http://localhost:3000"

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const KAKAO_AUTH_LOGOUT = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`

// https://kauth.kakao.com/oauth/logout?client_id=115759604dfe8a9071598cf92c78fc6d&logout_redirect_uri=$http://localhost:3000