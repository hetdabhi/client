import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      console.log(`Fetching user data for id: ${id}`);
      axios.get(`https://server-cj3x.onrender.com/api/finduser/${id}`)
        .then(response => {
          console.log("User data fetched successfully:", response.data);
          setUser(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with user data:", user);
    if (id) {
      axios.put(`https://server-cj3x.onrender.com/api/update/${id}`, user)
        .then(response => {
          console.log("User updated successfully:", response.data);
          toast.success("User updated successfully");
          navigate("/");
        })
        .catch(error => {
          console.error("Error updating user:", error);
          toast.error("Failed to update user");
        });
    } else {
      axios.post("https://server-cj3x.onrender.com/api/create", user)
        .then(response => {
          console.log("User created successfully:", response.data);
          toast.success("User created successfully");
          navigate("/");
        })
        .catch(error => {
          console.error("Error creating user:", error);
          toast.error("Failed to create user");
        });
    }
  };

  return (
    <div className="container">
      <Toaster />
      <h2>{id ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={user.age}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
