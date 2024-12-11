import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance"; 

const DeleteUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        const [currentUserResponse, usersResponse] = await Promise.all([
          axiosInstance.get('/auth/me'), 
          axiosInstance.get('/profile/'), 
        ]);

        setCurrentUser(currentUserResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => user.id !== currentUser?.id);

  const handleDeleteUser = async () => {
    try {
      await axiosInstance.delete(`/admin/users/${userToDelete.id}`);
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      console.log("User deleted:", userToDelete.id);
      setShowConfirmation(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleProfileClick = (id) => {
    navigate(`/profile/${id}`);
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setUserToDelete(null);
  };

  return (
    <div className="delete-user-container" style={{ padding: "2rem", backgroundColor: "#f4f4f4", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "24px", fontWeight: "600" }}>Admin Panel - Delete Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : filteredUsers.length > 0 ? (
        <div className="users-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {filteredUsers.map((user) => {
            const { username, email, isAdmin, id } = user;
            return (
              <div key={id} className="user-card" style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <div className="user-header" style={{ marginBottom: "15px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>{username}</h3>
                  <p style={{ fontSize: "14px", color: "#555" }}>Email: {email}</p>
                  <p style={{ fontSize: "14px", color: "#555" }}>Role: {isAdmin ? "Admin" : "User"}</p>
                </div>
                <div className="user-actions" style={{ display: "flex", justifyContent: "space-between" }}>
                  <button
                    onClick={() => handleProfileClick(id)}
                    style={{
                      backgroundColor: "#4C89F2",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => confirmDelete(user)}
                    style={{
                      backgroundColor: "#FF4B5C",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No users available</p>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-modal" style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", textAlign: "center", width: "300px" }}>
            <h3 style={{ marginBottom: "1rem" }}>Confirm Delete</h3>
            <p>Are you sure you want to delete <strong>{userToDelete?.username}</strong>?</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
              <button
                onClick={handleDeleteUser}
                style={{
                  backgroundColor: "#FF4B5C",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                style={{
                  backgroundColor: "#4C89F2",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
