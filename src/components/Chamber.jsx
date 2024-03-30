import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Chamber.css'; 


function Chamber() {
    const [yaps, setYaps] = useState([]);

    useEffect(() => {
        const fetchYaps = async () => {
            try {
                const response = await axios.get('http://localhost:8000/yaps/saved', { withCredentials: true });
                setYaps(response.data);
            } catch (error) {
                console.error('Error fetching yaps:', error);
            }
        };

        fetchYaps();
    }, []);

    return (
        <div className="yaps-grid">
            {yaps.map((yap) => (
                <Link key={yap._id} to={`/chamber/${yap._id}`} className="yap-title">
                    {yap.title}
                </Link>
            ))}
        </div>
    );
}

export default Chamber;
