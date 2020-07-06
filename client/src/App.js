import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);

  if (users === null) {
    return <h1 style={{ fontSize: "5rem" }}>Loading...</h1>;
  }

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then((res) => {
        setUsers(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <div
        style={{ marginTop: "5%", display: "flex", flexDirection: "column" }}
      >
        {users.map((u) => (
          <div style={{ border: "1px solid gray", marginBottom: "2%" }}>
            <h2>NAME: {u.name}</h2>
            <h3>ID: {u.id}</h3>
            <p>BIO: {u.bio}</p>
            <button onClick={() => handleDelete(u.id)}>DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
