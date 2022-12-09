import '../App.css'
// import { useContext } from 'react';
// import Context from '../Context';

function Listpagecard( {name, description, quantity} ) {
    // const {  } = useContext(Context);

    return (
        <div className="Listpagecard" >
            <div>Name: {name}</div>
            <div>Description: {description}</div>
            <div>Quantity: {quantity} </div>
            <div><br></br></div>
        </div>
    )
}

export default Listpagecard;