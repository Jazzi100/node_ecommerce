import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import LeftSideBar from "./LeftSideBar";

function EditProduct() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [productImage, setProductImage] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  console.log(productImage, 20);

  useEffect(() => {
    console.log(params);
    getSingleProduct();
  }, []);

  const getSingleProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setTitle(result.title);
    setDescription(result.description);
    setPrice(result.price);
    setCategory(result.category);
    setQuantity(result.quantity);
    setProductImage(result);
    setStatus(result.status);
  };

  useEffect(() => {}, [status]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      url: "http://localhost:5000/category",
    })
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //------------
  const updateProduct = async (e) => {
    e.preventDefault();
    console.log(
      id,
      title,
      description,
      price,
      category,
      quantity,

      68
    );
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", price);
    data.append("category", category);
    data.append("quantity", quantity);
    data.append("status", status);

    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: data,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    });
    result = await result.json();
    console.log(result);
    if (result) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/dashboard");
    }
  };
  //-------------

  return (
    <Row>
      <Col>
        <LeftSideBar />
      </Col>
      <Col sm={9}>
        <h3 className="p-3">Edit Product</h3>
        <Form className="p-3">
          <Form.Group as={Row} className="mb-3" controlId="title">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="8">
              <Form.Control
                input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm="8">
              <Form.Group className="mb-3" controlId="description">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="price">
            <Form.Label column sm="2">
              Price
            </Form.Label>
            <Col sm="8">
              <Form.Control
                input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="price">
            <Form.Label column sm="2">
              Category
            </Form.Label>
            <Col sm="8">
              <Form.Select aria-label="Default select example" value={category}>
                <option disabled selected>
                  --SELECT ANY ONE--
                </option>
                {categories.length &&
                  categories.map(({ _id, name, status }) => (
                    <option value={_id} selected>
                      {name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="Quantity">
            <Form.Label column sm="2">
              Quantity
            </Form.Label>
            <Col sm="8">
              <Form.Control
                input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="status">
            <Form.Label column sm="2">
              Status
            </Form.Label>
            <Col sm="8">
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={1}>active</option>
                <option value={0} selected>
                  InActive
                </option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="Quantity">
            <Form.Label column sm="2">
              Images
            </Form.Label>
            <Col sm="8">
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </Form.Group>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2"></Form.Label>
            <Col sm="8">
              <Form.Group
                controlId="formFileMultiple"
                className="mb-3"
                align="right"
              >
                <Button variant="danger" type="submit" onClick={updateProduct}>
                  Update Product
                </Button>
              </Form.Group>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}

export default EditProduct;
