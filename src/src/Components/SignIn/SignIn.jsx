import React from "react";
import { Container, Row } from "react-bootstrap";
import SignInComponent from "./SignInComponent/SignInComponent";
import SignUpComponent from "./SignUpComponent/SignUpComponent";
import "./SignIn.scss";

const SignIn = () => {
  return (
    <Container className="signin">
      <Row>
        <SignInComponent />
        <SignUpComponent />
      </Row>
    </Container>
  );
};

export default SignIn;
