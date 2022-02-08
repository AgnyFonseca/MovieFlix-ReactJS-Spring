import { Link } from 'react-router-dom';
import './Movies.css';

const Movies = () => {
    return (
        <div className="movies-container">
            <h1>Tela listagem de filmes</h1>
            <div>
                <Link to="/movieid">
                    <p>Acessar/movies/1</p>
                </Link>
                <Link to="/movies/1">
                    <p>Acessar/movies/2</p>
                </Link>
            </div>
        </div>
    );
}

export default Movies;