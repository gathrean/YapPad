// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Contexts
import { chamberMessages } from '../lang/messages/user';

// CSS and Assets
import '../style/Chamber.css';

// API
import { API_BASE } from '../api_constants';

function Chamber() {
  const [yaps, setYaps] = useState([]);
  const [editingId, setEditingId] = useState(null); // track which yap is being edited
  const [editFormData, setEditFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchYaps = async () => {
      try {
        const response = await axios.get(`${API_BASE}/yaps/saved`, { withCredentials: true });
        setYaps(response.data);
      } catch (error) {
        console.error(chamberMessages.fetchError, error);
      }
    };

    fetchYaps();
  }, []);


  // deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/yaps/delete/${id}`, { withCredentials: true });
      const updatedYaps = yaps.filter(yap => yap._id !== id);
      setYaps(updatedYaps);
    } catch (error) {
      console.error(chamberMessages.deleteError, error);
    }
  };


  const startEdit = (yap) => {
    setEditingId(yap._id);
    setEditFormData({ title: yap.title, content: yap.content });
  };

  const handleEditChange = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  const saveEdit = async (id) => {
    try {
      const url = `${API_BASE}/yaps/update/${id}`;
      await axios.put(url, editFormData, { withCredentials: true });

      const updatedYaps = yaps.map(yap => yap._id === id ? { ...yap, ...editFormData } : yap);
      setYaps(updatedYaps);
      setEditingId(null); // leave editing mode
    } catch (error) {
      console.error('Failed to update Yap:', error);
    }
  };


  return (
    <div className="homepage-container">
      <h1>{chamberMessages.yappingChamber}</h1>
      <div className='yaps-grid'>
        {yaps.map((yap) => (
          <div key={yap._id} className="yap-item">
            {editingId === yap._id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                />
                <button onClick={() => saveEdit(yap._id)} className="save-button">Save</button>
              </>
            ) : (
              <>
                <Link to={`/chamber/${yap._id}`} className="yap-title">
                  {yap.title}
                </Link>
                <button onClick={() => startEdit(yap)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(yap._id)} className="delete-button">Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chamber;