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
  let [endpointStats, setEndpointStats] = useState([]);
  let [loading, setLoading] = useState(true);
  let [userStats, setUserStats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ret = await axios.get(`${API_BASE}/admin/users`);
      setLoading(false);
      setUsers(ret.data);

      // fetching endpoint usage stats
      const endpointStatsRes = await axios.get(`${API_BASE}/admin/api-usage-stats`);
      setEndpointStats(endpointStatsRes.data);
      setLoading(false);

      // fetching endpoint individual user stats
      const { data } = await axios.get(`${API_BASE}/admin/api-usage-stats-per-user`, { withCredentials: true });
        setUserStats(data);
        setLoading(false);
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
      <h2 style={{marginTop: "40px"}}>YapPad Model Service Consumption per User</h2>
<br></br><br></br>
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
        <br></br>  <br></br>  <br></br> 

    {/* Endpoint Usage Stats Per Individual User Table */}
      <h2 style={{marginTop: "40px"}}>API Usage Stats Per User</h2>
      <br></br>  <br></br>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Total # Requests</th>
          </tr>
        </thead>
        <tbody>
          {userStats.map((userStat) => (
            <tr key={userStat.email}>
              <td>{userStat.username}</td>
              <td>{userStat.email}</td>
              <td>{userStat.totalRequests}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br><br></br><br></br>
       {/* Endpoint Usage Stats Table */}
       <h2 style={{marginTop: "40px"}}>Endpoint Usage Stats</h2>
       <br></br><br></br>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Requests</th>
            </tr>
          </thead>
          <tbody>
            {endpointStats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.method}</td>
                <td>{stat.endpoint}</td>
                <td>{stat.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br><br></br><br></br>
      </div>
    </div>
    
  );
  
}