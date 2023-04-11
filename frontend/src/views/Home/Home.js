import * as React from 'react';
import TextField from '@mui/material/TextField';


const Home = () => {
    return(
        <>
            <TextField id="outlined-basic" label="Buscar..." variant="outlined" />
            <TextField id="filled-basic" label="Buscar..." variant="filled" />
            <TextField id="standard-basic" label="Buscar..." variant="standard" />
        </>
        
    )
} 

export default Home;