import React, { Component } from "react";
import styled from 'styled-components';
import { Card, CardContent, CardMedia, Typography, Box, Button, TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const SideBar = styled.div`
  display: flex;
    > div:first-child {
    margin-right: 30px;
    max-width: 350px;
    }
`

const RightSide = styled.div`
  width: 3000px;
`

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _editing: false,
      id : this.props.id, 
      Age: this.props.age,
      College: this.props.college,
      Bio : this.props.bio,
      tempAge: '',
      tempCollege: '',
      tempBio: ''
    }
  }
  
  toggle_Editing = async() => {
    this.setState(prevState => ({
      _editing: !prevState._editing
    }));
  }

	onChange = async (e) => {
    this.setState({[e.target.id]:e.target.value});

  };

  onSubmit = async (e) => {
    e.preventDefault();
    const updateInfo = {
			Age : this.state.tempAge,
		  College :this.state.tempCollege,
      Bio : this.state.tempBio,
  }
    this.setState(updateInfo)
    this.toggle_Editing()
    // save the updateInfo to the database
    fetch('http://localhost:8081/api/users/'+this.state.id, {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(updateInfo)
    })
    .then((response) => {
      return console.log(response.json())
    })
    .catch((error) => {
      return console.log(error)
    })
  };

  render() {
    const { id, name, age, college , products, bio, wishlist,rating,email} = this.props;

    
    const products_li = products.map((items, index) => {
      return <li key={items._id + index}>
        {items.name}
        </li>
    });
    
    const wishlist_li = wishlist.map((element, index) => {
      return <li key={element._id + index}>
        {element.item}
      </li>
    });


    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <SideBar>
      <Card>
        <CardMedia>
          <img src="https://computerscience.johncabot.edu/mscaramastra/F2017/CS131-1/Scopece/CS130/SCOPECE%20FINAL/griffin%20photo/pet.jpg"  width="350" height="350" alt="profile_image" />
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {email} <br/>
            {this.state.College} <br/>
            {this.state.Age} years old<br/>
            {this.state.Bio}<br></br>
          </Typography>
          <Button align="center" variant="outlined" color="primary" focusVisible onClick={(this.toggle_Editing)}>
                      Edit Profile 
          </Button>  
          {this.state._editing === true ? 
          <div>
            <Dialog open={this.state._editing} onClose={this.toggle_Editing} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Edit your profile and press submit to save your changes
              </DialogContentText>
                <form  onSubmit={this.onSubmit}>
                  <TextField
                    onChange={this.onChange}
                    value={this.state.tempAge || this.state.Age}
                    id="tempAge"
                    label="Age"
                    type="number"
                    margin="normal"
                    fullWidth
                  />
					        <br/>
                  <TextField
                    onChange={this.onChange}
                    value={this.state.tempCollege || this.state.College}
                    id="tempCollege"
                    label="College"
                    type="text"
                    margin="normal"
                    fullWidth
                  />
					        <br/>
                  <TextField
                    onChange={this.onChange}
                    value={this.state.tempBio || this.state.Bio}
                    id="tempBio"
                    type="text"
                    label="Bio"
                    margin="normal"
                    fullWidth
                  />
					        <br/>
                    <div>
                    <DialogActions>
                  <Button type="reset" onClick={this.toggle_Editing} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit"  color="primary">
                    Submit
                  </Button>
                </DialogActions>
                    </div>
              </form>
          </DialogContent>
          </Dialog>
          </div> 
          : null }
        
        </CardContent>
      </Card>
    </SideBar>
    <RightSide>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h2" component="h2">
            {name} 
            <br/>
          </Typography>
          <Typography gutterBottom variant="h4" component="h2">
            Rating : {rating} 
            <br/>
            <Box component="span" m={1} borderColor="transparent">
              <Rating name="read-only" value={rating} readOnly />
            </Box>
          </Typography>
          <Typography gutterBottom variant="h4" component="h2">
            Lending List 
            <br/> 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" id='products-list'>
            {products_li}       
            <br/>
          </Typography>
            <Button variant="outlined" color="primary">
              Edit Lending List
            </Button> 
            <br/>
            <br/>
          <Typography gutterBottom variant="h4" component="h2">
            Wishlist
            <br/>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" id='wish-list'>
            {wishlist_li}
            <br/>
            <Button variant="outlined" color="primary">
              Edit Wishist
            </Button> 
          </Typography>
          </CardContent>
        </Card>
      </RightSide>
    </div>
    );
  };
}
  export default ProfileCard;
  