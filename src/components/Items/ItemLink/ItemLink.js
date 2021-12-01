import React, { Component } from 'react';
import Box from '@mui/material/Box';
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
      // <div>
      //   <Card sx={{ maxWidth: 345, height: 400, display: "flex", flexDirection: "column" }}>
      //     <CardMedia sx={{ maxHeight: 200, objectFit: "contain" }}
      //       // square 
      //       component="img"
      //       src={this.props.information.url} 
      //       alt="Can't load image properly"
      //     />
      //     <CardContent sx={{ flex: 1 }}>
      //       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      //         {this.props.information.name}
      //       </Typography>
      //     </CardContent>
      //     <CardActions>
      //       <Button size="small">Learn More</Button>
      //     </CardActions>
      //   </Card>
      // </div>

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
            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ height: "150px" }}>
              {this.props.information.description}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div"><br/>
              {"Email: " + this.props.information.email}
              {this.props.information.phone && <br/>}
              {this.props.information.phone && "Phone: " + this.props.information.phone}
              <br/>
              {"Address: " + this.props.information.address}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Button size="small">Learn More</Button>
          </Box>
        </Box>
      </Card>
    )
  } 

}

export default ItemLink;