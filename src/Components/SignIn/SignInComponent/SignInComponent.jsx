  
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Button, Form } from 'react-bootstrap';
import { auth, signInWithGoogle ,signInWithFB ,signInWithGit} from '../../Firebase/firebase.utils.js';

import "./SignInComponent.scss";

const SignInComponent = () => {
	let history = useHistory();
	const [input, setInput] = useState({});
  
	const handleSubmit = async (event) => {
	  event.preventDefault();
  
	  try {
		//wait for the auth to response
		await auth.signInWithEmailAndPassword(input.email, input.password);
		//if theres a user like that, it will sign in and then set the states to empty
		setInput({})
		alert("Login Sucessfull")
		history.push("/");
	  } catch (error) {
		alert(error);
	  }
	};

	const forgotPassword = async (event) => {
		event.preventDefault();
	
		try {
		  //wait for the auth to response
		  await auth.sendPasswordResetEmail(input.email);
		  //if theres a user like that, it will sign in and then set the states to empty
		  //setInput({})
		  alert('Password Reset Email Sent!');
		} catch (error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode  === 'auth/invalid-email') {
				alert(errorMessage);
			  } else if (errorCode === 'auth/user-not-found') {
				alert(errorMessage);
			  }
		}
	  };
  
	const handleChange = (e) =>
	  setInput({
		...input,
		[e.target.name]: e.target.value,
	  });
  
	return (
	  <Col className="mt-5 signInComponent mb-5" sm={12} md={6}>
		<h1 className="signInTitle">I already have an account</h1>
		<h3 className="subtitle">Sign in with your email and password</h3>
		<Form className="mt-5" onSubmit={handleSubmit}>
		  <Form.Group controlId="formGroupEmail">
			<Form.Label>Email address</Form.Label>
			<Form.Control
			  type="email"
			  placeholder="Enter email"
			  name="email"
			  onChange={handleChange}
			  label="email"
			  required
			/>
		  </Form.Group>
		  <Form.Group controlId="formGroupPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control
			  placeholder="Password"
			  name="password"
			  type="password"
			  onChange={handleChange}
			  label="password"
			/>
		  </Form.Group>
  
		  <Button
			variant="outline-dark"
			className="btn-lg mt-5 p-3 loginButton"
			type="submit"
			block
		  >
			SIGN IN
		  </Button >

		  <Button
		  	onClick={forgotPassword}
			variant="outline-dark"
			className="btn-lg mt-5 p-3 forgotButton"
			type="submit"
			block
		  >
			FORGOT PASSWORD
		  </Button >

		  <br></br>
		  <h4 className="subtitle">OR</h4>

		  <Button
			onClick={signInWithGoogle}
			
			variant="outline-primary"
			className="mt-3 p-3 btn-lg googleButton"
			type="submit"
			block
		  >
			SIGN IN WITH GOOGLE
		  </Button>

			<Button
			onClick={signInWithFB}
			variant="outline-primary"
			className="mt-3 p-3 btn-lg fbButton"
			type="submit"
			block>
				SIGN IN WITH FACEBOOK
				
			</Button>

			<Button
			onClick={signInWithGit}
			variant="outline-primary"
			className="mt-3 p-3 btn-lg gitButton"
			type="submit"
			block>
				SIGN IN WITH GITHUB
				
			</Button>

		</Form>
	  </Col>
	);
  };
  
  export default SignInComponent;