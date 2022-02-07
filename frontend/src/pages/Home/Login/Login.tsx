import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import './Login.css';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {

    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = (formData : FormData) => {
        console.log(formData);
    };


    return (
        <div className="login-card base-card">
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <div>
                    <input
                        {...register("username")}
                        type="text"
                        placeholder="Email"
                        name="username"
                    />
                </div>
                <div>
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Senha"
                        name="password"
                    />
                </div>
                <div>
                    {/* <Link to="/movies"> */}
                        <Button title="Fazer Login" />
                    {/* </Link> */}
                </div>
            </form>
        </div>
    );
}

export default Login;