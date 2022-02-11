import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { Movie } from '../../types/movie';
import { Review } from '../../types/review';
import { SpringList } from '../../types/spring';
import { hasAnyRoles } from '../../util/auth';
import { requestBackend, postReview } from '../../util/requests';
import ReviewCard from './ReviewCard/ReviewCard';

import './MovieDetails.css';

type UrlParams = {
    movieId: string;
}

type FormData = {
    text: string;
    movieId: number;
}

const MovieDetails = () => {
    const { movieId } = useParams<UrlParams>();

    const [movie, setMovie] = useState<Movie>();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

    const [reviews, setReviews ] = useState<SpringList<Review>>();

    const history = useHistory();

    useEffect(() => {
        const params: AxiosRequestConfig = {
            url: `/movies/${movieId}`,
            withCredentials: true,
        };
        requestBackend(params).then((response) => {
            setMovie(response.data);
        });
    }, [movieId]);

    useEffect(() => {
        const params: AxiosRequestConfig = {
            url: `/movies/${movieId}/reviews`,
            withCredentials: true,
        };

        requestBackend(params).then((response) => {
            setReviews(response);
        });
    }, [movieId]);

    const onSubmit = (formData: FormData) => {
        formData.movieId = Number(movieId);
        console.log(formData.text);
        postReview(formData)
            .then((response) => {
                reviews?.data.push(response.data);
                history.push(`/movies/${movieId}/reviews`);
            })
            .catch((error) => {
                console.log('ERRO', error)
            });
        setValue('text', '');
      };

    return (
        <div className="moviedetails-container">
            <h1>Tela detalhes do filme id: {movie?.id}</h1>
            {hasAnyRoles(['ROLE_MEMBER']) &&
                <div className="review-form base-card">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register('text', {
                                required: 'Campo não pode estar em branco',
                            })}
                            type="text"
                            name="text"
                            placeholder="Deixe sua avaliação aqui"
                        />
                        <div className="invalid-feedback d-block">{errors.text?.message}</div>
                        <Button title="Salvar Avaliação" />
                    </form>
                </div>
            }

            <div className="review-card base-card">
                {reviews?.data.map((review) => (
                    <ReviewCard
                        username={review.user.name}
                        review={review.text}
                        key={review.id}
                    />
                ))}
            </div>
        </div>
    );
}

export default MovieDetails;