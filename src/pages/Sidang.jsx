import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Table,
} from "react-bootstrap";

const Sidang = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="badan">
      <Container>
        <Container className="judulHalaman">
          <Row className="mb-3">
            <Col md={3}>
              <h3>Sidang Akhir</h3>
            </Col>
          </Row>
        </Container>
        <Container className="form-container">
          <Table striped hover>
            <thead>
              <tr>
                <th>Jadwal Sidang</th>
                <th>Status</th>
                <th>Nilai</th>
              </tr>
            </thead>
          </Table>
        </Container>
      </Container>
    </div>
  );
};

export default Sidang;
