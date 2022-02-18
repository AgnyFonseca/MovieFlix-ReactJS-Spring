import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { Movie } from '../../types/movie';
import { SpringPage } from '../../types/spring';
import { requestBackend } from '../../util/requests';
import './MovieList.css';

const MovieList = () => {
    const [page, setPage] = useState<SpringPage<Movie>>();

    useEffect(() => {
        const params: AxiosRequestConfig = {
            url: '/movies?genreId=0',
            withCredentials: true,
            params: {
                page: 0,
                size: 12,
            },
        };

        requestBackend(params).then((response) => {
            setPage(response.data);
        });
    }, []);

    return (
        <div className="movie-list-container">
            <div className="row">
                {page?.content.map((movie) => (
                    <div className="col-sm-6 col-lg-4 col-xl-3" key={movie.id}>
                        <MovieCard
                            title={movie.title}
                            year={movie.year}
                            subTitle={movie.subTitle}
                            imgUrl={movie.imgUrl}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;