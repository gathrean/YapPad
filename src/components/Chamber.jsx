import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div>
            <h1>Yapping Chamber</h1>
            {yaps.map((yap, index) => (
                <div key={index}>
                    <h2>{yap.title}</h2>
                    <p>{yap.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Chamber;
