import '../App.css'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import Context from '../Context';

import Headerhome from './Headerhome';

function Signup() {
    const { userData, ApiUrlState } = useContext(Context);
    let navigate = useNavigate();
    let first_name = "";
    let last_name = "";
    let userbox = "";
    let passwordbox = "";

    function showPassword() {
        var x = document.getElementById("passwordbox");
        if (x.type === "password") x.type = "text";
        else x.type = "password";
    }

    function handleSubmit() {
        let data = {
            "first_name": first_name,
            "last_name": last_name,
            "username": userbox.toUpperCase(),
            "password": passwordbox
        }
        if (first_name.length === 0 || last_name.length === 0 || userbox.length === 0 || passwordbox.length === 0) {
            alert("Please complete all entries");
            return false;
        }
        if (first_name.length > 15) {
            alert("first name too long :(");
            return false;
        }
        if (last_name.length > 15) {
            alert("last name too long :(");
            return false;
        }
        if (last_name.length > 30) {
            alert("username too long :(");
            return false;
        }
        if (userData.find(user => user.username.toUpperCase() === userbox.toUpperCase()) !== undefined) {
            alert("Username not available");
            return false;
        }
        fetch(ApiUrlState + '/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(res => console.log(res));
        navigate('/');
        window.location.reload();
        alert("Account creation successful");
    }

    return (
        <div className="Signup" >
            <Headerhome />
            <div>
                <h3>Sign Up</h3>
                <div><input className="search-field" type="text" id="firstbox" placeholder="First name" title="Search" onChange={(e) => { first_name = e.target.value }} /></div>
                <div><input className="search-field" type="text" id="lastbox" placeholder="Last name" title="Search" onChange={(e) => { last_name = e.target.value }} /></div>
                <div><input className="search-field" type="text" id="userbox" placeholder="Username" title="Search" onChange={(e) => { userbox = e.target.value }} /></div>
                <div><input className="search-field" type="password" id="passwordbox" placeholder="Password" title="Search" onChange={(e) => { passwordbox = e.target.value }} /></div>
                <div><input type="checkbox" id="showpassword" onClick={showPassword}></input>Show Password</div>
                <button className="signupButton" type="button" onClick={() => handleSubmit()}>Sign up</button>
                <div><br></br></div>
                <button className="homeButton" type="button" onClick={() => navigate('/')}>Back to home</button>
            </div>
        </div>
    )
}

export default Signup;