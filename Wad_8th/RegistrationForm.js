import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Col, Form, Row, Button, Container } from "react-bootstrap";
import { addStudent, updateStudent } from "../services/service";

function RegistrationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const studentToEdit = location.state?.student || null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    mobile: "",
    degree: "",
    year: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (studentToEdit) {
      setFormData(studentToEdit);
      setEditId(studentToEdit._id);
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateStudent(editId, formData);
    } else {
      await addStudent(formData);
    }
    handleReset();
    navigate("/records");
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      rollNo: "",
      mobile: "",
      degree: "",
      year: "",
    });
    setEditId(null);
  };

  return (
    <Container>
      <h3>{editId ? "Edit Student" : "Student Registra on"}</h3>
      <Form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <Form.Group as={Row} className="mb-3" key={key}>
            <Form.Label column sm="2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        ))}
        <Button on type="submit">
          {editId ? "Update" : "Submit"}
        </Button>
        <Button
          on
          type="bu on"
          variant="secondary"
          onClick={handleReset}
          className="ms 
2"
        >
          Reset
        </Button>
      </Form>
    </Container>
  );
}

export default RegistrationForm;
