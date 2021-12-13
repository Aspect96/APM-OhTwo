import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import * as actionCreators from '../../store/actions'

import './Donations.css'

class Donations extends Component {
  state = {
    form: {
      name: {
        type: 'text',
        placeholder: 'Donation name',
        value: '',
        validation: {
          required: true,
          minLen: 3,
          message: 'Min 3 characters'
        },
        valid: false,
        touched: false
      },
      description: {
        type: 'text',
        placeholder: 'Donation description',
        value: '',
        validation: {
          required: true,
          minLen: 3,
          message: 'Min 3 characters'
        },
        valid: false,
        touched: false
      },
      url: {
        type: 'text',
        placeholder: 'Image URL',
        value: '',
        validation: {
          required: true,
          minLen: 3,
          message: 'Min 3 characters'
        },
        valid: false,
        touched: false
      }
    },
    category: "Electronic",
    valid: false,
    adding: false
  }

  checkValidity = (value, rules) => {
    let isValid = true
    if (rules.required) {
      isValid &= (value.trim() !== '')
    }
    if (rules.minLen) {
      isValid &= (value.length >= rules.minLen)
    }
    if (rules.email) {
      isValid &= (value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== null)
    }
    if (rules.samePassword) {
      isValid &= (value === this.state.form.password.value)
    }
    if (rules.number && value !== '') {
      var regexp = /\d/g;
      isValid &= regexp.test(value)
    }
    return isValid
  }

  checkFormValidity = (form) => {
    return Object.keys(form)
      .reduce((isValid, key) => {
        return isValid && (form[key].validation ? form[key].valid : true)
      }, true)
  }

  inputChangedHandler = (key, event) => {
    const value = event.target.value
    const input = { ...this.state.form[key] }

    if (input.validation) {
      input.valid = this.checkValidity(value, input.validation)
      input.touched = true
    }
    
    const form = {
      ...this.state.form,
      [key]: {
          ...input,
          value
      }
    }

    this.setState({
        form,
        valid: this.checkFormValidity(form)
    })
  }

  componentDidMount() {
    this.props.fetchUserData()
    if (this.props.items.length === 0) {
      this.props.fetchItems(this.props.token, this.props.userId)
    }
  }

  openAddItem = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        adding: true,
      }
    })
  }

  closeAddItem = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        adding: false,
      }
    })
  }

  filterById = (item) => {
    return 'user_id' in item && item.user_id === this.props.userId
  }

  addDonationHandler = (event) => {
    event.preventDefault()

    const item = {
      address: undefined,
      category: this.state.category,
      description: this.state.form.description.value,
      email: this.props.information.email,
      name: this.state.form.name.value,
      phone: this.props.information.phone,
      url: this.state.form.url.value
    }

    this.props.addDonation(item)
  }

  categoryOnChangeHandler = (event) => {
    this.setState({category: event.target.value})
  }

  renderAddItemForm() {
    const donation_inputs = Object.keys(this.state.form)
    .map(key => {
      const input = this.state.form[key]
      const invalid = 'valid' in input ? !input.valid && input.touched : false
      const text = invalid ? input.validation.message + input.placeholder : ''
      return (
        <TextField key={key} 
          fullWidth
          className=""
          sx={{ m:2 }}
          error={invalid} 
          label={input.placeholder} 
          variant="outlined" 
          helperText={text}
          onChange={this.inputChangedHandler.bind(this, key)}
          type={input.type}
          value={input.value}
          required={input.validation && input.validation.required}
        />
      )
    })

    return (
      <form className="App-standard-form" onSubmit={this.addDonationHandler}>
        {donation_inputs}

        <FormControl fullWidth sx={{ m:2 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={this.state.category}
            label="Category"
            onChange={this.categoryOnChangeHandler}
          >
            <MenuItem value={"Electronic"}>Electronic</MenuItem>
            <MenuItem value={"Books"}>Books</MenuItem>
            <MenuItem value={"Canned Food"}>Canned Food</MenuItem>
            <MenuItem value={"Stuff"}>Stuff</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>

        <LoadingButton
          loading={this.props.loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="text"
          disabled={!this.state.valid || this.props.loading}
          type="submit"
          sx={{ mt:3 }}
        >
          {'ADD DONATION'}
        </LoadingButton>
      </form>
    )
  }

  renderAddItem() {
    return (
      <Card sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        width: "100%", 
        marginBottom: "10px",
        padding: "5px"
      }}>
        {this.renderAddItemForm()}
        <div>
          {/* <Button variant="contained" color="primary">SAVE</Button> */}
          <Button variant="text" color="primary" onClick={this.closeAddItem}>CANCEL</Button>
        </div>
      </Card>
    )
  }

  renderUserItems() {
    const items = this.props.items ? this.props.items.filter(this.filterById.bind(this)) : []
    console.log(items)

    return (
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {items.map((item) => {
          const { item_id, ...information } = item
          return (
            <Grid item xs={2} sm={4} md={4} key={item_id}>
              <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ height: "150px", objectFit: "contain" }}
                    src={information.url} 
                    alt="Can't load image properly"
                  />
                  <CardContent sx={{ flex: '1 0 auto'}}>
                    <Typography component="div" variant="h6">
                      {information.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ height: "100px" }}>
                      {information.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Button color="error">REMOVE</Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  render() {
    return (
      <Box sx={{ my:2 }}>
        { !this.props.isAuth ?
          <Redirect to="/login" /> :
          <div className="Donations">
            <Typography variant="h4" component="div" className="App-title-primary-color" sx={{ mb:2, alignSelf: "flex-start" }}>
              My donations
              <Button variant="contained" color="primary" sx={{ marginLeft: "5px" }} onClick={this.openAddItem}>ADD DONATION</Button>
            </Typography>
            {this.state.adding && this.renderAddItem()}

            {this.renderUserItems()}
          </div>
        }
     </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuth: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId,
    information: state.auth.information,
    items: state.items.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () => dispatch(actionCreators.fetchItems()),
    addDonation: (item) => dispatch(actionCreators.postItem(item)),
    fetchUserData: () => dispatch(actionCreators.fetchUserData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Donations)
