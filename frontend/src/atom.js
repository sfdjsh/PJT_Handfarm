import { atom } from 'recoil';
import {recoilPersist} from "recoil-persist";

const { persistAtom } = recoilPersist()

// 유저 정보
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

// 알람 모달 on/off
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

// 디바이스 센서 값
export const deviceSensor = atom({
    key: "deviceSensor",
    default: [],
    effects_UNSTABLE : [persistAtom],
})

// 센서 모달 on/off
export const tempModal = atom({
    key: 'tempModal',
    default: false,
    effects_UNSTABLE: [persistAtom],
})

export const humidModal = atom({
    key: 'humidModal',
    default: false,
    effects_UNSTABLE: [persistAtom],
})

export const co2Modal = atom({
    key: 'co2Modal',
    default: false,
    effects_UNSTABLE: [persistAtom],
})

export const soilHumidModal = atom({
    key: 'soilHumidModal',
    default: false,
    effects_UNSTABLE: [persistAtom],
})

// 제어 모달창
export const motorModal = atom({
    key: 'motorModal',
    default: false,
    effects_UNSTABLE: [persistAtom],
})

// 제어 자동/수동 정보
export const motorControl = atom({
    key: 'motorControl',
    default: [],
    effects_UNSTABLE: [persistAtom],
})
