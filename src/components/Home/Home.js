import React, { Component } from 'react';
import logo from '../../o2_icon.svg'; // icon from https://www.freepik.com/free-icon/oxygen_720197.htm
import { InputText } from 'primereact/inputtext';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';

import './Home.css'

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: ''
    };
  }

  render(){
    return (
      <Box sx={{ my:2 }}>
        <div className="Home-welcome">
          <img src={logo} className="Home-logo" alt="logo" />
          <p id="project-name">
            0 Waste 2 Life
          </p>
          <p className="Home-welcome-text">
            Got something you don't want anymore? Need something but it is too expensive?
          </p>
          <p className="Home-welcome-text">
            Then you are in the right place!
          </p>
        </div>
      </Box>
    )
  } 

}



export default Home;
