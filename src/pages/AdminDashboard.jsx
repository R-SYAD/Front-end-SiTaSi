import React from "react";
import "../styles/Dashboard.css";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const handleViewDetails = (route) => {
    navigate(route);
  };

  return (
    <div className="badan">
      <Container>
        <div className="judulHalaman">
          <Row className="mb-3">
            <Col md={3}>
              <h2>W E L C O M E</h2>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default DashboardAdmin;
