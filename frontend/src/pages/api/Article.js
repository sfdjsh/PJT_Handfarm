import {LOCAL_URL} from "../../config";

export async function articleCreate (desc) {
    const URL = `${LOCAL_URL}/info/딸기`

    const response = await fetch(URL, {
        method : "POST",
        headers : {
            // token : localStorage.getItem("access-token"),
            "Content-Type": `application/json`,
        },
        body: JSON.stringify({
            content : descs
        }),
    })


}