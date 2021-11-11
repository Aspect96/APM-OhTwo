import React, { Component } from 'react';
import logo from '../../o2_icon.svg'; // icon from https://www.freepik.com/free-icon/oxygen_720197.htm
import { InputText } from 'primereact/inputtext';

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
  
        {/* Added by Damian - can delete later - only ofr test purpouses */}
        <div>
          {/* <div className="card"> */}
              <h5>Basic</h5>
              <InputText value={this.state.value1} onChange={(e) => this.setState({value1: e.target.value})} />
              <span className="p-ml-2">{this.state.value1}</span>
    
              <h5>Floating Label</h5>
              <span className="p-float-label">
                  <InputText id="username" value={this.state.value2} onChange={(e) => this.setState({value2: e.target.value})} />
                  <label htmlFor="username">Username</label>
              </span>
    
              <h5>Left Icon</h5>
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={this.state.value3} onChange={(e) => this.setState({value3: e.target.value})} placeholder="Search" />
              </span>
    
              <h5>Invalid</h5>
              <div className="p-field">
                  <label htmlFor="username2" className="p-d-block">Username</label>
                  <InputText id="username2" aria-describedby="username2-help" className="p-invalid p-d-block" />
                  <small id="username2-help" className="p-error p-d-block">Username is not available.</small>
              </div>
    
              <h5>Disabled</h5>
              <InputText value={this.state.value5} disabled />
    
          {/* </div> */}
        </div>

    </div>


    )
  } 

}



export default Home;
