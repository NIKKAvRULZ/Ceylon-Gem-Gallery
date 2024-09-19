import React,{useState,useEffect} from "react";
import axios from "axios";
import GemCutCard from './GemCutCard'

const GemList = () => {
    const [gemCut, setGemCuts] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3000/api/cuts').then(res => {
            setGemCuts(res.data);
            console.log(res.data);
        }).catch(()=>{
            console.log('Error fetching gem cuts');
        });
    },[]);

    const gemCutList = gemCut.list === 0? "No gem cuts found !" : gemCut.map((gemCut,index)=>(<GemCutCard/>));


  return (
    <div>
        <div className="show_gemCutList">
            <div className="container">
                <div className="list">
                    {gemCutList}
                </div>

            </div>
        </div>
    </div>
  )
}

export default GemList
