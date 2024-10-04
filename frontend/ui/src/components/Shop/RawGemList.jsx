import React, { useState, useEffect } from "react";
import axios from "axios";
import RawGemCard from "./RawGemCard";

const RawGemList = () => {
    const [gems, setGems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/api/gemShop')
            .then(res => {
                if (res.data) {
                    setGems(res.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching gems:', error);
            });
    }, []);

    const filteredGems = gems.filter(gem =>
        gem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const gemList = filteredGems.length === 0 
    ? <div className="no-gems-found">No gems found!</div> 
    : filteredGems.map((gem, index) => (
        <RawGemCard key={index} gem={gem} />
    ));

    return (
        <div className="show_GemList">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="list-container">
                <div className="list">
                    {gemList}
                </div>
            </div>
        </div>
    );
}

export default RawGemList;
