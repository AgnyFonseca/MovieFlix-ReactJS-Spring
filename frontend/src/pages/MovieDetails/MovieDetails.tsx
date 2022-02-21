import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { Movie } from '../../types/movie';
import { Review } from '../../types/review';
import { SpringList } from '../../types/spring';
import { hasAnyRoles } from '../../util/auth';
import { postReview, requestBackend } from '../../util/requests';
import ReviewCard from './ReviewCard/ReviewCard';
import MovieCard from '../../components/MovieCard/MovieCard';
import { toast } from 'react-toastify';

import './MovieDetails.css';


type UrlParams = {
    movieId: string;
}

const MovieDetails = () => {
    const { movieId } = useParams<UrlParams>();

    const [movie, setMovie] = useState<Movie>();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Review>();

    const [reviews, setReviews] = useState<SpringList<Review>>();

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

    const onSubmit = (formData: Review) => {
        const data = {
            ...formData,
            movieId: Number(movieId),
        }

        postReview(data)
            .then((response) => {
                reviews?.data.push(response.data);
                toast.info('Avaliação salva com sucesso!');
                history.push(`/movies/${movieId}/reviews`);
            })
            .catch((error) => {
                toast.error('ERRO ao tentar salvar a avaliação.');
            });

        setValue('text', '');
    };

    // const onSubmit = (formData: Review) => {
    //     const data = {
    //         ...formData,
    //         movieId: Number(movieId),
    //     }

    //     const config: AxiosRequestConfig = {
    //         method: 'POST',
    //         url: '/reviews',
    //         data,
    //         withCredentials: true,
    //     };

    //     requestBackend(config)
    //         .then(() => {
    //             setHasError(false);
    //         })
    //         .catch((error) => {
    //             setHasError(true);
    //             console.log('ERRO', error);
    //         });

    //     setValue('text', '');
    // };

    return (
        <div className="moviedetails-container">
            <MovieCard
                title={movie?.title}
                year={movie?.year}
                subTitle={movie?.subTitle}
                imgUrl={movie?.imgUrl}
                synopsis={movie?.synopsis}
            />
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