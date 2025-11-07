import './App.css';
import { useState, useEffect } from 'react';
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/page/Home';
import Dictation from './components/dictation/Dictation';
import Dictations from './components/list-dictations/page/Dictations';
import Header from './components/shared/header/Header'
import Profile from './components/profile/Profile';
import NotFound from './components/shared/not-found/NotFound';
import { getSlider } from './api/routes';
import Footer from './components/shared/footer/Footer';
import Register from './components/shared/header/Register';
import Login from './components/shared/header/Login';
import About from './components/about/About';
import Support from './components/support/Support';
function App() {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await getSlider();
        //console.log(response)
        setSlider(response.data);
      } catch (error) {
        console.error('Error fetching dictations:', error);
      }
    }
    fetchSlider();
  }, []);

  //debug
  useEffect(() => {
    //console.log(slider); // Side effect after dictations state update
  }, [slider]); // Run this effect whenever the dictations state changes


  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="*" element={<NotFound />} />
          <Route path='/' element={<Home slider={slider} />}></Route>
          <Route path="/dictation/:id" element={<Dictation />} />
          <Route path="/dictations/" element={<Dictations />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/support-us" element={<Support />} />
        </Route>
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
