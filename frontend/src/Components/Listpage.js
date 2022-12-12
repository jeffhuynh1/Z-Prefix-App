import '../App.css'
import { useContext, useState } from 'react';
import Context from '../Context';
import { useNavigate } from "react-router-dom";

import Header from './Header'
import Headerguest from './Headerguest'

function Listpage() {
    const { itemData, currentUser, showAll, setShowAll, ApiUrlState } = useContext(Context);
    let navigate = useNavigate();

    //shortens strings longer than 100 characters
    function shorten(str) {
        if (str.length > 100) {
            return (str.slice(0, 100) + '...');
        }
        else return (str);
    }

    //creates row for each GUEST item
    const itemList = itemData.map((item) =>
        <tr key={item.id} onClick={() => navigate(`/details/${item.id}`)}>
            <td>{item.item_name}</td>
            <td>{shorten(item.description)}</td>
            <td>{item.quantity}</td>
        </tr>
    )

    //  ----------------------edit functionality -------------------------//

    let editTarget = -1;
    const [editMode, setEditMode] = useState(false);

    // sets edit target
    function handleClickNavigate(Id, userItemdata) {
        if (!editMode) navigate(`/details/${Id}`)
        else if (editTarget === -1) {
            editTarget = Id
            let elem_name = document.getElementById(`name_${Id}`)
            let elem_description = document.getElementById(`description_${Id}`)
            let elem_quantity = document.getElementById(`quantity_${Id}`)
            elem_name.style.color = "red"
            elem_name.style.fontStyle = "italic"
            elem_description.style.color = "red"
            elem_description.style.fontStyle = "italic"
            elem_quantity.style.color = "red"
            elem_quantity.style.fontStyle = "italic"
            for (let i = 0; i < userItemdata.length; i++) {
                if (parseInt(userItemdata[i].key) !== Id) {
                    let elem_name = document.getElementById(`name_${userItemdata[i].key}`)
                    let elem_description = document.getElementById(`description_${userItemdata[i].key}`)
                    let elem_quantity = document.getElementById(`quantity_${userItemdata[i].key}`)
                    elem_name.setAttribute("contentEditable", false);
                    elem_description.setAttribute("contentEditable", false);
                    elem_quantity.setAttribute("contentEditable", false);
                }
            }
        }
        else return
    }

    // makes items editable
    function handleEdit(Id) {
        if (editMode) {
            let elem_name = document.getElementById(`name_${Id}`)
            let elem_description = document.getElementById(`description_${Id}`)
            let elem_quantity = document.getElementById(`quantity_${Id}`)
            elem_name.setAttribute("contentEditable", true);
            elem_name.setAttribute("suppressContentEditableWarning", true);
            elem_description.setAttribute("contentEditable", true);
            elem_description.setAttribute("suppressContentEditableWarning", true);
            elem_quantity.setAttribute("contentEditable", true);
            elem_quantity.setAttribute("suppressContentEditableWarning", true);
        }
        else return
    }

    function editConfirm() {
        if (editTarget === -1) {
            alert("Please select a target");
            return false;
        }
        let item_name = document.getElementById(`name_${editTarget}`).innerHTML;
        let description = document.getElementById(`description_${editTarget}`).innerHTML;
        let quantity = document.getElementById(`quantity_${editTarget}`).innerHTML;

        let data = {
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
        fetch(ApiUrlState + `/items/${editTarget}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(res => console.log(res));
        window.location.reload();
    }

    function deleteConfirm() {
        if (editTarget === -1) {
            alert("Please select a target");
            return false;
        }
        if (window.confirm(`Delete ${document.getElementById(`name_${editTarget}`).innerHTML}?`)) {
            fetch(ApiUrlState + `/items/${editTarget}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
            })
                .then(res => console.log(res));
            window.location.reload();
        }
        else return
    }

    ///--------------------------------RETURN FUNCTION -----------------------------------//
    ///----------------USER LOGGED IN -------------------//
    if (document.cookie !== "" && document.cookie !== "userloggedin=") {
        if (currentUser === undefined) {
            return <>Loading...</>
        }
        else if (currentUser.id > 0 && !showAll) {
            const userItemdata = itemData.filter(item => item.user_id === currentUser.id);
            const userItemList = userItemdata.map((item) =>
                <tr key={item.id} onClick={() => handleClickNavigate(item.id, userItemList)} onMouseOver={(handleEdit(item.id))}>
                    <td id={`name_${item.id}`}>{item.item_name}</td>
                    <td id={`description_${item.id}`}>{shorten(item.description)}</td>
                    <td id={`quantity_${item.id}`}>{item.quantity}</td>
                </tr>
            )
            //USER items list
            return (
                <div className="ListPage" >
                    <div className='ListHeader'><Header /></div>
                    {!editMode ? <button onClick={() => setShowAll(true)}>show all items</button> : <></>}
                    {!editMode ? <button onClick={() => navigate('/list/add')}>add new item</button> : <></>}
                    {!editMode ? <button onClick={() => setEditMode(true)}>edit items</button> : <></>}
                    {editMode ? <h5>select an item to edit</h5> : <></>}
                    {editMode ? <button onClick={() => window.location.reload()}>cancel</button> : <></>}
                    {editMode ? <button onClick={() => deleteConfirm()}>delete selected item</button> : <></>}
                    {editMode ? <button onClick={() => editConfirm()}>confirm</button> : <></>}
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