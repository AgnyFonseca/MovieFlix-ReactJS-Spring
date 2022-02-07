import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import './Login.css';

const Login = () => {
    return (
        <div className="login-card base-card">
            <h1>LOGIN</h1>
            <form className="form-container">
                <div>
                    <input 
                        placeholder="Email"
                    />
                </div>
                <div>
                    <input
                        placeholder="Senha"
                    />
                </div>
                <div>
                    <Link to="/movies">
                        <Button title="Fazer Login" />
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;