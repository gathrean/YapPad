import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../style/AdminPage.module.css";

export default function AdminPage() {
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const ret = await axios.get(`http://localhost:8000/admin/users`);
      setLoading(false);
      setUsers(ret.data);
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>API Calls</th>
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
