import './App.css';
import api from './api/axiosConfig'
import { useState, useEffect } from 'react';
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/page/Home';
import Dictation from './components/dictation/page/Dictation';
import Dictations from './components/list-dictations/page/Dictations';
import Header from './components/shared/header/Header'
import Profile from './components/profile/page/Profile'; 
import NotFound from './components/shared/not-found/NotFound';
import { getSlider } from './api/routes';
import Footer from './components/shared/footer/Footer';
function App() {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await getSlider();
        console.log(response)
        setSlider(response.data);
      } catch (error) {
        console.error('Error fetching dictations:', error);
      }
    }
    fetchSlider();
  }, []);

  //debug
  useEffect(() => {
    console.log(slider); // Side effect after dictations state update
  }, [slider]); // Run this effect whenever the dictations state changes


  return (
    <div className="App"> 
    
      <Header/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path="*" element={<NotFound />} />
          <Route path='/' element={<Home slider={slider} />}></Route>
          <Route path="/dictation/:id" element={<Dictation/>} />
          <Route path="/dictations/" element={<Dictations/>} />
          <Route path="/profile/" element={<Profile/>} />
        </Route>
      </Routes>
      <Footer/>
      
    </div>
  );
}

export default App;
