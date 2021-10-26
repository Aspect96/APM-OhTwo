import React from 'react';
import logo from '../../o2_icon.svg'; // icon from https://www.freepik.com/free-icon/oxygen_720197.htm

import './Home.css'

const Home = () => (
  <div className="Home-welcome">
    <img src={logo} className="Home-logo" alt="logo" />
    <p id="project-name">
      0 Waste 2 Life
    </p>
    <p class="Home-welcome-text">
      Got something you don't want anymore? Need something but it is too expensive?
    </p>
    <p class="Home-welcome-text">
      Then you are in the right place!
    </p>
  </div>
)

export default Home;