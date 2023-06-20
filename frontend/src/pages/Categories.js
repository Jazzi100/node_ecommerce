import React from "react";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categries: [],
    };
  }

  render() {
    return (
      <Card style={{ width: "11rem", margin: "10px" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <b>Categories</b>
          </ListGroup.Item>
          {this.state.categries.length &&
            this.state.categries.map(({ _id, name }) => (
              <ListGroup.Item>
                <a href={name}>{name}</a>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Card>
    );
  }

  componentDidMount() {
    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      url: "http://localhost:5000/api/category/get-all-categories",
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          categries: response.data,
        });
      })
      .then((error) => {
        console.log(error);
      });
  }
}

export default Categories;
