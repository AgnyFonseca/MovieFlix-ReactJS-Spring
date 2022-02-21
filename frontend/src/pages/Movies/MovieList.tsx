import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardLoader from '../../components/CardLoader/CardLoader';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieFilter, { GenreFilterData } from '../../components/MovieFilter/MovieFilter';
import Pagination from '../../components/Pagination/Pagination';
import { Movie } from '../../types/movie';
import { SpringPage } from '../../types/spring';
import { requestBackend } from '../../util/requests';
import './MovieList.css';

type ControlComponentsData = {
    activePage: number;
    filterData: GenreFilterData;
}

const MovieList = () => {
    const [page, setPage] = useState<SpringPage<Movie>>();
    const [isLoading, setIsLoading] = useState(false);

    const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>(
        {
            activePage: 0,
            filterData: { genre: null }
        }
    );

    const handlePageChange = (pageNumber: number) => {
        setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData });
    }

    const getMovies = useCallback(() => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: '/movies',
            withCredentials: true,
            params: {
                page: controlComponentsData.activePage,
                size: 4,
                genreId: controlComponentsData.filterData.genre?.id,
            },
        };

        setIsLoading(true);
        requestBackend(config)
            .then((response) => {
                setPage(response.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [controlComponentsData]);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    const handleSubmitFilter = (data: GenreFilterData) => {
        setControlComponentsData({ activePage: 0, filterData: data });
    };

    return (
        <div className="movie-list-container">
            <MovieFilter onSubmitFilter={handleSubmitFilter} />
            <div className="row">
                {isLoading ? <CardLoader /> : (
                    page?.content.map((item) => (
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
                )))}
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