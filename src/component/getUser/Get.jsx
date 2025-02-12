import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://server-cj3x.onrender.com/api/getall`);
        toast.success("User fetched successfully");
        setUsers(response.data);
      } catch (error) {
        console.error("Error in fetching the data:", error);
        toast.error("Failed to fetch the user data");
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://server-cj3x.onrender.com/api/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("User Deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the user.");
    }
  };

  return (
    <div className="userdiv">
      <div>
        <h1>User list</h1>
        <button className="btn btn-success">
          <Link className="btn " to={'/add'}> <i className="fa fa-pen me-1">  Register</i></Link>
        </button>
      </div>
      <div>
        <table className="table table-light">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col"> User Name</th>
              <th scope="col">User Email </th>
              <th scope="col">Age</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(user._id)}>
                      <i className="fa fa-trash"></i>
                    </button>
                    <button className="btn btn-light">
                      <Link to={`/edit/${user._id}`}><i className="fa fa-pen"></i></Link>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="4">No Data Found</td>
              </tr>
            )}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
