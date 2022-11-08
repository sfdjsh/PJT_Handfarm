import React from 'react';
import {Typography, TextField} from "@mui/material";
import {IconButton} from "@mui/material";
import {storage} from "../../firebase"
import CreateIcon from '@mui/icons-material/Create';
import {useEffect} from "react";

// import "./ArticleForm.css"

// import dynamic from "next/dynamic";
import ReactQuill from 'react-quill';
import Editor from './EditorComponent';
import {useState} from "react";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import {articleCreate} from "../api/Article";
import {ThemeProvider} from "@mui/styles";
import {MuiTheme} from "../../style/MuiTheme";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export const ArticleForm = () => {
    const [userInput, setUserInput] = useState({
        title : '',
        content : '',
        articleImg : ''
    });
    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState({
        image_file: "",
        preview_URL: "https://cdn-icons-png.flaticon.com/512/6583/6583130.png",
    });
    const [progress, setProgress] = useState(0)
    let inputRef;
    const location = useLocation()
    const navigator = useNavigate()

    useEffect(()=> {
        // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
        return () => {
            URL.revokeObjectURL(image.preview_URL)
        }
    }, [])

    const saveImage = (e) => {
        e.preventDefault();
        if(e.target.files[0]){
            // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
            URL.revokeObjectURL(image.preview_URL);
            const preview_URL = URL.createObjectURL(e.target.files[0]);
            setImage(() => (
                {
                    image_file: e.target.files[0],
                    preview_URL: preview_URL
                }
            ))
        }
    }

    function onEditorChange(value) {
        // setDesc(value)
        setUserInput((state) => {
            return { ...state, content : value}
        })
    }
    function onTitleChange(event) {
        setUserInput((state) => {
            return { ...state, title : event.target.value}
        })
    }

    // const articleSubmit = () => {
    //     articleCreate(desc)
    //         .then((res) => res.json().then((res) => {
    //             console.log(res)
    //         }))
    // }
    const submitArticle = async () => {
        if(!image.image_file){
            articleCreate(userInput, location.pathname.split('/')[3])
                .then((res) => res.json().then(res => {
                    navigator(-1)
                }))
        }
        const storageRef = storage.ref("images/test/")
        const imagesRef = storageRef.child(image.image_file.name)
        const upLoadTask = imagesRef.put(image.image_file);
        upLoadTask.on(
            "state_changed",
            (snapshot) => {
                console.log("snapshot", snapshot);
                const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(percent + "% done");
                setProgress(percent)
            },
            (error) => {
                console.log("err", error);
            },
            () => {
                upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setImageUrl(downloadURL);
                    const res = articleCreate({...userInput, articleImg : downloadURL},location.pathname.split('/')[3])
                        .then((res) => {
                            console.log(res)
                            // if (res.ok) {
                            //     alert('작성 완료')
                            //     navigate('/myAsk')
                            // } else {
                            //     alert('오류 발생')
                            // }
                            navigator(-1)
                        })
                    // CreateAdminNotice({...article, pstImg : downloadURL})
                    // alert("서버에 등록이 완료되었습니다!");
                    // setMode("공지사항 관리")
                });
            }
        );
    }
    console.log(userInput)

    return (
        <ThemeProvider theme={MuiTheme}>
            <div>
                <Box sx={{ m : 2 }}>
                    <Typography sx={{ color : "white", fontFamily : "ScoreDream", fontWeight : 'bold', mb : 1 }} variant="h5" component="h1">제목</Typography>
                    <TextField onChange={onTitleChange} sx={{
                        ' .MuiOutlinedInput-root': {
                            color: 'black',
                            border : '1px solid white',
                            backgroundColor : "white"
                        },
                    }} fullWidth id="fullWidth" />
                </Box>
                <Typography variant="h5" component="h5" sx={{ color : 'white', fontWeight : 'bold', fontFamily : 'ScoreDream', m : 2, mb: 1 }}>썸네일</Typography>
                <Box sx={{ display : 'flex', justifyContent : "center", alignItems : "center" }}>
                    <IconButton
                        // color='black'
                        aria-label='upload picture'
                        component='label'
                        sx={{
                            width: '90%',
                            height: '150px',
                            border: '1px solid',
                            borderRadius : '30px',
                            borderColor: 'white',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            backgroundColor: 'gainsboro',
                        }}
                    >
                        <img style={{ width : '130px', height: '130px', objectFit : 'cover' }} src={image.preview_URL}/>
                        <input
                            hidden
                            accept='image/*'
                            type='file'
                            onChange={saveImage}
                            onClick={(e) => e.target.value = null}
                            ref={refParam => inputRef = refParam}
                            // style={{display: "none"}}
                        />
                        {/*<PhotoCamera/>*/}

                    </IconButton>
                </Box>
                <Editor value={userInput.content} onChange={onEditorChange} />
                <Box sx={{ display : 'flex', justifyContent : "center" }}>
                    <Button onClick={() => {
                        submitArticle()
                    }} style={{ backgroundColor : "#9e9e9e", color : "white",fontWeight : "bold", fontFamily : "ScoreDream" }} variant="contained">작성</Button>
                </Box>
            </div>
        </ThemeProvider>
        // <ReactQuill style={{ color : "white" }} theme="snow" value={value} onChange={setValue} />
    );
};

export default ArticleForm;