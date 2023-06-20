import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import login from "../images/pic2.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();
    console.log(email, password);
    let result = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("Line No 25 :", result.user.roleType);
    if (result.user.roleType === 0) {
      //localStorage.setItem("user", JSON.stringify(result));
      navigate("/dashboard");
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
            src={login}
            width="550px"
            height="600px"
            style={image_style}
            alt=""
          />
        </Col>
        <Col>
          <div style={div_style}>
            <h2 className="mb-4" style={sign_up}>
              Login
            </h2>

            <Form>
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

              <Button
                variant="danger"
                onClick={collectData}
                type="submit"
                className="mt-2 form-control"
              >
                Login
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
};

export default Login;
