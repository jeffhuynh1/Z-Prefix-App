import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Context from './Context';

import Home from './Components/Home';
import Listpage from './Components/Listpage';
import Detailspage from './Components/Detailspage';
import Footer from './Components/Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/items')
      .then((res) => res.json())
      .then((data) => {
        setItemData(data)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:8081/users')
      .then((res) => res.json())
      .then((data) => {
        setUserData(data)
      })
  }, [])

  return (
    <div className="App">
      <Context.Provider value={{ loggedIn, setLoggedIn, showAll, setShowAll, itemData , userData }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<Listpage />} />
            <Route path="/details/:id" element={<Detailspage />} />
          </Routes>
          <Footer />
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
