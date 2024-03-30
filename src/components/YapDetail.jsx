import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            {yap && (
                <>
                    <h1>{yap.title}</h1>
                    <p>{yap.content}</p>
                </>
            )}
        </div>
    );
}

export default YapDetail;
