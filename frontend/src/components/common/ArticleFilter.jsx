import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from "react";


export default function ArticleFilter() {
    const [filter, setFilter] = useState('');

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120,  ' .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor : "#B3B3B3",
            }, }}>
            <Select
                value={filter}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ fontFamily : "ScoreDream", m : 1}}
            >
                <MenuItem value="">
                    인기순
                </MenuItem>
                <MenuItem value={"인기순"}>추천순</MenuItem>
            </Select>
            {/*<FormHelperText>Without label</FormHelperText>*/}
        </FormControl>
    );
}
