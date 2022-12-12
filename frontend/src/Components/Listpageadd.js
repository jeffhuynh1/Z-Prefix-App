import '../App.css'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import Context from '../Context';

import Header from './Header';

function Listpageadd() {
    const { currentUser , ApiUrlState} = useContext(Context);
    let navigate = useNavigate();

    let item_name = "";
    let description = "";
    let quantity = 0;

    function handleSubmit() {
        let data = {
            "user_id": currentUser.id,
            "item_name": item_name,
            "description": description,
            "quantity": quantity
        }
        console.log("data", data)

        if (item_name.length === 0 || description.length === 0 || quantity.length === 0) {
            alert("Please complete all entries");
            return false;
        }
        if (quantity < 1 || isNaN(quantity) || quantity % 1 !== 0) {
            alert("Please enter a valid number for quantity");
            return false;
        }
        fetch(ApiUrlState + '/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(res => console.log(res));
        navigate('/list');
        window.location.reload();
    }

    return (
        <div className="Signup" >
             {currentUser !== undefined ? <Header /> : <></>}
            <div>
                <h3>Add an item</h3>
                <div><input className="search-field" type="text" id="namebox" placeholder="Item name" title="Search" onChange={(e) => { item_name = e.target.value }} /></div>
                <div><input className="search-field" type="text" id="descriptionbox" placeholder="Description" title="Search" onChange={(e) => { description = e.target.value }} /></div>
                <div><input className="search-field" type="text" id="quantitybox" placeholder="Quantity" title="Search" onChange={(e) => { quantity = Number(e.target.value) }} /></div>
                <button className="signupButton" type="button" onClick={() => handleSubmit()}>Add item</button>
                <div><br></br></div>
                <button className="homeButton" type="button" onClick={() => navigate('/list')}>Back to list</button>
            </div>
        </div>
    )
}

export default Listpageadd;