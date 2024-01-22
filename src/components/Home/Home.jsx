import React from 'react';
import {Link} from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import CTA1 from './CTA1';
import CTA2 from './CTA2';
import CTA3 from './CTA3';
import Features from './Features';
import Footer from './Footer';
import Hero from './Hero';
import Invite from './Invite';
import Navigation from './Navigation';
import Slider from './Slider';
import Sponsors from './Sponsors';
import TopBannar from './TopBannar';

const HomePage = () => {
  return (
    <div className="home">
      <TopBannar />
      <Navigation/>
      <Hero/>
      <Sponsors/>
      <CTA1 />
      <CTA2 />
      <CTA3 />
      <Features/>
      <Slider/>
      <Invite/>
      <Footer/>
    </div>
  );
}

export default HomePage;