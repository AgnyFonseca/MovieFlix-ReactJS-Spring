import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { Movie } from '../../types/movie';
import { requestBackend } from '../../util/requests';
import './MovieDetails.css';
import Review from './Review/Review';

type UrlParams = {
    movieId: string;
}

const MovieDetails = () => {
    const { movieId } = useParams<UrlParams>();

    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {
        const params: AxiosRequestConfig = {
            url: `/movies/${movieId}`,
            withCredentials: true,
        };
        requestBackend(params).then((response) => {
            setMovie(response.data);
        });
    }, [movieId]);


    return (
        <div className="moviedetails-container">
            <h1>Tela detalhes do filme id: {movie?.id}</h1>
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