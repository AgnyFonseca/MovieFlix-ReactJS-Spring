import './Login.css';

const Login = () => {
    return (
        <div className="login-card">
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
                    <button className="btn btn-primary btn-login">
                        <h6>FAZER LOGIN</h6>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;