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

const AdminDosen = () => {
  const [show, setShow] = useState(false);
  const [dosenData, setDosenData] = useState([]); // State untuk data dosen
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    nip: "",
    namaDosen: "",
    jeniskelamin: "Laki-laki",
    kuotaDosbing: 1,
    password: "",
  });

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("accessToken");
        const tipe = sessionStorage.getItem("userType");
      // Mengambil data dosen dari backend
      fetch("http://localhost:3000/listdosen",{
        method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              tipe: `Bearer ${tipe}`,
              "Content-Type": "application/json",
            },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.dosen && data.dosen.length > 0) {
            // Periksa apakah data.dosen ada dan berisi setidaknya satu entitas dosen
            setDosenData(data.dosen);
          } else {
            console.log("Data dosen tidak ditemukan");
            // Handle kasus di mana data dosen tidak ditemukan
            // Anda dapat menampilkan pesan atau mengambil tindakan lain yang sesuai
          }
        })
        .catch((error) => console.error("Error fetching data:", error.message));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("accessToken");
    const tipe = sessionStorage.getItem("userType");
    try {
      const response = await fetch("http://localhost:3000/tambahAkunDosen", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          tipe: `Bearer ${tipe}`,
          "Content-Type": "application/json", // Ganti sesuai dengan format data yang Anda kirim
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Akun Dosen telah terbuat:", data);
        // Lakukan tindakan yang sesuai, misalnya menutup modal
        handleClose();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      // Handle error, tampilkan pesan kesalahan, dsb.
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="badan">
      <Container className="judulHalaman">
        <Row className="mb-3">
          <Col md={3}>
            <h2>Dosen</h2>
          </Col>
          <Col md={{ span: 2, offset: 7 }}>
            <Button variant="primary" onClick={handleShow}>
              Add
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="form-container">
        <Container className="warnacont">
          <Table striped hover>
            <thead>
              <tr>
                <th>Nama Dosen</th>
                <th>NIP</th>
                <th>Jenis Kelamin</th>
              </tr>
            </thead>
            <tbody className="font-body-table">
              {dosenData.map((dosen) => (
                <tr key={dosen.nip}>
                  <td>{dosen.nama_dosen}</td>
                  <td>{dosen.nip}</td>
                  <td>{dosen.jenis_kelamin}</td>
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
          <Modal.Title>Add New Dosen Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nip">
              <Form.Label>NIP</Form.Label>
              <Form.Control
                type="text"
                name="nip"
                placeholder="Enter NIP"
                required
                value={formData.nip}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="namaDosen">
              <Form.Label>Nama Dosen</Form.Label>
              <Form.Control
                type="text"
                name="namaDosen"
                placeholder="Enter Nama Dosen"
                required
                value={formData.namaDosen}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="jeniskelamin">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                as="select"
                name="jeniskelamin"
                required
                value={formData.jeniskelamin}
                onChange={handleInputChange}
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </Form.Control>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="kuotaDosbing">
              <Form.Label>Kuota Dosbing (1-10)</Form.Label>
              <Form.Control
                type="number"
                name="kuotaDosbing"
                min="1"
                max="10"
                required
                value={formData.kuotaDosbing}
                onChange={handleInputChange}
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleFormSubmit}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDosen;
