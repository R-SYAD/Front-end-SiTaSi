import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Modal,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "bulma/css/bulma.css";
import "../styles/Progres.css";

const PermintaanPembimbing = () => {
  const [show, setShow] = useState(false);
  const [mahasiswaData, setMahasiswaData] = useState([]); // State untuk menyimpan data mahasiswa
  const handleClose = () => setShow(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Fungsi untuk mengambil data dari backend
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/requestdosbing"); // Ganti dengan URL yang sesuai
      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server");
      }

      const data = await response.json();
      setMahasiswaData(data.bimbingan);
      console.log(data.bimbingan);
    } catch (error) {
      console.error("Terdapat masalah:", error);
      // Tangani kesalahan yang mungkin terjadi di sini
    }
  };

  // Panggil fetchData saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="badan">
      <Container className="judulHalaman">
        <Row className="mb-3">
          <Col md={3}>
            <h3>Permintaan Pembimbing</h3>
          </Col>
        </Row>
      </Container>
      <Container className="form-container">
        <Container className="warnacont">
          <Table striped hover>
            <thead>
              <tr>
                <th>Nama Mahasiswa</th>
                <th>NIM</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="font-body-table">
              {mahasiswaData.map((mahasiswa, index) => (
                <tr key={index}>
                  <td>{mahasiswa.nama}</td>
                  <td>{mahasiswa.nim}</td>
                  <td>{mahasiswa.status}</td>
                  <td>
                    <Button>Detail</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p className="has-text-centered has-text-danger"></p>
          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            <ReactPaginate
              previousLabel={"< Prev"}
              nextLabel={"Next >"}
              containerClassName={"pagination-list"}
              pageLinkClassName={"pagination-link"}
              previousLinkClassName={"pagination-previous"}
              nextLinkClassName={"pagination-next"}
              activeLinkClassName={"pagination-link is-current"}
              disabledLinkClassName={"pagination-link is-disabled"}
            />
          </nav>
        </Container>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Upload Progres TA</Form.Label>
              <div className="d-flex align-items-center">
                <span className="mr-2">
                  {selectedFile && selectedFile.name}
                </span>
                <label className="custom-file-upload">
                  <input type="file" onChange={handleFileChange} />
                </label>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                name="desc"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">Save Changes</Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PermintaanPembimbing;
