// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// Contexts
import { chamberMessages } from '../lang/messages/user';

// CSS and Assets
import '../style/Chamber.css';

// API
import { API_BASE } from '../api_constants';
import { useAuth } from '../authentication/AuthContext';

function Chamber() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/")
        }
    })

    const [yaps, setYaps] = useState([]);

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

    return (
        <div className="homepage-container yaps-grid">
            <h1>{chamberMessages.yappingChamber}</h1>
            {/* <p>{chamberMessages.comingSoon}</p> */}
            {yaps.map((yap) => (
                <Link key={yap._id} to={`/chamber/${yap._id}`} className="yap-title">
                    {yap.title}
                </Link>
            ))}
        </div>
    );
}

export default Chamber;
