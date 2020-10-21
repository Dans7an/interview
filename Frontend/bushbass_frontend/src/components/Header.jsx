import React from 'react';

import './header.css';

import netflixN from './netflixN.png';
import netflixNoN from './netflixLogo-noN.png';
import AuthOptions from './auth/AuthOptions';
function Header() {
  return (
    <header>
      <div className='logo-area'>
        <img className='netflixN netflix' src={netflixN} alt='' />
        <img className='netflix' src={netflixNoN} alt='' /> *
      </div>

      <h1>Find your favorite movies</h1>
      <p className='not-netflix'>
        **Totally not a ripoff of Netflix, in fact we've never even heard of
        Netflix
      </p>
      <nav>
       
        <AuthOptions />
      </nav>
    </header>
  );
}

export default Header;
