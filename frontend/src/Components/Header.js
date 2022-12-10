import '../App.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../Context';


function Header() {
    const { currentUser, setCurrentUser } = useContext(Context);
    // const navigate = useNavigate();

    function Logout() {
        setCurrentUser([]);
        document.cookie = "userloggedin=";
    }

    return (
        <div className="Header" >
            <div className="column left">
                <Link to='/' className="link">
                    <h4 onClick={() => Logout()}>Log out</h4>
                </Link>
            </div>
            <div className="column middle">
                <h1>Inventory Manager !</h1>
            </div>
            <div className="column right">
                <h4> Welcome, {currentUser.first_name}</h4>
            </div>
        </div>
    )

}

export default Header;