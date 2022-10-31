import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from "react";


export default function SelectForm() {
    const [crop, setCrop] = useState('');

    const handleChange = (event) => {
        setCrop(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120,  ' .MuiOutlinedInput-root': {
                color: 'black',
                border : '1px solid white',
                backgroundColor : "white"
            }, }}>
            <Select
                value={crop}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ fontFamily : "ScoreDream", m : 1 }}
            >
                <MenuItem value="">
                    딸기
                </MenuItem>
                <MenuItem value={10}>수박</MenuItem>
                <MenuItem value={20}>메론</MenuItem>
                <MenuItem value={30}>참외</MenuItem>
            </Select>
            {/*<FormHelperText>Without label</FormHelperText>*/}
        </FormControl>
    );
}
