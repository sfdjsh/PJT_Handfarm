import { atom } from 'recoil';
import {recoilPersist} from "recoil-persist";

const { persistAtom } = recoilPersist()

export const userInfo = atom({
    key : "userInfo",
    default : [{
        refreshToken: '',
        isRegisted: false,
        userNickname: '',
        deviceId: '',
        isLogged: false
    }],
    effects_UNSTABLE: [persistAtom],
})

export const userFarm = atom({
    key : "userFarm",
    default : []
})

export const userAlarm = atom({
    key : "userAlarm",
    default: '',
    effects_UNSTABLE: [persistAtom],
})