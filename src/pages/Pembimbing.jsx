import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import "../styles/Pembimbing.css";

const Pembimbing = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedPembimbing, setSelectedPembimbing] = useState(null);

  const handleAddPembimbing = (pembimbing) => {
    setSelectedPembimbing(pembimbing);
    handleClose();
  };

  return (
    <div className="badan">
      <Container className="form.container">
        <div className="judulHalaman">
          <Row className="mb-3">
            <Col md={3}>
              <h3>Pengajuan Pembimbing</h3>
            </Col>
            <Col md={{ span: 2, offset: 7 }}></Col>
          </Row>
        </div>
        <Form className="form-container">
          {" "}
          {/* Terapkan gaya CSS pada elemen Form */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="form-label">Selected Pembimbing</Form.Label>
            <div className="d-flex">
              <span className="mr-2">
                {selectedPembimbing
                  ? selectedPembimbing
                  : "No Pembimbing selected"}
              </span>
              <Button variant="primary" onClick={handleShow}>
                Add Pembimbing
              </Button>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="form-label">Judul Tugas Akhir</Form.Label>
            <Form.Control type="text" placeholder="Form Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label className="form-label">
              Detail Ide Tugas Akhir
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="desc"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label className="form-label">Status</Form.Label>
            <Form.Control disabled />
          </Form.Group>
          <Button variant="success">Ajukan Pembimbing</Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Form>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Pembimbing</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-container">
            {" "}
            {/* Terapkan gaya CSS pada elemen Modal.Body */}
            <Form>
              <Form.Group controlId="formPembimbing">
                <Form.Label className="form-label">
                  Select Pembimbing
                </Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => handleAddPembimbing(e.target.value)}
                >
                  <option value="Pembimbing 1">Pembimbing 1</option>
                  <option value="Pembimbing 2">Pembimbing 2</option>
                  <option value="Pembimbing 3">Pembimbing 3</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Pembimbing;
