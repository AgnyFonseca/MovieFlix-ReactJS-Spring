import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import MovieCard from '../../components/MovieCard/MovieCard';
import { Movie } from '../../types/movie';
import { SpringPage } from '../../types/spring';
import { requestBackend } from '../../util/requests';
import './MovieList.css';

const MovieList = () => {
    const [page, setPage] = useState<SpringPage<Movie>>();

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

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
            <div className="movie-list-select-box base-card">
                <Select
                    options={options}
                    classNamePrefix="movie-list-select"
                />
            </div>
            <div className="row">
                {page?.content.map((item) => (
                    <div className="col-sm-6 col-lg-4 col-xl-3" key={item.id}>
                        <Link to={`/movies/${item.id}`}>
                            <MovieCard
                                title={item.title}
                                year={item.year}
                                subTitle={item.subTitle}
                                imgUrl={item.imgUrl}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;