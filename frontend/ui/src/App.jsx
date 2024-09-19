import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar';
import Footer from './components/Footer';
import GemList from './components/GemList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <Navbar/>
        <GemList/>
        <br/>
        <Footer/>
    </div>
  );
}

export default App
