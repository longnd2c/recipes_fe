import './App.css';
import Home from './components/Home'
import DetailRecipe from './components/DetailRecipe'
import { Routes, Route, useNavigate } from "react-router-dom";
import logo from './logo.png'; 
import { useEffect, useState } from 'react';

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;
  const isTablet = width <= 1281;
  return (
    <div>
      <div className='my-8'>
        <div></div>
        <div className='flex justify-center items-center cursor-pointer' onClick={() => {navigate('/'); window.location.reload()}}>
          <img src={logo} className='w-10 mr-2 mb-2'></img>
          <p className="text-4xl font-semibold" style={{color: "tomato"}}>recipes</p>
        </div>
        <div></div>
      </div>
      <Routes>
        <Route path="/" exact element={<Home isMobile={isMobile} isTablet={isTablet}/>} />
        <Route path="/recipe/:slug" element={<DetailRecipe isMobile={isMobile} isTablet={isTablet}/>} />
      </Routes>
    </div>
    
  );
}

export default App;
