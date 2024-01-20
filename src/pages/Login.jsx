import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Login.css";
import Cookies from "js-cookie";

const Login = () => {
  const [nomorinduk, setNomorInduk] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Gunakan useNavigate untuk pengalihan

  const handleNomorIndukChange = (e) => {
    setNomorInduk(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({ nomorinduk, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();

        if (data.success) {
          // Simpan token dan userType dalam sessionStorage

          Cookies.set("accessToken", data.token);
          sessionStorage.setItem("accessToken", data.token);
          sessionStorage.setItem("userType", data.user);
          sessionStorage.setItem("id", data.nomorinduk);
          console.log(data);
          // Redirect ke halaman berdasarkan userType
          if (data.user === "mahasiswa") {
            navigate("/home");
            window.location.reload();
          } else if (data.user === "dosen") {
            navigate("/dosen-home");
            window.location.reload();
          } else if (data.user === "admin") {
            navigate("/admin-home");
            window.location.reload();
          }
        } 
      } 
      
      if(!res.ok) {
        const errorData = await res.json()
        setError(errorData.message)
        console.log(errorData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="vh-100">
        <Container fluid className="h-custom">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col
              md={8}
              lg={6}
              xl={4}
              offset={{ xl: 0 }}
              className="mt-5 px-3 py-5"
            >
              <Form id="login" onSubmit={handleSubmit}>
                <div className="card-body p-3 text-center">
                  <i className="judul">Sign in to SITASI</i>
                </div>

                <Container className="kolom pt-3 px-4">
                  <Form.Group
                    className="form-outline mb-4"
                    controlId="nomorinduk"
                  >
                    <Form.Label>Nomor Induk</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your nomor induk"
                      size="lg"
                      value={nomorinduk}
                      onChange={handleNomorIndukChange}
                    />
                  </Form.Group>

                  <Form.Group
                    className="form-outline mb-3"
                    controlId="password"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      size="lg"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>

                  <div className="text-center text-lg-start">
                    <div className="card-body py-3 text-center d-grid">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing In..." : "Sign in"}
                      </Button>
                      {error && <p className="text-danger">{error}</p>}
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account?
                        <a href="register" className="link-danger">
                          Register
                        </a>
                      </p>
                    </div>
                  </div>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Login;
