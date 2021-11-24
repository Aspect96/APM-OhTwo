import React, { Component } from 'react';

import './ItemLink.css'

class ItemLink extends Component{
  render(){
    return (
      <div>
          {this.props.information.name}
      </div>
    )
  } 

}

export default ItemLink;