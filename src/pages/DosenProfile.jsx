import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Modal, Alert } from "react-bootstrap";
import axios from "axios";

const Profile = () => {
  const [show, setShow] = useState(false);
  const [recentPassword, setRecentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [profilDosen, setprofilDosen] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const handleClose = () => {setShow(false); setShowNotification(false)};

  useEffect(() => {
    const successMessage = sessionStorage.getItem('successMessage');

    if (successMessage) {
        alert(successMessage);
        sessionStorage.removeItem('successMessage');
    }

    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const tipe = sessionStorage.getItem("userType"); 
      if (!token) {
        console.error("Token tidak ditemukan");
        return;
      }

      const profileresponse = await fetch(
        "http://localhost:3000/profildosen",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            tipe: `Bearer ${tipe}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!profileresponse.ok) {
        throw new Error("Ada masalah");
      }

      const userData = await profileresponse.json();
      setprofilDosen(userData.profil);
      setName(userData.profil.nama_dosen);
      setJenisKelamin(userData.profil.jenis_kelamin);
      setOldPassword(userData.profil.password);
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  const handleSave = async () => {
    try {
      const formData = {
        jenisKelamin: jenisKelamin,
        nama: name,
        recentPassword: recentPassword,
        newPassword: updatedPassword,
      };

      const token = sessionStorage.getItem("accessToken");
      const tipe = sessionStorage.getItem("userType");
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          tipe: `Bearer ${tipe}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch(
        "http://localhost:3000/editprofildosen",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      sessionStorage.setItem('successMessage', data.message);
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  const handleChangePassword = () => {
    setOldPasswordError(false);
  setPasswordMatchError(false);
  setRecentPassword("");
  setNewPassword("");
  setRepeatNewPassword("");
    if (oldPassword !== recentPassword) {
      setOldPasswordError(true);
      return;
    }

    if (newPassword === repeatNewPassword) {
      setUpdatedPassword(newPassword)
      setShow(false);
      setShowNotification(true);

    } else {
      setPasswordMatchError(true);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#1D3752" }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={8}>
            <Card style={{ borderRadius: ".5rem" }}>
              <Card.Body className="row g-0">
                <Col md={8}>
                  <div className="card-body p-4">
                    <h6>My Profile</h6>
                    <hr className="mt-0 mb-4" />
                    <Alert
                      variant="success"
                      show={showNotification}
                      onClose={() => setShowNotification(false)}
                      dismissible
                    >
                      Untuk Menyimpan Password yang Baru Tekan Tombol Edit.
                    </Alert>
                    <Form id="profile">
                      <Form.Group
                        as={Row}
                        className="form-outline mb-3"
                        controlId="name"
                      >
                        <Form.Label column sm={4}>
                          Nama
                        </Form.Label>

                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            placeholder={profilDosen.nama_dosen}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                              border: "none",
                              borderRadius: 0,
                              borderBottom: "1px solid #ced4da",
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="form-outline mb-3"
                        controlId="jenisKelamin"
                      >
                        <Form.Label column sm={4}>
                          Jenis Kelamin
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            placeholder={profilDosen.jenis_kelamin}
                            value={jenisKelamin}
                            onChange={(e) => setJenisKelamin(e.target.value)}
                            style={{
                              border: "none",
                              borderRadius: 0,
                              borderBottom: "1px solid #ced4da",
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Row>
                        <Col md={{ span: 2, offset: 8 }} sm={6}>
                          <Button
                            variant="secondary"
                            style={{ visibility: "hidden" }}
                          >
                            Cancel
                          </Button>
                        </Col>
                        <Col md={{ span: 12 }} className="mt-3 d-flex flex-column align-items-center">
                          <Button
                            variant="info"
                            onClick={() => setShow(true)}
                            className="mb-2"
                          >
                            Change Password
                          </Button>
                          <Button variant="primary" onClick={handleSave}>
                            Edit
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Password Change Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-container">
        
          <Form>
            <Form.Group controlId="formRecentPassword">
              <Form.Label className="form-label">Recent Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your recent password"
                value={recentPassword}
                onChange={(e) => setRecentPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formNewPassword">
              <Form.Label className="form-label">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formRepeatNewPassword">
              <Form.Label className="form-label">Repeat New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat your new password"
                value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}
              />
            </Form.Group>

            {oldPasswordError && (
              <Alert variant="danger">Password lama Anda salah.</Alert>
            )}

            {passwordMatchError && (
              <Alert variant="danger">Passwornya tidak sama.</Alert>
            )}

            <Button
              variant="primary"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Profile;
