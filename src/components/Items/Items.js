import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ItemLink from './ItemLink/ItemLink';

import * as actionCreators from '../../store/actions'
import './Items.css'

class Items extends Component{

  componentDidMount() {
    this.props.fetchItems(this.props.token, this.props.userId)
  }

  render(){
    const items = this.props.items ? this.props.items : []
    
    return (
      <Box sx={{ my:2 }}>
        <div className="Items">
          <Typography variant="h3" component="div" className="App-title-primary-color" sx={{ mb:2 }}>Items</Typography>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {items.map((item) => {
              const { item_id, ...information } = item
              return <Grid item xs={2} sm={4} md={4} key={item_id}>
                <ItemLink key={item_id} information={information} />
              </Grid>
            })}
          </Grid>
        </div>
      </Box>
    )
  } 

}

const mapStateToProps = state => {
  return {
      loading: state.items.loading,
      error: state.items.error,
      token: state.auth.token,
      userId: state.auth.userId,
      items: state.items.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () => dispatch(actionCreators.fetchItems())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Items)