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
  const handleShowBABI = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataProgress, setDataProgress] = useState("");
  const [formDataProgres, setFormDataProgres] = useState({
    nama_progress: "",
    deskripsi_progress: "",
  });

  const [progressData, setProgressData] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const removeData = async (id_progress) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const tipe = sessionStorage.getItem("userType");

      const response = await fetch(`http://localhost:3000/deleteprogress/${id_progress}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          tipe: `Bearer ${tipe}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        let errorMessage = "Failed to delete progress";

        // Check if the response has a JSON content type
        if (response.headers.get("content-type")?.includes("application/json")) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;

            alert(errorMessage);
            setDeleteConfirmation(null) 
          } catch (jsonError) {
            console.error("Error parsing JSON from response:", jsonError);
          }
        } else {

          alert(errorMessage); 
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);

      alert(data.message); 
      window.location.reload();
    } catch (error) {
      console.error("Error deleting progress:", error);
    }
  };

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // Fetch data from the backend API
        const token = sessionStorage.getItem("accessToken");
        const tipe = sessionStorage.getItem("userType");
        const response = await fetch("http://localhost:3000/progress", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            tipe: `Bearer ${tipe}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch progress data");
        }

        const data = await response.json();
        setProgressData(data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgressData();
  }, []); 
  // Fungsi untuk mengunggah file dan deskripsi ke backend
  const uploadFile = async (file, description) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // "file" adalah nama field di backend
      formData.append("description", description); // "description" adalah nama field di backend

      const response = await fetch("http://localhost:3000/upprogres", {
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
  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("nama_progress", formDataProgres.nama_progress);
    formData.append("deskripsi_progress", formDataProgres.deskripsi_progress);
  
    const token = sessionStorage.getItem("accessToken");
    const tipe = sessionStorage.getItem("userType");
  
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        tipe: `Bearer ${tipe}`,
      },
      body: formData, // Using formData instead of JSON.stringify(formData)
    };
  
    try {
      const response = await fetch("http://localhost:3000/upprogress", requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data: ", error);
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
          <Col>
            {" "}
            <Button
              variant="primary"
              style={{ marginRight: "10px" }}
              onClick={handleShowBABI}
            >
              Tambah
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="form-container">
        <Container className=" warnacont">
        <Table striped hover>
      <thead>
        <tr>
          <th>Progres</th>
          <th>File</th>
          <th>Deskripsi Progres</th>
          <th>Tanggal Pengajuan</th>
          <th>Status</th>
          <th>Saran</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="font-body-table">
        {progressData.map((progressItem) => (
          <tr key={progressItem.id}>
            <td>{progressItem.nama_progress}</td>
            <td>{progressItem.nama_file}</td>
            <td>{progressItem.deskripsi_progress}</td>
            <td>{progressItem.tanggal_pengajuan}</td>
            <td>{progressItem.status_pengajuan}</td>
            <td>{progressItem.saran_masukan}</td>
            <td>
              <Button variant="danger" style={{ marginRight: "10px" }} onClick={() => setDeleteConfirmation(progressItem.id_progress)}>
                Hapus
              </Button>
              {/* Add other action buttons as needed */}
            </td>
          </tr>
        ))}
      </tbody>
      <Modal show={deleteConfirmation !== null} onHide={() => setDeleteConfirmation(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Penghapusan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus progress ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => removeData(deleteConfirmation)}>
            Ya, Hapus
          </Button>
          <Button variant="secondary" onClick={() => setDeleteConfirmation(null)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </Table>
          <p className="has-text-centered has-text-danger"></p>
        </Container>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Upload Progress TA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
          <Form.Group className="mb-3" controlId="formBab">
  <Form.Label>Progres</Form.Label>
  <Form.Control
    type="text"
    name="nama_progress"
    value={formDataProgres.nama_progress}
    onChange={(e) =>
      setFormDataProgres({
        ...formDataProgres,
        nama_progress: e.target.value,
      })
    }
  />
</Form.Group>
<Form.Group className="mb-3" controlId="formName">
  <Form.Label>Upload File Progres TA</Form.Label>
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
  <Form.Label>Deskripsi Progres</Form.Label>
  <Form.Control
    as="textarea"
    name="deskripsi_progress"
    rows={3}
    value={formDataProgres.deskripsi_progress}
    onChange={(e) =>
      setFormDataProgres({
        ...formDataProgres,
        deskripsi_progress: e.target.value,
      })
    }
  />
</Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSaveChanges}>Save Changes</Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Progres;