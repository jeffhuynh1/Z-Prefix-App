import '../App.css'
import { useContext } from 'react';
import Context from '../Context';
import { useParams } from "react-router-dom"

import Header from './Header'

function Detailspage() {
const { itemData } = useContext(Context);
const { id } = useParams();
let item = itemData.find(item => item.id === parseInt(id))

    return (
        <div className="Detailspage" >
            <Header />
            <div>
                <h1>{item.item_name}</h1>
                <h4>Quantity: {item.quantity}</h4>
                <br />
                <div className='description'>{item.description}</div>
            </div>
        </div>
    )
}

export default Detailspage;