import React,{useState,useEffect} from "react";
import axios from "axios";
import AdminGemCutCard from './AdminGemCutCard'
import './AdminGemCutList.css'

const AdminGemCutList = () => {
    const [AdminGemCut, setAdminGemCuts] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3000/api/cuts').then(res => {
            setAdminGemCuts(res.data);
            console.log(res.data);
        }).catch(()=>{
            console.log('Error fetching gem cuts');
        });
    },[]);

    const AdminGemCutList = AdminGemCut.list === 0? "No gem cuts found !" 
    : AdminGemCut.map((AdminGemCut,index)=>(<AdminGemCutCard key={index} AdminGemCut={AdminGemCut}/>));


  return (
    <div className="show_GemCutList">
        <div className="container">
            <div className="list">
                {AdminGemCutList}
            </div>
        </div>
    </div> 
  )
}

export default AdminGemCutList
