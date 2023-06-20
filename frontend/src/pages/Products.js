import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Card, Container, Form, Button } from "react-bootstrap";

import Categories from "./Categories";
import "./productPageStyleSheet.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      url: "http://localhost:5000/api/product/get-active-products",
    })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addToCart = (item) => {
    console.log("ID : " + item._id);
    console.log("Quantity : " + qty);
    
  };

  var div_style = {
    margin: "10px",
  };
  return (
    <>
      <Container>
        <Row>
          <h3>Products</h3>
        </Row>
        <Row>
          <Col sm={2}>
            <Categories />
          </Col>
          <Col sm={10}>
            <Row>
              {products.length > 0 ? (
                products.map(
                  ({
                    _id,
                    title,
                    description,
                    price,
                    category,
                    productImage,
                  }) => (
                    <Col sm={3}>
                      <div style={div_style}>
                        <Card className="Red">
                          <Card.Img
                            variant="top"
                            height="150px"
                            src={`http://localhost:5000/${productImage}`}
                          />
                          <Card.Body>
                            <Card.Title>AED {price}</Card.Title>
                            <Card.Text>{title}</Card.Text>
                            <Form>
                              <Form.Group className="mb-2">
                                <Form.Control
                                  type="number"
                                  min="1"
                                  size="sm"
                                  onChange={(e) => setQty(e.target.value)}
                                />
                              </Form.Group>

                              {/* <Nav.Link as={Link} to="/cart"> */}
                              <Button
                                className="mb-1 w-100"
                                size="sm"
                                variant="outline-danger"
                                id={_id}
                                onClick={() =>
                                  addToCart({
                                    _id,
                                    title,
                                    description,
                                    price,
                                    category,
                                    productImage,
                                  })
                                }
                              >
                                Add To Cart
                              </Button>
                              {/* </Nav.Link> */}
                            </Form>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                  )
                )
              ) : (
                <h3 align="center">Sorry no Product Found</h3>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
