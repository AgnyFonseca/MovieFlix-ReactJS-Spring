import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import { Genre } from '../../types/genre';
import { Movie } from '../../types/movie';
import { SpringPage } from '../../types/spring';
import { requestBackend } from '../../util/requests';
import './MovieList.css';

type ControlComponentsData = {
    activePage: number;
}

const MovieList = () => {
    const [page, setPage] = useState<SpringPage<Movie>>();

    const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>(
        {
            activePage: 0
        }
    );

    const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

    const handlePageChange = (pageNumber: number) => {
        setControlComponentsData({ activePage: pageNumber });
    }

    const getMovies = useCallback(() => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: '/movies?genreId=0',
            withCredentials: true,
            params: {
                page: controlComponentsData.activePage,
                size: 2,
            },
        };

        requestBackend(config).then((response) => {
            setPage(response.data);
        });
    }, [controlComponentsData]);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    useEffect(() => {
        const params: AxiosRequestConfig = {
            url: '/genres',
            withCredentials: true,
        };

        requestBackend(params).then((response) => {
            setSelectGenres(response.data);
        });
    }, []);


    return (
        <div className="movie-list-container">
            <div className="movie-list-select-box base-card">
                <Select
                    options={selectGenres}
                    classNamePrefix="movie-list-select"
                    isClearable
                    placeholder="Genero"
                    // onChange={(value) => handleChangeGenre(value as Genre)}
                    getOptionLabel={(genre: Genre) => genre.name}
                    getOptionValue={(genre: Genre) => String(genre.id)}
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

            <Pagination
                forcePage={page?.number}
                pageCount={page ? page.totalPages : 0}
                range={3}
                onChange={handlePageChange}
            />
        </div>
    );
}

export default MovieList;