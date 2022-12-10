import '../App.css'
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import Context from '../Context';

import Headerhome from './Headerhome';

function Home() {
    const { setCurrentUser, userData , setShowAll} = useContext(Context);
    let navigate = useNavigate();
    let userbox = "";
    let passwordbox = "";

    //navigates to list page if logged in
    useEffect(() => {
        if (document.cookie !== "" && document.cookie !=="userloggedin=") navigate('/list')
    }, [])

    //cookie expiration set up
    var expiry = new Date();
    expiry.setHours(24,0,0,0)
    let expires = 'expires=' + expiry.toUTCString();

    //log in function once log in button is pressed --------------------------------
    function logOnAttempt() {
        let data = {
            "username": userbox.toUpperCase(),
            "password": passwordbox
        }
        if (userbox.length === 0 || passwordbox.length === 0) {
            alert("Please enter a username and password");
            return false;
        }
        fetch('http://localhost:8081/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    let user = userData.find(user => user.username.toUpperCase() === userbox.toUpperCase())
                    setCurrentUser(user);
                    document.cookie = `userloggedin=${user.id}`+ expires;

                    setShowAll(false);
                    navigate('/list');
                }
                else {
                    alert("Invalid username or password");
                    return false;
                }
            });
    }
    //-----------------------------------------------------------------------------

    function showPassword() {
        var x = document.getElementById("passwordbox");
        if (x.type === "password") x.type = "text";
        else x.type = "password";
    }

    return (
        <div className="Home" >
            <Headerhome />
            <div>
                <h3>Sign In</h3>
                <div><input className="search-field" type="text" id="userbox" placeholder="Username" title="Search" onChange= {(e)=>{userbox = e.target.value}}/></div>
                <div><input className="search-field" type="password" id="passwordbox" placeholder="Password" title="Search" onChange= {(e)=>{passwordbox = e.target.value}}/></div>
                <div><input type="checkbox" id="showpassword" onClick={showPassword}></input>Show Password</div>
                <button className="loginButton" type="button" onClick={() => logOnAttempt()}>Log In</button>
                <div><br></br></div>
                <h4>OR</h4>
                <button className="loginButton" type="button" onClick={() => navigate('/list')}>View all items</button>
                <button className="createaccountButton" type="button" onClick={() => navigate('/signup')}>Create an account</button>
            </div>
        </div>
    )
}

export default Home;