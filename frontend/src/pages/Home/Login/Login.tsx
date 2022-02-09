import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';
import { requestBackendLogin } from '../../../util/requests';
import './Login.css';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {

    const [hasError, setHasError] = useState(false);

    const { register, handleSubmit, formState: {errors} } = useForm<FormData>();

    const onSubmit = (formData: FormData) => {
        requestBackendLogin(formData)
            .then(response => {
                setHasError(false);
                console.log('SUCESSO', formData);
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
                            required: 'Campo obrigatório',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email inválido'
                            }
                        })}
                        type="text"
                        placeholder="Email"
                        name="username"
                    />
                    <div className="invalid-feedback d-block">{errors.username?.message}</div>
                </div>
                <div className="input-div">
                    <input
                        {...register('password', {
                            required: 'Campo obrigatório'
                        })}
                        type="password"
                        placeholder="Senha"
                        name="password"
                    />
                    <div className="invalid-feedback d-block">{errors.password?.message}</div>
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