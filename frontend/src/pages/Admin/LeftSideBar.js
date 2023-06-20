import React from "react";
import { Col, Row, Accordion } from "react-bootstrap";

function LeftSideBar() {
  return (
    <Row>
      <Col>
        <a href="/dashboard" style={{ textDecoration: "none", color: "black" }}>
          <h3 className="p-3">Ecommerce</h3>
        </a>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Products</Accordion.Header>
            <Accordion.Body>
              <p>
                <a href="/admin-all-products">All products</a>
              </p>
              <p>
                <a href="/add-product">Add Product</a>
              </p>
              <p>Edit Products</p>
              <p>Delete Products</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Orders</Accordion.Header>
            <Accordion.Body>
              <p>All Orders</p>
              <p>Pending Orders</p>
              <p>Delete Orders</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Users</Accordion.Header>
            <Accordion.Body>
              <p>
                <a href="/all-users">All Users</a>
              </p>
              <p>Add User</p>
              <p>Edit User</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Comments</Accordion.Header>
            <Accordion.Body>
              <p>All Comments</p>
              <p>Add Comment</p>
              <p>Edit Comment</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
}

export default LeftSideBar;
