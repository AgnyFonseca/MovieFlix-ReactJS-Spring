import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';
import Button from '../../../components/Button/Button';
import { getTokenData } from '../../../util/auth';
import { requestBackendLogin } from '../../../util/requests';
import { getAuthData, saveAuthData } from '../../../util/storage';
import './Login.css';

type FormData = {
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}

const Login = () => {

    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: '/movies'}};

    const { setAuthContextData } = useContext(AuthContext);

    const [hasError, setHasError] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const history = useHistory();

    const onSubmit = (formData: FormData) => {
        requestBackendLogin(formData)
            .then(response => {
                saveAuthData(response.data);
                const token = getAuthData().access_token;
                console.log('TOKEN GERADO:', token);
                setHasError(false);
                console.log('SUCESSO', formData);
                setAuthContextData({
                    authenticated: true,
                    tokenData: getTokenData(),
                });
                history.replace(from);
            })
            .catch(error => {
                setHasError(true);
                console.log('ERRO', error);
            });
    };

    return (
        <div className="login-card base-card">
            <h1>LOGIN</h1>
            {hasError && (
                <div className="alert alert-danger">
                    Erro ao tentar efetuar o login
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <div className="input-div">
                    <input
                        {...register('username', {
                            required: 'Campo obrigat??rio',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email inv??lido'
                            }
                        })}
                        type="text"
                        className={`${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Email"
                        name="username"
                    />
                    <div className="invalid-feedback d-block">{errors.username?.message}</div>
                </div>
                <div className="input-div">
                    <input
                        {...register('password', {
                            required: 'Campo obrigat??rio'
                        })}
                        type="password"
                        className={`${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Senha"
                        name="password"
                    />
                    <div className="invalid-feedback d-block">{errors.password?.message}</div>
                </div>
                <div>
                    <Button title="Fazer Login" />
                </div>
            </form>
        </div>
    );
}

export default Login;