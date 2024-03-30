import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/Chamber.css';

function YapDetail() {
    const [yap, setYap] = useState(null);
    const { id } = useParams(); // extract yap ID from URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchYap = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/yaps/${id}`, { withCredentials: true });
                setYap(response.data);
            } catch (error) {
                console.error('Error fetching yap:', error);
            }
        };

        fetchYap();
    }, [id]);

    return (
        <div className="yap-detail-container">
            <button onClick={() => navigate(-1)}>Back to Yapping Chamber</button>
            {yap ? (
                <>
                    <h1 className="yap-detail-title">{yap.title}</h1>
                    <p className="yap-detail-content">{yap.content}</p>
                </>
            ) : (
                <p>Loading yap...</p>
            )}
        </div>
    );
}

export default YapDetail;