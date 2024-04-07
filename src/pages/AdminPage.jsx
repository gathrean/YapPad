// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";

// Contexts
import { adminPageMessages } from "../lang/messages/user";

// CSS and Assets
import { API_BASE } from "../api_constants";
import styles from "../style/AdminPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";

export default function AdminPage() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth()

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      navigate("/")
    }
  })

  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const ret = await axios.get(`${API_BASE}/admin/users`);
      setLoading(false);
      setUsers(ret.data);
    }

    fetchData();
  }, []);

  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: '0 20px'
    }}>
      {adminPageMessages.loadingText}
    </div>
  );

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{adminPageMessages.tableHeaders.username}</th>
              <th>{adminPageMessages.tableHeaders.email}</th>
              <th>{adminPageMessages.tableHeaders.apiCalls}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.consumption || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
