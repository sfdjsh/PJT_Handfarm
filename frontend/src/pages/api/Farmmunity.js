import {LOCAL_URL} from "../../config";

export async function fetchInfoArticle(nowCrop) {

    if(nowCrop === ""){
        nowCrop = "딸기"
    }else if(nowCrop === 10){
        nowCrop = "방울 토마토"
    }else if(nowCrop === 20){
        nowCrop = "파프리카"
    }
    console.log(nowCrop)

    const URL = `${LOCAL_URL}/community/info/${nowCrop}`
    const response = await fetch(URL, {
        method : "GET"
    })
    return response
}

export async function fetchRegionArticle(nowRegion){
    if(nowRegion === ""){
        nowRegion = "광주"
    }else if(nowRegion === 10){
        nowRegion = "서울"
    }else if(nowRegion === 20){
        nowRegion = "대전"
    }else if(nowRegion === 30){
        nowRegion = "부산"
    }else if(nowRegion === 40){
        nowRegion = "구미"
    }

    const URL = `${LOCAL_URL}/community/region/${nowRegion}`
    const response = await fetch(URL, {
        method : "GET"
    })
    return response

}

export async function fetchArticleDetail(id) {
    const URL = `${LOCAL_URL}/community/${id}`
    const response = await fetch(URL, {
        method : "GET"
    })
    return response
}

export async function commentCreate(articleId) {
    const URL = `${LOCAL_URL}/community/${articleId}/comment`
    const response = await fetch(URL, {
        method : "POST",
        headers : {
            Authorization : "",
            "Content-Type" : "application/json",
        }
    })
    return response
}

export async function commentUpdate(id) {
    const URL = `${LOCAL_URL}/community/${id}/comment`
    const response = await fetch(URL, {
        method : "PUT",
        headers : {
            Authorization : "",
            "Content-Type" : "application/json",
        }
    })
    return response
}

export async function commentDelete(id) {
    const URL = `${LOCAL_URL}/community/${id}/comment`
    const response = await fetch(URL, {
        method : "DELETE",
        headers : {
            Authorization : "",
            "Content-Type" : "application/json",
        }
    })
    return response
}