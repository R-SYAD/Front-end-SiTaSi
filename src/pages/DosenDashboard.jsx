import React from "react";
import "../styles/Dashboard.css";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DashboardDosen = () => {
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
              <h3>DASHBOARD</h3>
            </Col>
          </Row>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card bg-primary text-white h-100">
                <div className="card-body py-5">Pembimbing</div>
                <div
                  className="card-footer d-flex"
                  onClick={() => handleViewDetails("/pembimbing")}
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
                <div className="card-body py-5">Progres TA</div>
                <div
                  className="card-footer d-flex"
                  onClick={() => handleViewDetails("/progres")}
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
                <div className="card-body py-5">Seminar Hasil</div>
                <div
                  className="card-footer d-flex"
                  onClick={() => handleViewDetails("/semhas")}
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
                <div className="card-body py-5">Sidang Akhir</div>
                <div
                  className="card-footer d-flex"
                  onClick={() => handleViewDetails("/sidang")}
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

export default DashboardDosen;
