import React from 'react'
import './HomeDonationSection.css';
import dogDonation from './images/dogDonation.png';
import dogProducts from './images/dogProducts.png';
import { Link } from 'react-router-dom';

const HomeDonationSection = () => {
  return (
    <div className='mainContainer-HDonationS'>
      <h1>Ayudanos a ayudar</h1>
      <div className='containerBoxes-HDonationS'>
      <div className='containerRight-HDonationS'>
        <img src={dogProducts} alt="dogProducts" />
        <div className='containerBtn-HDonationS'>
            <button><Link to='/products'>Ver productos</Link></button>
        </div>
      </div>
      <div className='containerLeft-HDonationS'>
        <img src={dogDonation} alt="dogDonation" />
        <div className='containerBtn-HDonationS'>
            <button><Link to='/donation'>Donar</Link></button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default HomeDonationSection
