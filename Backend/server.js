const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "javatpoint",
});

con.connect(function (err) {
  if (err) {
    console.log("MySQL Connection Failed!");
    console.log(err.message);
    return;
  }

  console.log("Connected to MySQL!");
});

// HOME
app.get("/", function (req, res) {
  res.send("Backend is running!");
});

// SHOW ALL EMPLOYEES
app.get("/api/employees", function (req, res) {
  var sql = "SELECT * FROM employees";

  con.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
      return;
    }

    res.json(result);
  });
});

// SEARCH EMPLOYEE BY NAME
app.get("/api/employees/search", function (req, res) {
  var name = req.query.name;

  var sql = "SELECT * FROM employees WHERE name = ?";

  con.query(sql, [name], function (err, result) {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
      return;
    }

    res.json(result);
  });
});

// INSERT EMPLOYEE
app.post("/api/employees", function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var age = req.body.age;
  var city = req.body.city;

  var sql = "INSERT INTO employees (id, name, age, city) VALUES (?, ?, ?, ?)";

  con.query(sql, [id, name, age, city], function (err, result) {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
      return;
    }

    res.json({
      message: "Employee inserted successfully!",
      id: result.insertId,
    });
  });
});

// UPDATE EMPLOYEE
app.put("/api/employees/:id", function (req, res) {
  var id = req.params.id;

  var name = req.body.name;
  var age = req.body.age;
  var city = req.body.city;

  var sql = "UPDATE employees SET name = ?, age = ?, city = ? WHERE id = ?";

  con.query(sql, [name, age, city, id], function (err, result) {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
      return;
    }

    res.json({
      message: "Employee updated successfully!",
    });
  });
});

// DELETE EMPLOYEE
app.delete("/api/employees/:id", function (req, res) {
  var id = req.params.id;

  var sql = "DELETE FROM employees WHERE id = ?";

  con.query(sql, [id], function (err, result) {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
      return;
    }

    res.json({
      message: "Employee deleted successfully!",
    });
  });
});

app.listen(5000, function () {
  console.log("Server running on port 5000");
});
