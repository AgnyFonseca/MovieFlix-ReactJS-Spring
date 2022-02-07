import Button from '../../components/Button/Button';
import './MovieDetails.css';
import Review from './Review/Review';

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

            <div className="review-card base-card">
                <Review
                    username="Maria Silva"
                    review="Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco."
                />
                <Review
                    username="Maria Silva"
                    review="Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco."
                />
                <Review
                    username="Maria Silva"
                    review="Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco."
                />
                <Review
                    username="Maria Silva"
                    review="Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco."
                />
            </div>
        </div>
    );
}

export default MovieDetails;