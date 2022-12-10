import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Context from './Context';
import cookie from 'cookie';

import Home from './Components/Home';
import Listpage from './Components/Listpage';
import Detailspage from './Components/Detailspage';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import Listpageadd from './Components/Listpageadd';

function App() {
  const [showAll, setShowAll] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

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

  useEffect(() => {
    let cookies = cookie.parse(document.cookie)
    console.log("document cookie: ",document.cookie)
    console.log("cookies", cookies)
    if (cookies != undefined) {
      setCurrentUser(userData.find(user => user.id === parseInt(cookies.userloggedin)))
    }
  }, [userData])

  return (
    <div className="App">
      <Context.Provider value={{ showAll, setShowAll, itemData, userData, currentUser, setCurrentUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<Listpage />} />
            <Route path="/list/add" element={<Listpageadd />} />
            <Route path="/details/:id" element={<Detailspage />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
