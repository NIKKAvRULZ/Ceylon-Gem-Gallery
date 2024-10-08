import React, { useState, useEffect } from "react";
import axios from "axios";
import GemCutCard from './GemCutCard';
import './GemCutList.css';

const GemCutList = () => {
    const [gemCuts, setGemCuts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/api/cuts')
            .then(res => {
                setGemCuts(res.data);
            })
            .catch(() => {
                console.log('Error fetching gem cuts');
            });
    }, []);

    const filteredGemCuts = gemCuts.filter(gemCut =>
        gemCut.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const gemCutList = filteredGemCuts.length === 0 
    ? <div className="no-gems-found">No gem cuts found!</div> 
    : filteredGemCuts.map((gemCut, index) => (
        <GemCutCard key={index} gemCut={gemCut} />
    ));

    return (
        <div className="show_GemCutList">
            <div className="search-container">
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
                <button className="search-button">Search</button>
            </div>
            <div className="list-container">
                <div className="list">
                    {gemCutList}
                </div>
            </div>
        </div>
    );
}

export default GemCutList;
