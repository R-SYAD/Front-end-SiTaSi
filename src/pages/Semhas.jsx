import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";

const Semhas = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="badan">
      <Container className="form.container" style={{ padding: "20px" }}>
        <div className="judulHalaman">
          <Row className="mb-3">
            <Col md={3}>
              <h3>Seminar Hasil</h3>
            </Col>
            <Col md={{ span: 2, offset: 7 }}></Col>
          </Row>
        </div>
        <Form className="form-container">
          {" "}
          {/* Terapkan gaya CSS pada elemen Form */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="form-label">Unggah File TA</Form.Label>
            <div className="d-flex align-items-center">
              <span className="mr-2">{selectedFile && selectedFile}</span>
              <label className="custom-file-upload">
                <input type="file" onChange={handleFileChange} />
              </label>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="form-label">Dosen Penguji 1</Form.Label>
            <Form.Control disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="form-label">Dosen Penguji 2</Form.Label>
            <Form.Control disabled />
          </Form.Group>
          <Button variant="success">Ajukan Permintaan Semhas</Button>
        </Form>
      </Container>
      <Container className="form.container" style={{ padding: "20px" }}>
        <Form className="form-container">
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label className="form-label">Status</Form.Label>
            <Form.Control disabled />
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default Semhas;
