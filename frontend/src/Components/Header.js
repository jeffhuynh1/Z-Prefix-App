import '../App.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
// import { useContext } from 'react';
// import Context from '../Context';

function Header() {
    // const {  } = useContext(Context);

    return (
        <div className="Header" >
            <div className="column left">
                <Link to='/' className="link">
                    <h4>Home</h4>
                </Link>
            </div>
            <div className="column middle">
                <Link to='/list' className="link">
                    <h1>Inventory Manager !</h1>
                </Link>
            </div>
            <div className="column right"></div>
        </div>
    )
}

export default Header;