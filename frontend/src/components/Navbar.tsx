import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar bg-primary main-nav">
        <Link to="/" className="nav-logo-text">
            <h4>MovieFlix</h4>
        </Link>
        <button className="btn btn-primary btn-logout">
            <h6>SAIR</h6>
        </button>
    </nav>
    );
}

export default Navbar;