import React from 'react';
import "../styles/Footer.scss";
import { LocationOn, LocalPhone, Email, Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer_left'>
        <a href="/"><img src="/assets/homelogo8.png" alt="logo" /></a>
        <p>Your perfect rental home, just a click away.</p>
        <div className='footer_socials'>
          <div className='social_icon'><Facebook /></div>
          <div className='social_icon'><Twitter /></div>
          <div className='social_icon'><Instagram /></div>
        </div>
      </div>

      <div className='footer_center'>
        <h3>Useful Links</h3>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Return & Refund Policy</a></li>
        </ul>
      </div>

      <div className='footer_right'>
        <h3>Contact</h3>
        <div className='footer_info'>
          <LocalPhone />
          <p>+91 6371489084</p>
        </div>
        <div className='footer_info'>
          <Email />
          <p>sweethome@support.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
