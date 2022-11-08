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
        isLogged: false,
        userEmail: ''
    }],
    effects_UNSTABLE: [persistAtom],
})

export const userFarm = atom({
    key : "userFarm",
    default : [],
    effects_UNSTABLE: [persistAtom],
})

export const alarmState = atom({
    key: 'alarmState',
    default: false,
    effects_UNSTABLE: [persistAtom],
})

export const nowCrop = atom({
    key : "crop",
    default : "",
    effects_UNSTABLE : [persistAtom],
})

export const nowRegion = atom({
    key : "region",
    default : "",
    effects_UNSTABLE : [persistAtom],
})

export const chatAnother = atom({
    key : "chatAnother",
    default : "",
    effects_UNSTABLE : [persistAtom]
})

export const deviceSensor = atom({
    key: "deviceSensor",
    default: [],
    effects_UNSTABLE : [persistAtom],
})

export const sensorState = atom({
    key: 'sensorState',
    default: false,
    effects_UNSTABLE: [persistAtom],
})
