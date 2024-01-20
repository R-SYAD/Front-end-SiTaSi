// DosenProgresTA.jsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import "bulma/css/bulma.css";
import "../styles/Progres.css";

const DosenProgresTA = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [dataMahasiswa, setDataMahasiswa] = useState([]);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [token, setToken] = useState("");
  const [tipe, setTipe] = useState("");
  const [TAMahasiswa, setTAMahasiswa] = useState(null);
  const [showDocument, setShowDocument] = useState(false);
  const [documentContent, setDocumentContent] = useState(null);
  const [showModalAccept, setShowModalAccept] = useState(false);
  const [showModalReject, setShowModalReject] = useState(false);
  const [idProgress, setIdProgress] = useState({
    id_progress: ""
  });
  const [saran, setSaran] = useState("");

  const handleDetailClick = async (id_ta) => {
    setSelectedProgress(id_ta);
    try {
      const response = await fetch(`http://localhost:3000/progressMabing/${id_ta}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          tipe: `Bearer ${tipe}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data progres dari server");
      }

      const data = await response.json();
      setSelectedProgress({
        id_ta,
        id_progress: data.id_progress,
        progress: data.progress
      });
      setShowDetail(true);
    } catch (error) {
      console.error("Terdapat masalah:", error);
    }
  };

  const handleDocument = async (id_progress) => {
    try {
      const response = await fetch(`http://localhost:3000/progressFile/${id_progress}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          tipe: `Bearer ${tipe}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data dokumen dari server");
      }

      const data = await response.blob();
      const content = URL.createObjectURL(data);
      setDocumentContent(content);
      setShowDocument(true);
    } catch (error) {
      console.error("Terdapat masalah:", error);
    }
  };

  const handleCloseDocument = () => {
    setShowDocument(false);
    setDocumentContent(null);
  };

  const fetchData = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const userType = sessionStorage.getItem("userType");
      setToken(accessToken);
      setTipe(userType);

      const response = await fetch("http://localhost:3000/mahasiswaBimbingan", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          tipe: `Bearer ${userType}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server");
      }

      const data = await response.json();
      setDataMahasiswa(data.mahasiswa);
      setTAMahasiswa(data.ta);
    } catch (error) {
      console.error("Terdapat masalah:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DetailPage = ({ onClose, selectedProgress }) => {
    const [progressData, setProgressData] = useState([]);

    const handleCloseModal = () => {
      setShowModalAccept(false);
      setShowModalReject(false);
      setDocumentContent(null);
    };

    const handleShowModalTerima = (progress) => {
      setIdProgress({
        id_progress: progress.id_progress
      });
      setShowModalAccept(true);
      setSaran(""); // Reset nilai saran
    };
    const handleShowModalTolak = (progress) => {
      setIdProgress({
        id_progress: progress.id_progress
      });
      setShowModalReject(true);
      setSaran(""); // Reset nilai saran
    };

    const handleAccept = async (e) => {
      e.preventDefault();
      try {
        const token = sessionStorage.getItem("accessToken");
        const tipe = sessionStorage.getItem("userType");
        console.log("saran", saran);
        const id_progress = idProgress.id_progress;
        const response = await fetch(`http://localhost:3000/accProgressMabing/${id_progress}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            tipe: `Bearer ${tipe}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ saran_masukan: saran }),
        });
        
        if (!response.ok) {
          throw new Error("Gagal mengirim data ke server");
        }
        window.location.reload();
        // ... (Tambahkan logika atau manipulasi state jika diperlukan)
      } catch (error) {
        console.error("Terdapat masalah:", error);
      }
      handleCloseModal();
    };
    const handleReject = async (e) => {
      e.preventDefault();
      try {
        const token = sessionStorage.getItem("accessToken");
        const tipe = sessionStorage.getItem("userType");
        console.log("saran", saran);
        const id_progress = idProgress.id_progress;
        const response = await fetch(`http://localhost:3000/rejectProgressMabing/${id_progress}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            tipe: `Bearer ${tipe}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ saran_masukan: saran }),
        });

        if (!response.ok) {
          throw new Error("Gagal mengirim data ke server");
        }
        window.location.reload();
        // ... (Tambahkan logika atau manipulasi state jika diperlukan)
      } catch (error) {
        console.error("Terdapat masalah:", error);
      }
      handleCloseModal();
    };

    useEffect(() => {
      if (selectedProgress) {
        fetchDetailProgress(selectedProgress.id_ta);
      }
    }, [selectedProgress]);

    const fetchDetailProgress = async (id_ta) => {
      try {
        const response = await fetch(`http://localhost:3000/progressMabing/${id_ta}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            tipe: `Bearer ${tipe}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }

        const data = await response.json();
        setProgressData(data.progress);
      } catch (error) {
        console.error("Terdapat masalah:", error);
      }
    };

    return (
      <div>
        <h2>Detail Progress</h2>
        <Container className="form-container">
          <Container className="warnacont">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Progres</th>
                  <th>Deskripsi Progres</th>
                  <th>Tanggal Pengajuan</th>
                  <th>Status</th>
                  <th>Saran Perbaikan</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="font-body-table">
                {progressData.length > 0 ? (
                  progressData.map((progress, index) => (
                    <tr key={index}>
                      <td>{progress.nama_progress}</td>
                      <td>{progress.deskripsi_progress}</td>
                      <td>{progress.tanggal_pengajuan}</td>
                      <td>{progress.status_pengajuan}</td>
                      <td>{progress.saran_masukan}</td>
                      <td>
                        <Button
                          variant="primary"
                          style={{ marginRight: "10px" }}
                          onClick={() => handleDocument(progress.id_progress)}
                        >
                          Dokumen
                        </Button>
                        <Button
                          variant="success"
                          style={{ marginRight: "10px" }}
                          onClick={() => handleShowModalTerima(progress)}
                        >
                          ACC
                        </Button>
                        <Button
                          variant="danger"
                          style={{ marginRight: "10px" }}
                          onClick={() => handleShowModalTolak(progress)}
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">Tidak ada data progres.</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <p className="has-text-centered has-text-danger"></p>
          </Container>
        </Container>
        <Button onClick={onClose} variant="danger">
          Tutup Detail
        </Button>

        <Modal show={showDocument} onHide={handleCloseDocument}>
          <Modal.Header closeButton>
            <Modal.Title>Detail Dokumen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {documentContent && (
              <iframe
                src={documentContent}
                title="Dokumen"
                style={{ width: "100%", height: "500px" }}
              />
            )}
          </Modal.Body>
        </Modal>

        <Modal show={showModalAccept} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Form ACC</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAccept}>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Saran</Form.Label>
                <Form.Control
                  as="textarea"
                  name="desc"
                  rows={3}
                  value={saran}
                  onChange={(e) => {
                    if (e.target.value !== saran) {
                      setSaran(e.target.value);
                    }
                  }}
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Simpan Perubahan
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={showModalReject} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Form Reject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleReject}>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Saran</Form.Label>
                <Form.Control
                  as="textarea"
                  name="desc"
                  rows={3}
                  value={saran}
                  onChange={(e) => {
                    if (e.target.value !== saran) {
                      setSaran(e.target.value);
                    }
                  }}
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Simpan Perubahan
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  };

  return (
    <div className="badan">
      <Container className="judulHalaman">
        <Row className="mb-3">
          <Col md={3}>
            <h3>Progres TA Mahasiswa</h3>
          </Col>
        </Row>
      </Container>
      <Container className="form-container">
        <Container className="warnacont">
          {showDetail ? (
            <DetailPage onClose={() => setShowDetail(false)} selectedProgress={selectedProgress} />
          ) : (
            <Table striped hover>
              <thead>
                <tr>
                  <th>Nama Mahasiswa</th>
                  <th>NIM</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="font-body-table">
                {dataMahasiswa.map((mahasiswa, index) => (
                  <tr key={index}>
                    <td>{mahasiswa.nama}</td>
                    <td>{mahasiswa.nim}</td>
                    <td>
                      <Button
                        variant="primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => handleDetailClick(TAMahasiswa[index]?.id_ta)}
                      >
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default DosenProgresTA;
