import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Register = () => {
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    jenisKelamin: "",
    password: "",
    confirmPassword: "",
  });

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseErrorModal = () => setShowErrorModal(false);
  const handleShowErrorModal = (msg) => {
    setErrorMsg(msg);
    setShowErrorModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleShowSuccessModal = () => setShowSuccessModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nama, nim, jenisKelamin, password, confirmPassword } = formData;

    if (confirmPassword !== password) {
      handleShowErrorModal("Password Tidak Sama");
      return;
    }

    if (!nama || !nim || !jenisKelamin || !password || !confirmPassword) {
      handleShowErrorModal("Isi semua terlebih dahulu");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        handleShowErrorModal(errorData.msg);
        return;
      }

      handleShowSuccessModal();

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Container fluid className="h-custom">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col
            md={8}
            lg={6}
            xl={4}
            offset={{ xl: 0 }}
            className="mt-5 px-3 py-5"
          >
            <Form id="register" onSubmit={handleSubmit}>
              <div className="card-body p-3 text-center">
                <i className="judul">Register to SITASI</i>
              </div>

              <Container className="kolom px-4">
                <p className="text-center regis-warning">
                  Note: Register Hanya Untuk Mahasiswa.
                </p>

                <Form.Group className="form-outline mb-3 " controlId="nama">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    size="lg"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="form-outline mb-3 " controlId="nim">
                  <Form.Label>NIM</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your NIM"
                    size="lg"
                    name="nim"
                    value={formData.nim}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="form-outline mb-3" controlId="jenisKelamin">
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Select
                    size="lg"
                    name="jenisKelamin"
                    value={formData.jenisKelamin}
                    onChange={handleChange}
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="form-outline mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    size="lg"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="form-outline mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password again"
                    size="lg"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="text-center text-lg-start">
                  <div className="card-body py-3 text-center">
                    <Button type="submit" variant="primary" size="lg">
                      Register
                    </Button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Already have an account?
                      <a href="/" className="link-danger">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>

      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Register Berhasil</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
