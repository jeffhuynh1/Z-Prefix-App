import '../App.css'
import { useContext } from 'react';
import Context from '../Context';
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom'

import Header from './Header'
import Headerguest from './Headerguest'

function Listpage() {
    const { itemData, currentUser, showAll, setShowAll } = useContext(Context);
    let navigate = useNavigate();

    //shortens strings longer than 100 characters
    function shorten(str) {
        if (str.length > 100) {
            return (str.slice(0, 100) + '...');
        }
        else return (str);
    }

    //creates row for each item
    const itemList = itemData.map((item) =>
        <tr key={item.id} onClick={() => navigate(`/details/${item.id}`)}>
            <td>{item.item_name}</td>
            <td>{shorten(item.description)}</td>
            <td>{item.quantity}</td>
        </tr>
    )

    ///--------------------------USER LOGGED IN -------------------------------//
    if (document.cookie !== "" && document.cookie !=="userloggedin=") {
        if (currentUser === undefined) {
            return <>Loading...</>
        }
        else if (currentUser.id > 0 && !showAll) {
            const userItemdata = itemData.filter(item => item.user_id === currentUser.id);
            const userItemList = userItemdata.map((item) =>
                <tr key={item.id} onClick={() => navigate(`/details/${item.id}`)}>
                    <td>{item.item_name}</td>
                    <td>{shorten(item.description)}</td>
                    <td>{item.quantity}</td>
                </tr>
            )
            //USER items list
            return (
                <div className="ListPage" >
                    <div className='ListHeader'><Header /></div>
                    <button onClick={() => setShowAll(true)}>show all items</button>
                    <button onClick={() => navigate('/list/add')}>add new item</button>
                    <button onClick={() => null}>edit items</button>
                    <br />
                    <table id="ItemTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>{userItemList}</tbody>
                    </table>
                </div>
            )
        }
        // ALL items list
        else {
            return (
                <div className="ListPage" >
                    <div className='ListHeader'><Header /></div>
                    {currentUser.id > 0 ? <button onClick={() => setShowAll(false)}>show user items</button> : <></>}
                    <br />
                    <table id="ItemTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>{itemList}</tbody>
                    </table>
                </div>
            )
        }
    }
///--------------------------USER NOT LOGGED IN -------------------------------//
    else {
        return (
            <div className="ListPage" >
                <div className='ListHeader'><Headerguest /></div>
                <br />
                <table id="ItemTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>{itemList}</tbody>
                </table>
            </div>
        )
    }
}

export default Listpage;