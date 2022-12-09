import '../App.css'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import Context from '../Context';

import Headerhome from './Headerhome';

function Home() {
    const { setShowAll } = useContext(Context);
    let navigate = useNavigate();
    let userbox = "";
    let passwordbox = "";

    function guestContinue() {
        setShowAll(true);
        navigate('/list');
    }

    function logOnAttempt() {

    }

    return (
        <div className="Home" >
            <Headerhome />
            <div>
                <h3>Sign In</h3>
                <div><input className="search-field" type="text" id="userbox" placeholder="Username" title="Search" onChange= {(e)=>{userbox = e.target.value}}/></div>
                <div><input className="search-field" type="text" id="passwordbox" placeholder="Password" title="Search" onChange= {(e)=>{passwordbox = e.target.value}}/></div>
                <button className="loginButton" type="button" onClick={() => navigate('/list')}>Log In</button>
                <div><br></br></div>
                <h4>OR</h4>
                <button className="loginButton" type="button" onClick={() => guestContinue()}>View all items</button>
            </div>
        </div>
    )
}

export default Home;