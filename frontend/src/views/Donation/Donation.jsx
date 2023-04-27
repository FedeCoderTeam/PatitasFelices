import { Link } from '@mui/material';
import React from 'react';
import style from './donation.module.css';
import video from './images/backgroundCSS.mp4';


const Donation = () => {
    return (
        <div className={style.containerDonation}>
            <video className={style.video} autoplay="true" muted="true" loop="true" src={video}></video>
        </div>
        
    )
}

export default Donation