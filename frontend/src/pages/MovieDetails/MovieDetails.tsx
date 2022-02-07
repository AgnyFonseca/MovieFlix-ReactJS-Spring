import Button from '../../components/Button/Button';
import './MovieDetails.css';

const MovieDetails = () => {
    return (
        <div className="moviedetails-container">
            <h1>Tela detalhes do filme id: 1</h1>
            <div className="rating-card base-card">
                <input 
                    placeholder="Deixe sua avaliação aqui"
                />
                <Button title="Salvar Avaliação" />
            </div>
        </div>
    );
}

export default MovieDetails;