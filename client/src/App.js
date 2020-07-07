import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState(null);
  const [editingUser, setEditingUser] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    bio: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/users/${formValues.id}`, formValues)
      .then((res) => {
        setUsers(null);
        setEditingUser(false);
      });
  };

  const handleNew = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/users`, formValues).then((res) => {
      setUsers(null);
      setEditingUser(false);
    });
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <form onSubmit={handleNew}>
        <h1>New User: {formValues.name}</h1>
        <input
          type="text"
          value={formValues.name}
          name="name"
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
        />
        <input
          type="text"
          value={formValues.bio}
          name="bio"
          onChange={(e) =>
            setFormValues({ ...formValues, bio: e.target.value })
          }
        />
        <button type="submit">CREATE</button>
      </form>
      <div
        style={{ marginTop: "5%", display: "flex", flexDirection: "column" }}
      >
        {users.map((u) => (
          <div style={{ border: "1px solid gray", marginBottom: "2%" }}>
            <h2>NAME: {u.name}</h2>
            <h3>ID: {u.id}</h3>
            <p>BIO: {u.bio}</p>
            <button onClick={() => handleDelete(u.id)}>DELETE</button>
            <button
              onClick={() => {
                setEditingUser(true);
                setFormValues(u);
              }}
            >
              EDIT
            </button>
          </div>
        ))}
      </div>
      {editingUser && (
        <form onSubmit={handleSubmit}>
          <h1>Editing User: {formValues.name}</h1>
          <input
            type="text"
            value={formValues.name}
            name="name"
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
          />
          <input
            type="text"
            value={formValues.bio}
            name="bio"
            onChange={(e) =>
              setFormValues({ ...formValues, bio: e.target.value })
            }
          />
          <button type="submit">UPDATE</button>
        </form>
      )}
    </div>
  );
}

export default App;
