import Login from './Login/Login';
import './Home.css';
import { ReactComponent as HomeImage } from '../../assets/images/home-image.svg';

const Home = () => {
    return (
        <>
            <div className="home-container">
                <div className="home-card">
                    <h1>Avalie Filmes</h1>
                    <p>Diga o que você achou do seu filme favorito</p>
                    <HomeImage />
                </div>
                <Login />
            </div>
        </>
    );
}

export default Home;