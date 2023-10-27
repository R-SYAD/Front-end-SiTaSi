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

const Progres = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fungsi untuk mengunggah file dan deskripsi ke backend
  const uploadFile = async (file, description) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // "file" adalah nama field di backend
      formData.append("description", description); // "description" adalah nama field di backend

      const response = await fetch("URL_BACKEND", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Berhasil mengunggah file dan deskripsi
        console.log("Upload berhasil");
      } else {
        // Gagal mengunggah file
        console.error("Gagal mengunggah file");
      }
    } catch (error) {
      // Terjadi kesalahan selama fetch request
      console.error("Terjadi kesalahan:", error);
    }
  };

  // Event handler untuk menghandle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = e.target.elements.desc.value; // Ambil nilai deskripsi dari form

    if (selectedFile && description) {
      // Panggil fungsi uploadFile dengan file dan description
      await uploadFile(selectedFile, description);
    } else {
      console.error("File dan deskripsi harus diisi.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="badan">
      <Container className="judulHalaman">
        <Row className="mb-3">
          <Col md={3}>
            <h3>Progres TA</h3>
          </Col>
        </Row>
      </Container>
      <Container className="form-container">
        <Container className=" warnacont">
          <Table striped hover>
            <thead>
              <tr>
                <th>Progres</th>
                <th>Tanggal Pengajuan</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="font-body-table">
              <tr>
                <td>
                  <b>Pendahuluan</b>
                </td>
                <td></td> {/* Isi tanggal pengajuan Pendahuluan di sini */}
                <td></td> {/* Isi status Pendahuluan di sini */}
                <td>
                  {" "}
                  <td>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      onClick={handleShow}
                    >
                      Tambah
                    </Button>
                    <Button variant="warning" style={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button variant="danger" style={{ marginRight: "10px" }}>
                      Hapus
                    </Button>
                  </td>
                </td>{" "}
                {/* Isi action Pendahuluan di sini */}
              </tr>
              <tr>
                <td>
                  <b>BAB I</b>
                </td>
                <td></td> {/* Isi tanggal pengajuan BAB I di sini */}
                <td></td> {/* Isi status BAB I di sini */}
                <td>
                  <td>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      onClick={handleShow}
                    >
                      Tambah
                    </Button>
                    <Button variant="warning" style={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button variant="danger" style={{ marginRight: "10px" }}>
                      Hapus
                    </Button>
                  </td>
                </td>{" "}
                {/* Isi action BAB I di sini */}
              </tr>
              <tr>
                <td>
                  <b>BAB II</b>
                </td>
                <td> </td> {/* Isi tanggal pengajuan BAB II di sini */}
                <td> </td> {/* Isi status BAB II di sini */}
                <td>
                  {" "}
                  <td>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      onClick={handleShow}
                    >
                      Tambah
                    </Button>
                    <Button variant="warning" style={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button variant="danger" style={{ marginRight: "10px" }}>
                      Hapus
                    </Button>
                  </td>
                </td>{" "}
                {/* Isi action BAB II di sini */}
              </tr>
              <tr>
                <td>
                  <b>BAB III</b>
                </td>
                <td> </td> {/* Isi tanggal pengajuan BAB III di sini */}
                <td> </td> {/* Isi status BAB III di sini */}
                <td>
                  {" "}
                  <td>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      onClick={handleShow}
                    >
                      Tambah
                    </Button>
                    <Button variant="warning" style={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button variant="danger" style={{ marginRight: "10px" }}>
                      Hapus
                    </Button>
                  </td>
                </td>{" "}
                {/* Isi action BAB III di sini */}
              </tr>
              <tr>
                <td>
                  <b>BAB IV</b>
                </td>
                <td> </td> {/* Isi tanggal pengajuan BAB III di sini */}
                <td> </td> {/* Isi status BAB III di sini */}
                <td>
                  {" "}
                  <td>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      onClick={handleShow}
                    >
                      Tambah
                    </Button>
                    <Button variant="warning" style={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button variant="danger" style={{ marginRight: "10px" }}>
                      Hapus
                    </Button>
                  </td>
                </td>{" "}
                {/* Isi action BAB III di sini */}
              </tr>
              <tr>
                <td>
                  <b>BAB V</b>
                </td>
                <td> </td> {/* Isi tanggal pengajuan BAB III di sini */}
                <td> </td> {/* Isi status BAB III di sini */}
                <td>
                  {" "}
                  <td>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      onClick={handleShow}
                    >
                      Tambah
                    </Button>
                    <Button variant="warning" style={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button variant="danger" style={{ marginRight: "10px" }}>
                      Hapus
                    </Button>
                  </td>
                </td>{" "}
                {/* Isi action BAB III di sini */}
              </tr>
              <tr>
                <td>
                  <b>BAB VI</b>
                </td>
                <td> </td> {/* Isi tanggal pengajuan BAB III di sini */}
                <td> </td> {/* Isi status BAB III di sini */}
                <td>
                  {" "}
                  <td>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      onClick={handleShow}
                    >
                      Tambah
                    </Button>
                    <Button variant="warning" style={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button variant="danger" style={{ marginRight: "10px" }}>
                      Hapus
                    </Button>
                  </td>
                </td>{" "}
                {/* Isi action BAB III di sini */}
              </tr>
              <tr>
                <td>
                  <b>BAB VII</b>
                </td>
                <td> </td> {/* Isi tanggal pengajuan BAB III di sini */}
                <td> </td> {/* Isi status BAB III di sini */}
                <td>
                  {" "}
                  <td>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      onClick={handleShow}
                    >
                      Tambah
                    </Button>
                    <Button variant="warning" style={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button variant="danger" style={{ marginRight: "10px" }}>
                      Hapus
                    </Button>
                  </td>
                </td>{" "}
                {/* Isi action BAB III di sini */}
              </tr>
              <tr>
                <td>
                  <b>BAB VIII</b>
                </td>
                <td> </td> {/* Isi tanggal pengajuan BAB III di sini */}
                <td> </td> {/* Isi status BAB III di sini */}
                <td>
                  {" "}
                  <td>
                    <Button
                      variant="primary"
                      style={{ marginRight: "10px" }}
                      onClick={handleShow}
                    >
                      Tambah
                    </Button>
                    <Button variant="warning" style={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button variant="danger" style={{ marginRight: "10px" }}>
                      Hapus
                    </Button>
                  </td>
                </td>{" "}
                {/* Isi action BAB III di sini */}
              </tr>
            </tbody>
          </Table>
          <p className="has-text-centered has-text-danger"></p>
        </Container>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
              <Form.Control as="textarea" name="desc" rows={3} />
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

export default Progres;
