// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

// React and Libraries
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Contexts
import { yapDetailPageMessages } from '../lang/messages/user';

// CSS and Assets
import '../style/Chamber.css';

// API
import axios from 'axios';
import { API_BASE } from '../api_constants';

function YapDetail() {
    const [yap, setYap] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchYap = async () => {
            try {
                const response = await axios.get(`${API_BASE}/yaps/${id}`, { withCredentials: true });
                setYap(response.data);
            } catch (error) {
                console.error('Error fetching yap:', error);
            }
        };

        fetchYap();
    }, [id]);

    return (
        <div className="yap-detail-container">
            <button className="yap-detail-button" onClick={() => navigate(-1)}>{yapDetailPageMessages.backToYappingChamberButton}</button>
            {yap ? (
                <>
                    <h1 className="yap-detail-title">{yap.title}</h1>
                    <p className="yap-detail-content">{yap.content}</p>
                </>
            ) : (
                <p>{yapDetailPageMessages.loadingYapMessage}</p>
            )}
        </div>
    );
}

export default YapDetail;
