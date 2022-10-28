import { atom } from 'recoil';
import {recoilPersist} from "recoil-persist";

const { persistAtom } = recoilPersist()

export const isLogin = atom({
    key : "isLogin",
    default : [{
        isRegisted: false,
        userNickname: '',
        deviceId: '',
        isLogged: false
    }],
    effects_UNSTABLE: [persistAtom],
})

export const userInfo = atom({
    key : "userInfo",
    default : []
})