import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './UpdatePostCut.css';


const URL = "http://localhost:3000/api/postcut";

function UpdatePostCut() {
  const { id } = useParams(); // Get gem ID from the URL params
  const navigate = useNavigate();
  
  const [postCutGem, setPostCutGem] = useState({
    cutType: "",
    weight: "",
    polish: "",
    price: "",
    description:"",
    image: null
  });

  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    // Fetch existing gem data by ID
    axios.get(`${URL}/${id}`)
      .then((response) => {
        const data = response.data.postCutGem;
        setPostCutGem({
            cutType: data.cutType,
          weight: data.weight,
          polish: data.polish,
          price: data.price,
          description: data.description
        });
        setExistingImage(data.image); // Store the existing image URL
      })
      .catch((error) => console.error("Error fetching gem data:", error));
  }, [id]);

  const handleInputChange = (e) => {
    setPostCutGem({ ...postCutGem, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPostCutGem({ ...postCutGem, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cutType", postCutGem.cutType);
    formData.append("weight", postCutGem.weight);
    formData.append("polish", postCutGem.polish);
    formData.append("price", postCutGem.price);
    formData.append("description", postCutGem.description);

    if (postCutGem.image) {
      formData.append("image", postCutGem.image); // Append new image only if selected
    }

    try {
      await axios.put(`${URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/Admin/validation-details/"); // Redirect back to the gem list after update
    } catch (error) {
      console.error("Error updating post-cut gem:", error);
    }
  };

  return (
    <div className="update-postcut-container">
      <h2>Update Post-Cut Gem</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Cut Type:</label>
          <input
            type="text"
            name="cutType"
            value={postCutGem.cutType}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Weight (g):</label>
          <input
            type="number"
            name="weight"
            value={postCutGem.weight}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Polish:</label>
          <input
            type="text"
            name="polish"
            value={postCutGem.polish}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={postCutGem.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={postCutGem.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleFileChange} />
          {existingImage && (
            <div>
              <p>Current Image:</p>
              <img
                src={`http://localhost:3000/${existingImage}`}
                alt="Gem"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <button type="submit">Update Gem</button>
      </form>
    </div>
  );
}

export default UpdatePostCut;
