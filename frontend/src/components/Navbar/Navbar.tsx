import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { getTokenData, isAuthenticated } from '../../util/auth';
import history from '../../util/history';
import { removeAuthData } from '../../util/storage';
import './Navbar.css';

const Navbar = () => {
    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated()) {
            setAuthContextData({
                authenticated: true,
                tokenData: getTokenData(),
            });
        } else {
            setAuthContextData({
                authenticated: false,
            });
        }
    }, [setAuthContextData]);

    const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        removeAuthData();
        setAuthContextData({
            authenticated: false,
        });
        history.replace('/');
    };

    return (
        <nav className="navbar bg-primary main-nav">
            <Link to={authContextData.authenticated ? '/movies' : '/'} className="nav-logo-text">
                <h4>MovieFlix</h4>
            </Link>

            {authContextData.authenticated &&
                <button onClick={handleLogoutClick} className="btn btn-primary btn-logout">
                    <h6>SAIR</h6>
                </button>
            }
        </nav>
    );
}

export default Navbar;