import {LOCAL_URL} from "../../config";

export async function articleCreate (userInput) {
    const URL = `${LOCAL_URL}/info/딸기`
    console.log(userInput)

    const response = await fetch(URL, {
        method : "POST",
        headers : {
            Authorization : "7dFkm_FUblZS_rZSt5OPf_tmkT1aI6yxg5BhuTziCilwngAAAYQOHw0H",
            "Content-Type": `application/json`,
        },
        body: JSON.stringify({
            articleTitle : userInput.title,
            articleContent : userInput.content,
            articleImg : userInput.articleImg
        }),
    })


}