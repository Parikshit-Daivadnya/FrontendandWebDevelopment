import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Form, Container } from "react-bootstrap";
import { getStudentList, deleteStudent } from "../services/service";
import ViewDetails from "./ViewDetails";

function RegisteredRecords() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    const data = await getStudentList();
    setStudents(data);
    setFilteredStudents(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteStudent(id);
      fetchStudentData();
    }
  };

  const handleEdit = (student) => {
    navigate("/", { state: { student } });
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setModalShow(true);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredStudents(
      students.filter((student) =>
        Object.values(student).some((val) =>
          val.toString().toLowerCase().includes(query)
        )
      )
    );
  };

  return (
    <Container>
      <h3>Registered Students</h3>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </Form.Group>

      <Table bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Mobile</th>
            <th>Degree</th>
            <th>Year</th>
            <th>Ac ons</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.rollNo}</td>
              <td>{student.mobile}</td>
              <td>{student.degree}</td>
              <td>{student.year}</td>
              <td>
                <Button on variant="info" onClick={() => handleView(student)}>
                  View
                </Button>
                <Button
                  on
                  variant="warning"
                  className="ms-2"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </Button>
                <Button
                  on
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ViewDetails
        show={modalShow}
        handleClose={() => setModalShow(false)}
        student={selectedStudent}
      />
    </Container>
  );
}

export default RegisteredRecords;
