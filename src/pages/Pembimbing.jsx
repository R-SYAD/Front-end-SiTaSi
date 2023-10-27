import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import "../styles/Pembimbing.css";

const Pembimbing = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedPembimbing, setSelectedPembimbing] = useState("");
  const [dosenList, setDosenList] = useState([]); // Menambah state untuk daftar pembimbing
  const [judulTugasAkhir, setJudulTugasAkhir] = useState("");
  const [deskripsiTugasAkhir, setDeskripsiTugasAkhir] = useState("");

  useEffect(() => {
    // Ganti URL_API dengan URL endpoint yang sesuai pada backend Anda
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/pilihdosbing");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDosenList(data); // Mengisi daftar pembimbing dari data backend
        console.log(data);
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

    // Konfigurasi request
    const requestOptions = {
      method: "POST", // Ganti dengan metode HTTP yang sesuai (POST, PUT, dll.)
      headers: {
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
        return response.json(); // Anda dapat menghapus ini jika tidak ada respons yang perlu diproses
      })
      .then((data) => {
        // Response dari server (jika ada)
        console.log(data);
        // Tambahkan logika untuk menangani respons dari server, seperti menampilkan pesan sukses
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
        console.log(error);
        // Tambahkan logika untuk menangani kesalahan, seperti menampilkan pesan kesalahan
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
            <Form.Control
              type="text"
              placeholder="Judul Tugas Akhir"
              value={judulTugasAkhir}
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
              placeholder="Deskripsi Tugas Akhir"
              name="deskripsiTugasAkhir" // Tambahkan name untuk mengaitkan dengan req.body
              rows={3}
              value={deskripsiTugasAkhir}
              onChange={(e) => setDeskripsiTugasAkhir(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label className="form-label">Status</Form.Label>
            <Form.Control disabled />
          </Form.Group>
          {/* Kemudian panggil handleSubmit() pada tombol "Ajukan Pembimbing" onClick seperti ini:*/}
          <Button variant="success" onClick={handleSubmit}>
            Ajukan Pembimbing
          </Button>
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
