import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateGemCut() {
  const [GemCut, setGemCut] = useState({
    name: "",
    description: "",
    imageUrl: "",
    specifications: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`http://localhost:3000/api/cuts/${id}`)
      .then((res) => {
        setGemCut({
          name: res.data.name || "",
          description: res.data.description || "",
          imageUrl: res.data.imageUrl || "",
          specifications: res.data.specifications || "",
        });
      })
      .catch((err) => {
        console.log("Error from Update Gem Cut", err);
      });
  }, [id]);

  const onChange = (e) => {
    setGemCut({ ...GemCut, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: GemCut.name,
      description: GemCut.description,
      imageUrl: GemCut.imageUrl,
      specifications: GemCut.specifications,
    };

    axios
      .put(`http://localhost:3000/api/cuts/${id}`, data)
      .then((res) => {
        console.log("Gem Cut updated successfully");
        navigate('/AdminGemCutHome/AdminGemCutList');
      })
      .catch((err) => {
        console.log("Error from Update Gem Cut", err);
      });
  };

  // Render form only when the GemCut data is available
  return (
    <div className="Admin-container">
      <div className="Admin-card">
        <h2 className="Admin-card-title">Update Gem Cut</h2>
        <br />
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="label">Cut Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={GemCut.name}
              required
              className="input"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="label">Cut Description:</label>
            <textarea
              id="description"
              name="description"
              value={GemCut.description}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl" className="label">Cut Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={GemCut.imageUrl}
              required
              className="input"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="specifications" className="label">Cut Specifications:</label>
            <textarea
              id="specifications"
              name="specifications"
              value={GemCut.specifications}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div>
            <button type="submit" className="submit-button">Update Cut</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateGemCut;
