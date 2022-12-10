import '../App.css'
import { Link } from 'react-router-dom'
// import { useContext } from 'react'
// import Context from '../Context';


function Headerguest() {

    return (
        <div className="Header" >
            <div className="column left">
                <Link to='/' className="link">
                    <h4>Home</h4>
                </Link>
            </div>
            <div className="column middle">
                <h1>Inventory Manager !</h1>
            </div>
            <div className="column right">
            </div>
        </div>
    )
}

export default Headerguest;