import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateGemCut() {
  const [GemCut, setGemCut] = useState({
    name: '',
    description: '',
    shape: '',
    facets: '',
    proportions: '',
    appearance: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState();


  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`http://localhost:3000/api/cuts/${id}`)
      .then((res) => {
        setGemCut({
          name: res.data.name,
          description: res.data.description,
          shape: res.data.Shape,
          facets: res.data.Facets,
          proportions: res.data.Proportions,
          appearance: res.data.Appearance,
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

    const formData = new FormData();
    formData.append('name', GemCut.name);
    formData.append('description', GemCut.description);
    formData.append('imageUrl', image); // Append the image file
    formData.append('Shape', GemCut.shape);
    formData.append('Facets', GemCut.facets);
    formData.append('Proportions', GemCut.proportions);
    formData.append('Appearance', GemCut.appearance);


    axios
      .put(`http://localhost:3000/api/cuts/${id}`, formData)
      .then((res) => {
        console.log("Gem Cut updated successfully");
        navigate('/admin/AdminGemCutHome/AdminGemCutList');
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
        <form className="form" onSubmit={onSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="cutName" className="label">Cut Name:</label>
            <input
              type="text"
              id="cutName"
              name="name"
              value={GemCut.name}
              required
              className="input"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cutDescription" className="label">Cut Description:</label>
            <textarea
              id="cutDescription"
              name="description"
              value={GemCut.description}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutImage" className="label">Cut Image URL:</label>
            <input
              type="file"
              id="cutImage"
              accept="image/png, image/jpeg"
              name="imageUrl"
              required
              className="input"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cutShape" className="label">Cut Shape:</label>
            <textarea
              id="cutShape"
              name="shape"
              value={GemCut.shape}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutFacets" className="label">Cut Facets:</label>
            <textarea
              id="cutFacets"
              name="facets"
              value={GemCut.facets}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutProportions" className="label">Cut Proportions:</label>
            <textarea
              id="cutProportions"
              name="proportions"
              value={GemCut.proportions}
              required
              className="textarea"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutAppearance" className="label">Cut Appearance:</label>
            <textarea
              id="cutAppearance"
              name="appearance"
              value={GemCut.appearance}
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
