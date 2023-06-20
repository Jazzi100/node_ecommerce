import React from "react";
import { Row, Col } from "react-bootstrap";

import LeftSideBar from "./LeftSideBar";
function Dashboard() {
  return (
    <Row className="w-100">
      <Col>
        <LeftSideBar />
      </Col>
      <Col sm={9}>
        <h2 className="p-3">Dashboard</h2>
      </Col>
    </Row>
  );
}

export default Dashboard;
