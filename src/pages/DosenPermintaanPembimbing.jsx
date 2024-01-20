  import React, { useEffect, useState } from "react";
  import {
    Container,
    Row,
    Col,
    Button,
    Table,
    Modal,
  } from "react-bootstrap";
  import ReactPaginate from "react-paginate";
  import "bulma/css/bulma.css";
  import "../styles/Progres.css";

  const PermintaanPembimbing = () => {
    const [show, setShow] = useState(false);
    const [mahasiswaData, setMahasiswaData] = useState([]);
    const [namaMahasiswa, setNamaMahasiswa] = useState([]);
    const [detailData, setDetailData] = useState({
      judul: "",
      detailIde: "",
      tanggalJudul: "",
      nim:""
    });
    const [isAccepting, setIsAccepting] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);

    const handleClose = () => {
      setShow(false);
      setIsAccepting(false);
      setIsRejecting(false);
    };

    const handleDetailClick = (mahasiswa) => {
      setDetailData({
        judul: mahasiswa.judul || "Judul Tidak Tersedia",
        detailIde: mahasiswa.detail_ide || "Detail Ide Tidak Tersedia",
        tanggalJudul: mahasiswa.tanggal_judul || "Tanggal Judul Tidak Tersedia",
        nim: mahasiswa.nim
        // Set field lainnya sesuai kebutuhan
      });
      setShow(true);
    };

    const handleAccept = () => {
      const token = sessionStorage.getItem("accessToken");
      const tipe = sessionStorage.getItem("userType");
      // Implementasikan logika Anda untuk menyimpan status "Accept" ke backend
      setIsAccepting(true);
      const requestOptions = {
        method: "POST", 
        headers: {
          Authorization: `Bearer ${token}`,
          tipe: `Bearer ${tipe}`,
          "Content-Type": "application/json", // Ganti sesuai dengan format data yang Anda kirim
        },
      };
      fetch(`http://localhost:3000/accept/requestdosbing/${detailData.nim}`, requestOptions)
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

    const handleReject = () => {
      const token = sessionStorage.getItem("accessToken");
      const tipe = sessionStorage.getItem("userType");
      setIsRejecting(true);
      const requestOptions = {
        method: "POST", 
        headers: {
          Authorization: `Bearer ${token}`,
          tipe: `Bearer ${tipe}`,
          "Content-Type": "application/json", // Ganti sesuai dengan format data yang Anda kirim
        },
      };
      fetch(`http://localhost:3000/reject/requestdosbing/${detailData.nim}`, requestOptions)
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

    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const tipe = sessionStorage.getItem("userType");
        const response = await fetch("http://localhost:3000/requestdosbing", {
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
        setMahasiswaData(data.bimbingan);
        setNamaMahasiswa(data.mahasiswa);
        console.log(data.bimbingan);
        console.log("assdasc", data.bimbingan[0]);
        console.log("nama", data.mahasiswa);
      } catch (error) {
        console.error("Terdapat masalah:", error);
      }
    };

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
                    <td>
                      {namaMahasiswa[index]?.nama || "Nama Tidak Tersedia"}
                    </td>
                    <td>{mahasiswa.nim}</td>
                    <td>{mahasiswa.status_judul}</td>
                    <td>
                      <Button onClick={() => handleDetailClick(mahasiswa)}>
                        Detail
                      </Button>
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
            <Modal.Title>Detail Mahasiswa</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-container">
            <p>Judul: {detailData.judul}</p>
            <p>Detail Ide: {detailData.detailIde}</p>
            <p>Tanggal Judul: {detailData.tanggalJudul}</p>
            {/* Tambahkan field lainnya sesuai kebutuhan */}
            {isAccepting || isRejecting ? (
              <p>Status: {isAccepting ? "Accepted" : "Rejected"}</p>
            ) : (
              <div>
                <Button variant="success" onClick={handleAccept}>
                  Accept
                </Button>{" "}
                <Button variant="danger" onClick={handleReject}>
                  Reject
                </Button>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  };

  export default PermintaanPembimbing;
