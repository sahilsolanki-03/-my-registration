import { useState } from "react";

function EmployeeForm() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  const [employees, setEmployees] = useState([]);

  const [searchName, setSearchName] = useState("");

  const [editId, setEditId] = useState(null);

  // SAVE
  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        age: age,
        city: city,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Error: " + data.error);
          return;
        }

        alert("Employee saved successfully!");

        setId("");
        setName("");
        setAge("");
        setCity("");
      })
      .catch((error) => {
        console.log(error);
        alert("Backend server se connection nahi ho raha!");
      });
  }

  // SHOW
  function handleShow() {
    fetch("http://localhost:5000/api/employees")
      .then((response) => response.json())

      .then((data) => {
        if (data.error) {
          alert("Error: " + data.error);
          return;
        }

        setEmployees(data);
      })

      .catch((error) => {
        console.log(error);
        alert("Backend server se connection nahi ho raha!");
      });
  }

  // SEARCH
  function handleSearch() {
    fetch(
      "http://localhost:5000/api/employees/search?name=" +
        encodeURIComponent(searchName),
    )
      .then((response) => response.json())

      .then((data) => {
        if (data.error) {
          alert("Error: " + data.error);
          return;
        }

        setEmployees(data);

        if (data.length === 0) {
          alert("Employee not found!");
        }
      })

      .catch((error) => {
        console.log(error);
        alert("Backend server se connection nahi ho raha!");
      });
  }

  // EDIT BUTTON
  function handleEdit(employee) {
    setEditId(employee.id);

    setId(employee.id);
    setName(employee.name);
    setAge(employee.age);
    setCity(employee.city);
  }

  // UPDATE
  function handleUpdate(e) {
    e.preventDefault();

    fetch("http://localhost:5000/api/employees/" + editId, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        age: age,
        city: city,
      }),
    })
      .then((response) => response.json())

      .then((data) => {
        if (data.error) {
          alert("Error: " + data.error);
          return;
        }

        alert("Employee updated successfully!");

        setEditId(null);

        setId("");
        setName("");
        setAge("");
        setCity("");

        handleShow();
      })

      .catch((error) => {
        console.log(error);
        alert("Backend server se connection nahi ho raha!");
      });
  }

  // DELETE
  function handleDelete(id) {
    var confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) {
      return;
    }

    fetch("http://localhost:5000/api/employees/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())

      .then((data) => {
        if (data.error) {
          alert("Error: " + data.error);
          return;
        }

        alert("Employee deleted successfully!");

        handleShow();
      })

      .catch((error) => {
        console.log(error);
        alert("Backend server se connection nahi ho raha!");
      });
  }

  return (
    <div className="form-container">
      <h2>Employee Form</h2>

      <form onSubmit={editId === null ? handleSubmit : handleUpdate}>
        <div className="form-group">
          <label>ID</label>

          <input
            type="number"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={editId !== null}
            required
          />
        </div>

        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Age</label>

          <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>City</label>

          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          {editId === null ? "Save Employee" : "Update Employee"}
        </button>
      </form>

      <br />

      <button type="button" onClick={handleShow}>
        Show Employees
      </button>

      <br />
      <br />

      <h2>Search Employee</h2>

      <input
        type="text"
        placeholder="Enter employee name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <button type="button" onClick={handleSearch}>
        Search
      </button>

      <br />
      <br />

      <h2>Employee List</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(function (employee) {
            return (
              <tr key={employee.id}>
                <td>{employee.id}</td>

                <td>{employee.name}</td>

                <td>{employee.age}</td>

                <td>{employee.city}</td>

                <td>
                  <button type="button" onClick={() => handleEdit(employee)}>
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeForm;
