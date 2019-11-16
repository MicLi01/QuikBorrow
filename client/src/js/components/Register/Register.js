import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/index";
import classnames from "classnames";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import quikLogo from '../../components/quikLogo.png';
import TextField from '@material-ui/core/TextField';

const LoginForm = styled.div`
	margin: 0 auto;
    max-width: 320px;
	outline: 1px solid #CCC;
	box-shadow: 5px #CCC;
    background-color: white;
	padding:1.5em;
	box-shadow: inset 0 1.5px 2px rgba(190, 190, 190, .4), 0 0 0 5px #f5f7f8;
`
const Center = styled.div`
	text-align: center;
`
  
export class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {}
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
		  this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
    	if (nextProps.errors) {
      		this.setState({
        		errors: nextProps.errors
      		});
    	}
  	}
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		this.props.registerUser(newUser, this.props.history); 
	};
	getErrors = e => {
		const { errors } = this.state;
		if(errors.errors === undefined || errors.errors.find(x => x.param === e) === undefined)
		{
			return true;
		}
		else
		{
			// return errors.errors.find(x => x.param === e).msg;
			return false;
		}
	};
	render() {
		
		return (
			<div>
				<Link to="/"> Back to home</Link><br/>
				<Center>
					<img src={quikLogo} width="275" height= "180" alt = "logo"/>
				</Center>
				<LoginForm>
					<h4>New User? Register below:</h4>
					<p>Already have an account? <Link to="/login">Log in</Link></p>
				<form noValidate onSubmit={this.onSubmit}>
					<TextField
						onChange={this.onChange}
						value={this.state.name}
						error={this.getErrors('name')}
						id="name"
						label="Name"
						type="text"
						className={classnames("", {
							invalid: this.getErrors('name')
		                })}
					/>
					<span>{this.getErrors('name')}</span>
					<br/>
					<TextField
						onChange={this.onChange}
						value={this.state.email}
						error={this.getErrors('email')}
						id="email"
						type="email"
						label="Email"
						className={classnames("", {
                    		invalid: this.getErrors('email')
                  		})}
					/>
					<span>{this.getErrors('email')}</span>
					<br/>
					<TextField
						onChange={this.onChange}
						value={this.state.password}
						error={this.getErrors('password')}
						id="password"
						type="password"
						label="Password"
						className={classnames("", {
                    		invalid: this.getErrors('password')
                  		})}
					/>
					<span>{this.getErrors('password')}</span>
					<br/>
					<TextField
						onChange={this.onChange}
						value={this.state.password2}
						error={this.getErrors('password')}
						id="password2"
						type="password"
						label="Confirm Password"
						className={classnames("", {
                    		invalid: this.getErrors('password')
                  		})}
					/>
					<br/>
					<br/>
					<div>
					<Button variant="contained" color="primary" type="submit">
        			Register
      				</Button>
					</div>
				</form>
				</LoginForm>
			</div>
		);
	}
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));