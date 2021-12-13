import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ItemLink from './ItemLink/ItemLink';

import * as actionCreators from '../../store/actions'
import './Items.css'

class Items extends Component{
  state = {
    category: ''
  }

  componentDidMount() {
    this.props.fetchItems(this.props.token, this.props.userId)
  }

  handleChange = (event) => {
    this.setState(prevState => {
      return {
        ...prevState,
        category: event.target.value,
      }
    })
  }

  renderFilter() {
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={this.state.category}
          onChange={this.handleChange}
          label="Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Electronic"}>Electronic</MenuItem>
          <MenuItem value={"Books"}>Books</MenuItem>
          <MenuItem value={"Canned Food"}>Canned Food</MenuItem>
          <MenuItem value={"Stuff"}>Stuff</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
    )
  }

  render(){
    const items = this.props.items ? this.props.items : []
    
    return (
      <Box sx={{ my:2 }}>
        <div className="Items">
          <Typography variant="h3" component="div" className="App-title-primary-color" sx={{ mb:2 }}>Items</Typography>

          {this.renderFilter()}
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {items.filter((item) => {
              const selCategory = this.state.category
              return  selCategory === "" || item.category.toLowerCase() === selCategory.toLowerCase()
            }).map((item) => {
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