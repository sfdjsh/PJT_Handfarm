import { atom } from 'recoil';
import {recoilPersist} from "recoil-persist";

const { persistAtom } = recoilPersist()

export const isLogin = atom({
    key : "isLogin",
    default : "",
    effects_UNSTABLE: [persistAtom],
})

export const userInfo = atom({
    key : "userInfo",
    default : {
        farm : "",
    }
})