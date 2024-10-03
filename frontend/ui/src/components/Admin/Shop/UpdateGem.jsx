import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateGem() {
    const [gem, setGem] = useState({
      name: '',
      description: '',
      cut: '',
      shape: '',
      facets: '',
      proportions: '',
      appearance: '',
      price: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState();
    useEffect(() => {
        axios
       .get(`http://localhost:3000/api/gemShop/${id}`)
       .then((res) => {
         setGem({
            name: res.data.name,
            description: res.data.description,
            cut: res.data.cut,
            shape: res.data.Shape,
            facets: res.data.Facets,
            proportions: res.data.Proportions,
            appearance: res.data.Appearance,
            price: res.data.price,
         });
       })
       .catch((err) => {
        console.log("Error from Update Gem", err);
       });
    },[id]);
    const onChange = (e) => {
        setGem({ ...gem, [e.target.name]: e.target.value });
      };
      const onSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', gem.name);
        formData.append('description', gem.description);
        formData.append('imageUrl', image); // Append the image file
        formData.append('cut', gem.cut);
        formData.append('Shape', gem.shape);
        formData.append('Facets', gem.facets);
        formData.append('Proportions', gem.proportions);
        formData.append('Appearance', gem.appearance);
        formData.append('price', gem.price);  
    
        axios
          .put(`http://localhost:3000/api/gemShop/${id}`, formData)
          .then((res) => {
            console.log("Gem updated successfully");
            navigate('/Admin/AdminShopHome/AdminGemList');
          })
          .catch((err) => {
            console.log("Error from Update Gem", err);
          });
      };
  return (
      <div className="Admin-container">
      <div className="Admin-card">
        <h2 className="Admin-card-title">Update Gem</h2>
        <br />
        <form className="form" onSubmit={onSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="cutName" className="label">Gem Name:</label>
            <input
              type="text"
              id="gemName"
              name="name"
              value={gem.name}
              required
              className="input"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cutDescription" className="label">Gem Description:</label>
            <textarea
              id="gemDescription"
              name="description"
              value={gem.description}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="emCut" className="label">Gem Cut:</label>
            <textarea
              id="gemcut"
              name="gemcut"
              value={gem.cut}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutImage" className="label">Gem Image URL:</label>
            <input
              type="file"
              id="gemImage"
              accept="image/png, image/jpeg"
              name="imageUrl"
              required
              className="input"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cutShape" className="label">Gem Shape:</label>
            <textarea
              id="gemShape"
              name="shape"
              value={gem.shape}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutFacets" className="label">Gem Facets:</label>
            <textarea
              id="gemFacets"
              name="facets"
              value={gem.facets}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutProportions" className="label">Gem Proportions:</label>
            <textarea
              id="gemProportions"
              name="proportions"
              value={gem.proportions}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutAppearance" className="label">Gem Appearance:</label>
            <textarea
              id="gemAppearance"
              name="appearance"
              value={gem.appearance}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price" className="label">Gem Price:</label>
            <input  type="number"
              id="gemPrice"
              name="price"
              value={gem.price}
              required
              className="textarea"
              onChange={onChange}
            />
          </div>
          
          <div>
            <button type="submit" className="submit-button">Update Gem</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateGem;
