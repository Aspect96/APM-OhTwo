import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './ItemLink.css'

class ItemLink extends Component{
  state = {
    showingInfo: false
  }

  openContactInfo = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showingInfo: true,
      }
    })
  }

  closenContactInfo = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showingInfo: false,
      }
    })
  }

  render(){
    return (
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            sx={{ height: "150px", objectFit: "contain" }}
            src={this.props.information.url} 
            alt="Can't load image properly"
          />
          <CardContent sx={{ flex: '1 0 auto'}}>
            <Typography component="div" variant="h6">
              {this.props.information.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ height: "70px", overflow: "auto", marginBottom: "10px" }}>
              {this.props.information.description}
            </Typography>
            {this.state.showingInfo && <Typography variant="subtitle1" color="text.secondary" component="div"><br/>
              {"Email: " + this.props.information.email}
              {this.props.information.phone && <br/>}
              {this.props.information.phone && "Phone: " + this.props.information.phone}
              <br/>
              {/* {"Address: " + this.props.information.address} */}
            </Typography>}
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            {!this.state.showingInfo && <Button size="small" onClick={this.openContactInfo}>Contact Info</Button>}
            {this.state.showingInfo && <Button size="small" onClick={this.closenContactInfo}>Close</Button>}
          </Box>
        </Box>
      </Card>
    )
  } 

}

export default ItemLink;