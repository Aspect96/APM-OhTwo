import React from 'react';
import logo from '../o2_icon.svg'; // icon from https://www.freepik.com/free-icon/oxygen_720197.htm

function Home() {
  return (
    <div class="App-welcome">
      <img src={logo} className="App-logo" alt="logo" />
      <p id="app-name">
        0 Waste 2 Life
      </p>
      <p class="app-welcome">
        Got something you don't want anymore? Need something but it is too expensive?
      </p>
      <p class="app-welcome">
        Then you are in the right place!
      </p>
    </div>
  );
};

export default Home;