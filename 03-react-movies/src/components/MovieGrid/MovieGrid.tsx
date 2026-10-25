import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieGrid({
  movies,
  onSelect,
}: MovieGridProps) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <button
            className={styles.card}
            type="button"
            onClick={() => onSelect(movie)}
            aria-label={`View details for ${movie.title}`}
          >
            {movie.poster_path ? (
              <img
                className={styles.image}
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
            ) : (
              <div className={styles.noPoster}>
                No poster available
              </div>
            )}

            <h2 className={styles.title}>{movie.title}</h2>
          </button>
        </li>
      ))}
    </ul>
  );
}