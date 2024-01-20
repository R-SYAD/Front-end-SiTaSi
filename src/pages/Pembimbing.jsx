import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import "../styles/Pembimbing.css";
import Cookies from "js-cookie";
import axios from "axios";

const Pembimbing = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedPembimbing, setSelectedPembimbing] = useState("");
  const [dosenList, setDosenList] = useState([]);
  const [judulTugasAkhir, setJudulTugasAkhir] = useState("");
  const [deskripsiTugasAkhir, setDeskripsiTugasAkhir] = useState("");
  const [status, setStatus] = useState(""); // Menambah state untuk menyimpan status
  const [namaDosbing, setnamaDosbing] = useState(""); // Menambah state untuk menyimpan status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const tipe = sessionStorage.getItem("userType");
        if (!token) {
          console.error("Token tidak ditemukan");
          return;
        }

        // Fetch data dosbing
        const dosbingResponse = await fetch(
          "http://localhost:3000/pilihdosbing",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              tipe: `Bearer ${tipe}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!dosbingResponse.ok) {
          throw new Error("Network response was not ok for dosbing");
        }

        const dosbingData = await dosbingResponse.json();
        setDosenList(dosbingData);

        // Fetch data status
        const statusResponse = await fetch(
          "http://localhost:3000/tampilstatus",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              tipe: `Bearer ${tipe}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!statusResponse.ok) {
          throw new Error("Network response was not ok for status");
        }

        const statusData = await statusResponse.json();
        setStatus(statusData.status);
        setnamaDosbing(statusData.namaDosen);

        // console.log("Dosen List:", dosbingData);
        // console.log("Status:", statusData);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchData();
  }, []);

  const handleAddPembimbing = (dosen) => {
    setSelectedPembimbing(dosen);
    handleClose();
  };

  const handleSubmit = () => {
    if (!selectedPembimbing || !judulTugasAkhir || !deskripsiTugasAkhir) {
      alert("Harap lengkapi semua bidang sebelum mengajukan.");
      return;
    }
    // Data yang akan dikirim ke server
    const formData = {
      judul: judulTugasAkhir,
      idDosbing: selectedPembimbing, // Menyamakan dengan nama req.body di server
      detailIde: deskripsiTugasAkhir,
    };
    const token = sessionStorage.getItem("accessToken");
    const tipe = sessionStorage.getItem("userType");
    // Konfigurasi request
    const requestOptions = {
      method: "POST", 
      headers: {
        Authorization: `Bearer ${token}`,
        tipe: `Bearer ${tipe}`,
        "Content-Type": "application/json", // Ganti sesuai dengan format data yang Anda kirim
      },
      body: JSON.stringify(formData), // Mengubah data menjadi JSON
    };

    // Ganti URL_API dengan URL endpoint yang sesuai pada backend Anda
    fetch("http://localhost:3000/pilihdosbing", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
        console.log(error);
      });
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
                {status.id_dosbing!==null ||selectedPembimbing
                  ? selectedPembimbing||namaDosbing.nama_dosen
                  : "No Pembimbing selected"}
              </span>
              <Button variant="primary" onClick={handleShow} disabled={status.status_judul ==="pengajuan" || status.status_judul ==="accept" }>
                Add Pembimbing
              </Button>
            </div>
          </Form.Group>

          {/* submit judul serta ide */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="form-label">Judul Tugas Akhir</Form.Label>
            <Form.Control
              type="text"
              placeholder={status.judul !== null ? status.judul:"Judul Tugas Akhir"}
              value={judulTugasAkhir}
              disabled={status.status_judul ==="pengajuan" || status.status_judul ==="accept" }
              onChange={(e) => setJudulTugasAkhir(e.target.value)}
              name="judulTugasAkhir" // Tambahkan name untuk mengaitkan dengan req.body
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label className="form-label">
              Detail Ide Tugas Akhir
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder={status.detail_ide !==null ? status.detail_ide:"Deskripsi Tugas Akhir"}
              name="deskripsiTugasAkhir" // Tambahkan name untuk mengaitkan dengan req.body
              rows={3}
              value={deskripsiTugasAkhir}
              disabled={status.status_judul ==="pengajuan" || status.status_judul ==="accept" }
              onChange={(e) => setDeskripsiTugasAkhir(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label className="form-label">Status</Form.Label>
            <Form.Control value={status.status_judul} disabled />
          </Form.Group>
          
          <Button variant="success" onClick={handleSubmit}>
            Ajukan Pembimbing
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
                  value={selectedPembimbing}
                >
                  <option value="">Select Pembimbing</option>
                  {dosenList &&
                    dosenList.dosenData &&
                    dosenList.dosenData.map((dosen) => (
                      <option key={dosen.nip} value={dosen.nip}>
                        {dosen.nama_dosen}
                      </option>
                    ))}
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
