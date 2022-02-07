import './Button.css';

type Props = {
    title: string;
}

const Button = ( { title } : Props ) => {
    return (
        <button className="btn btn-primary btn-login">
            <h6>{title.toUpperCase()}</h6>
        </button>
    );
}

export default Button;