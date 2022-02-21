import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from '../../types/genre';
import { requestBackend } from '../../util/requests';
import './MovieFilter.css';

export type GenreFilterData = {
    genre: Genre | null;
}

type Props = {
    onSubmitFilter: (data: GenreFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
    const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

    const { handleSubmit, setValue, getValues, control } =
        useForm<GenreFilterData>();

    useEffect(() => {
        const params: AxiosRequestConfig = {
            url: '/genres',
            withCredentials: true,
        };

        requestBackend(params).then((response) => {
            setSelectGenres(response.data);
        });
    }, []);

    const onSubmit = (formData: GenreFilterData) => {
        onSubmitFilter(formData);
    };

    const handleChangeGenre = (value: Genre) => {
        setValue('genre', value);
        const obj: GenreFilterData = {
            genre: getValues('genre'),
        };

        onSubmitFilter(obj);
    };


    return (
        <div className="movie-list-select-container base-card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="genre"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={selectGenres}
                            classNamePrefix="movie-list-select"
                            isClearable
                            placeholder="Gênero"
                            onChange={(value) => handleChangeGenre(value as Genre)}
                            getOptionLabel={(genre: Genre) => genre.name}
                            getOptionValue={(genre: Genre) => String(genre.id)}
                        />
                    )}
                />
            </form>
        </div>
    );
};

export default MovieFilter;