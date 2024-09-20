import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import axios from 'axios';
import './ShowGemCutDetails.css'

function ShowGemCutDetails() {
  const [gemCut, setGemCut] = useState({});
  const { id } = useParams(); 

  useEffect(() => {
    axios.get(`http://localhost:3000/api/cuts/${id}`)
      .then((res) => {
        setGemCut(res.data);
      })
      .catch((error) => {
        console.log("Error getting gem cuts");
      });
  }, [id]);

  const TableItem = (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <td colSpan="2" className="text-center">
              <img src={gemCut.imageUrl} alt={gemCut.name}/>
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{gemCut.name}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td className="description-text">{gemCut.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="showGemCutDetails">
      <div className="col-md-8 m-auto">
        <h1 className="title">Gem Cut Details</h1>
        <p className="subHead">This is the full detail of {gemCut.name}</p>
        <hr />
      </div>

      <div className="col-md-10 m-auto">{TableItem}</div>

      <div className="col-md-10 m-auto">
        <br />
        <Link to={"/GemCutHome/CustomCut"} className="btn btn-outline-danger float-right">Back</Link>
        <Link to={"/GemCutHome/CustomCut"} className="btn btn-outline-choose float-right">Use This Cut</Link>
      </div>
    </div>
  );
}

export default ShowGemCutDetails;
