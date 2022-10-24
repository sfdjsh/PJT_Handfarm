import React from 'react';
// import dynamic from "next/dynamic";
import ReactQuill from 'react-quill';
import Editor from './EditorComponent';
import {useState} from "react";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import {articleCreate} from "../api/Article";

export const ArticleForm = () => {
    const [desc, setDesc] = useState('');
    function onEditorChange(value) {
        setDesc(value)
    }

    const articleSubmit = () => {
        articleSubmit(desc)
            .then((res) => res.json().then((res) => {
                console.log(res)
            }))
    }
    console.log(desc)

    return (
        <div>
            <Editor value={desc} onChange={onEditorChange} />
            <Box sx={{ display : 'flex', justifyContent : "end", mr : 2 }}>
                <Button onClick={() => {
                    articleSubmit()
                }} style={{ backgroundColor : "black", fontFamily : "ScoreDream" }} variant="contained">작성</Button>
            </Box>
        </div>
        // <ReactQuill style={{ color : "white" }} theme="snow" value={value} onChange={setValue} />
    );
};

export default ArticleForm;