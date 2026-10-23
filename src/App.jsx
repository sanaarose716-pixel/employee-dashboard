
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("home");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <h2>EmployeeHub</h2>
        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("form")}>Employee Form</button>
        </div>
      </nav>

      <main className="container">
        {page === "home" ? (
          <>
            <div className="page-heading">
              <div>
                <p className="eyebrow">OVERVIEW</p>
                <h1>Employee Dashboard</h1>
                <p>View your employee directory in one place.</p>
              </div>
              <button
                className="primary-button"
                onClick={() => setPage("form")}
              >
                + Add Employee
              </button>
            </div>

            <div className="stat-card">
              <span>Total Employees</span>
              <h2>{employees.length}</h2>
              <p>Employees fetched from the API</p>
            </div>

            <section className="table-card">
              <h2>Employee Directory</h2>
              {loading ? (
                <p>Loading employees...</p>
              ) : employees.length === 0 ? (
                <p>Unable to load employees. Please refresh the page.</p>
              ) : (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.name}</td>
                          <td>{employee.username}</td>
                          <td>{employee.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        ) : (
          <EmployeeForm onCancel={() => setPage("home")} />
        )}
      </main>
    </div>
  );
}

function EmployeeForm({ onCancel }) {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    location: "",
    salary: "",
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert("Employee form submitted successfully!");
    setForm({
      name: "",
      designation: "",
      location: "",
      salary: "",
    });
  }

  return (
    <section className="form-card">
      <p className="eyebrow">EMPLOYEE MANAGEMENT</p>
      <h1>Employee Form</h1>
      <p>Enter the employee details below.</p>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </label>

        <label>
          Designation
          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="e.g. Software Developer"
            required
          />
        </label>

        <label>
          Location
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </label>

        <label>
          Salary
          <input
            type="number"
            name="salary"
            min="0"
            value={form.salary}
            onChange={handleChange}
            placeholder="Enter salary"
            required
          />
        </label>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default App;
