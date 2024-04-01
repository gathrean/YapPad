/// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Chamber.css';
import { chamberMessages } from '../lang/messages/user';

function Chamber() {
    const [yaps, setYaps] = useState([]);

    useEffect(() => {
        const fetchYaps = async () => {
            try {
                const response = await axios.get('http://localhost:8000/yaps/saved', { withCredentials: true });
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
            <p>{chamberMessages.comingSoon}</p>
            {yaps.map((yap) => (
                <Link key={yap._id} to={`/chamber/${yap._id}`} className="yap-title">
                    {yap.title}
                </Link>
            ))}
        </div>
    );
}

export default Chamber;
