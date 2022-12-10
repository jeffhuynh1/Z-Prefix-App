import '../App.css'
import { useContext } from 'react';
import { useParams, Link } from "react-router-dom"
import Context from '../Context';


import Header from './Header'
import Headerguest from './Headerguest'

function Detailspage() {
    const { currentUser, itemData } = useContext(Context);
    const { id } = useParams();
    let item = itemData.find(item => item.id === parseInt(id))


    if (document.cookie !== "" && document.cookie !== "userloggedin=") {
        if (currentUser === undefined) {
            return <>Loading...</>
        }
        else return (
            <div className="Detailspage" >
                {itemData.length === 0 ? <div>Loading</div> : <>
                    {(document.cookie !== "" && document.cookie !== "userloggedin=") ? <Header /> : <Headerguest />}
                    <div>
                        <Link to='/list' className="detailspagelink">
                            <h4>back to list</h4>
                        </Link>
                        <h1>{item.item_name}</h1>
                        <h4>Quantity: {item.quantity}</h4>
                        <br />
                        <div className='description'>{item.description}</div>
                    </div>
                </>}
            </div>
        )
    }
    else return (
        <div className="Detailspage" >
            {itemData.length === 0 ? <div>Loading</div> : <>
                {(document.cookie !== "" && document.cookie !== "userloggedin=") ? <Header /> : <Headerguest />}
                <div>
                    <Link to='/list' className="detailspagelink">
                        <h4>back to list</h4>
                    </Link>
                    <h1>{item.item_name}</h1>
                    <h4>Quantity: {item.quantity}</h4>
                    <br />
                    <div className='description'>{item.description}</div>
                </div>
            </>}
        </div>
    )
}

export default Detailspage;