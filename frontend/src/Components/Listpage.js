import '../App.css'
import { useContext } from 'react';
import Context from '../Context';
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom'

import Header from './Header'

function Listpage() {
    const { itemData } = useContext(Context);
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

    return (
        <div className="ListPage" >
            <div className='ListHeader'><Header /></div>
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

export default Listpage;