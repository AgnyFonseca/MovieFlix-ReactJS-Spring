import { Movie } from "./movie";

export type Genre = {
    id: number;
    name: string;
    movies: Movie[];
}