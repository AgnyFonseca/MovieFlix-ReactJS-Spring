import './MovieCard.css';

type MovieCardProps = {
    title?: string;
    subTitle?: string;
    year?: number;
    imgUrl?: string;
    synopsis?: string;
}

const MovieCard = (props: MovieCardProps) => {
    return (
        <div className={props.synopsis ? "movie-card-container-synopsis base-card" : "movie-card-container base-card"}>
            <div className={props.synopsis ? "movie-card-image-synopsis" : ""}>
                <img className="movie-card-image" src={props.imgUrl} alt="movie" />
            </div>
            <div className={props.synopsis ? "movie-card-content-container-synopsis" : "movie-card-content-container"}>
                <h5>{props.title}</h5>
                <p className="movie-card-year">{props.year}</p>
                <p className="movie-card-subtitle">{props.subTitle}</p>

                {props.synopsis &&
                    <div className="movie-card-synopsis-box">
                        <p className="movie-card-synopsis-text">
                            {props.synopsis}
                        </p>
                    </div>
                }

            </div>
        </div>
    );
}

export default MovieCard;