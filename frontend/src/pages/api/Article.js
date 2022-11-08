import {LOCAL_URL} from "../../config";

export async function articleCreate (userInput, category) {
    const URL = `${LOCAL_URL}/community/정보/${category}`
    console.log(userInput)
    console.log(category)

    const response = await fetch(URL, {
        method : "POST",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type": `application/json`,
        },
        body: JSON.stringify({
            articleTitle : userInput.title,
            articleContent : userInput.content,
            articleImg : userInput.articleImg
        }),
    })
    return response

}