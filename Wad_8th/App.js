import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./component/Registra onForm";
import RegisteredRecords from "./component/RegisteredRecord";
import Header from "./component/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [editStudent, setEditStudent] = useState(null);

  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <Registra
                onForm
                editStudent={editStudent}
                setEditStudent={setEditStudent}
              />
            }
          />
          <Route
            path="/records"
            element={<RegisteredRecords onEdit={setEditStudent} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
