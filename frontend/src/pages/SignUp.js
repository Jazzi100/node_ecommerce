import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import signup from "../images/pic2.jpg";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password, profilePicture);
    let result = await fetch("http://localhost:5000/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        profilePicture,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    }
  };

  var div_style = {
    width: "500px",
    height: "100%",
    margin: "auto",
    padding: "60px",
  };
  var sign_up = {
    fontFamily: "sans-serif",
  };
  var image_style = {
    margin: "auto",
    padding: "60px",
  };
  var click_here = {
    fontSize: "13px",
  };

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <img
            src={signup}
            width="550px"
            height="600px"
            style={image_style}
            alt=""
          />
        </Col>
        <Col>
          <div style={div_style}>
            <h2 className="mb-4" style={sign_up}>
              Sign Up
            </h2>
            <Form>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="firstname">
                  <Form.Label>Fist Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="first name"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="last name"
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-2" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abc@gmail.com"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-2">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  label="I agree all statements in Terms of service"
                />
              </Form.Group>

              <Button
                variant="danger"
                onClick={collectData}
                type="submit"
                className="mt-2 form-control"
              >
                Sign Up
              </Button>
            </Form>
            <p className="mt-3" style={click_here}>
              Already have an account <a href="/login">click here</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
