import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
          
          {items.map((item) => {
            const { item_id, ...information } = item
            return <ItemLink key={item_id} information={information} />
          })}
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