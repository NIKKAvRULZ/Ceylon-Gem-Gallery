import React,{useState,useEffect} from "react";
import axios from "axios";
import GemCutCard from './GemCutCard'
import './GemCutList.css'

const GemCutList = () => {
    const [gemCut, setGemCuts] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3000/api/cuts').then(res => {
            setGemCuts(res.data);
            console.log(res.data);
        }).catch(()=>{
            console.log('Error fetching gem cuts');
        });
    },[]);

    const gemCutList = gemCut.list === 0? "No gem cuts found !" 
    : gemCut.map((gemCut,index)=>(<GemCutCard key={index} gemCut={gemCut}/>));


  return (
    <div className="show_GemCutList">
        <div className="list-container">
            <div className="list">
                {gemCutList}
            </div>
        </div>
    </div> 
  )
}

export default GemCutList
