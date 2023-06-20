import React, { useState, useEffect } from "react";
import { Row, Col, Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LeftSideBar from "./LeftSideBar";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      url: "http://localhost:5000/users",
    })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Row className="w-100">
      <Col>
        <LeftSideBar />
      </Col>
      <Col sm={9}>
        <h3 className="p-3">All Users </h3>
        <Table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>email</th>
              <th>Role</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(
                (
                  {
                    _id,
                    firstName,
                    lastName,
                    email,
                    status,
                    roleType,
                    profilePicture,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img width={80} height={80} alt="image" />
                    </td>
                    <td>{firstName + " " + lastName}</td>
                    <td>{email}</td>

                    <td>{roleType === 1 ? "Admin" : "Guest"}</td>

                    <td>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        //onChange={(e) => setChangeStatus(status, _id)}
                        checked={status ? "checked" : ""}
                      />
                    </td>
                    <td>
                      <Button href={"/edit-product/" + _id}>Edit</Button>
                      &nbsp;
                      <Button
                        variant="danger"
                        //onClick={(e) => deleteProduct(_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={9} align="center">
                  <h4>Sorry Not Product Found</h4>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default AllUsers;
