import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './ItemLink.css'

class ItemLink extends Component{
  render(){
    return (
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia 
            // square 
            component="img"
            src={this.props.information.url} 
            alt="Can't load image properly"
          />
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {this.props.information.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    )
  } 

}

export default ItemLink;