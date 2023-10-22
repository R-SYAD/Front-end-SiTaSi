import React from "react";
import "../styles/Dashboard.css";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";

const Dashboard = () => {
  const handleViewDetails = (cardTitle) => {
    alert(`View Details clicked for ${cardTitle}`);
    // Di sini Anda dapat menambahkan logika yang sesuai dengan tindakan "View Details" yang Anda inginkan.
  };

  return (
    <div className="badan">
      <Container>
        <div className="judulHalaman">
          <Row className="mb-3">
            <Col md={3}>
              <h3>DASHBOARD</h3>
            </Col>
          </Row>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card bg-primary text-white h-100">
                <div className="card-body py-5">Primary Card</div>
                <div
                  className="card-footer d-flex"
                  onClick={() => handleViewDetails("Primary Card")}
                >
                  View Details
                  <span className="ms-auto">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card bg-warning text-dark h-100">
                <div className="card-body py-5">Warning Card</div>
                <div
                  className="card-footer d-flex"
                  onClick={() => handleViewDetails("Warning Card")}
                >
                  View Details
                  <span className="ms-auto">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card bg-success text-white h-100">
                <div className="card-body py-5">Success Card</div>
                <div
                  className="card-footer d-flex"
                  onClick={() => handleViewDetails("Success Card")}
                >
                  View Details
                  <span className="ms-auto">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card bg-danger text-white h-100">
                <div className="card-body py-5">Danger Card</div>
                <div
                  className="card-footer d-flex"
                  onClick={() => handleViewDetails("Danger Card")}
                >
                  View Details
                  <span className="ms-auto">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
