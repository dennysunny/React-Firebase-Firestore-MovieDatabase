import React, { Component } from 'react';
import { Col, Button, Form } from 'react-bootstrap';
import { auth, createUserProfileDocument } from '../../Firebase/firebase.utils.js';

import "./SignUpComponent.scss";

class SignUpComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayName: '',
			lastName: '',
			email: '',
			password: ''
		};
	}

	handleSubmit = async (e) => {
		e.preventDefault();

         const { displayName, email, password } = this.state;

		try {
			//user is what we create with email and password with creating user function, and giving it auth
			const { user } = await auth.createUserWithEmailAndPassword(email, password);

			//wait for function to create a user with firstName
			await createUserProfileDocument(user, { displayName });

			//once its done, set states to initial
			this.setState({
				displayName: '',
				lastName: '',
				email: '',
				password: ''
			});
			alert("Account Created..!!")
			
		} catch (error) {
			if (error === 'auth/weak-password') {
				alert('The password is too weak.');
			  }
			  else{
				alert(error);
			  }
			console.error(error);
		}
	};

	handleChange = (e) => {
		const { name, value } = e.target;

		this.setState({ [name]: value });
	};

	render() {
		const { displayName, lastName, email, password } = this.state;
		return (
			<Col className="mt-5 signUpComponent" sm={12} md={6}>
				<h1 className="signUpTitle">I don't have an account</h1>
				<h3 className="subtitle">Sign up with your email and password</h3>
				<Form className="mt-5 mb-5" onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							value={displayName}
							name="displayName"
							type="text"
							placeholder="First name"
							className="form-control"
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							value={lastName}
							name="lastName"
							type="text"
							placeholder="Last name"
							className="form-control"
						/>
					</Form.Group>
					<Form.Group controlId="formGroupEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							name="email"
							value={email}
							onChange={this.handleChange}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password (Min 6 characters)"
							name="password"
							value={password}
							onChange={this.handleChange}
							required
						/>
					</Form.Group>
					<Col className="p-0 mb-5">
						<Button
							onClick={this.handleClick}
							variant="outline-dark"
							className="mt-5 btn-lg p-3 signUpButton"
							type="submit"
							block
						>
							SIGN UP
						</Button>
					</Col>
				</Form>
			</Col>
		);
	}
}

export default SignUpComponent;
