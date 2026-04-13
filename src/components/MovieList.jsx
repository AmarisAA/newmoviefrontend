import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMovie, getMovies } from "@/api/APIService";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await getMovies();
      setMovies(response.data.data || response.data);
    } catch {
      setError("Unable to load movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;
    await deleteMovie(id);
    loadMovies();
  };

  if (loading) return <div className="container py-4">Loading movies...</div>;

  return (
    <div className="container py-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Movies</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/movies/new")}
        >
          Add New Movie
        </button>
      </div>
      {movies.length === 0 ? (
        <div>No movies found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Year</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.pk}>
                  <td>{movie.name}</td>
                  <td>{movie.description}</td>
                  <td className="movie-image">
                    {movie.movie_image ? (
                      <img
                        src={movie.movie_image}
                        alt={movie.name}
                        className="img-thumbnail"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{movie.year}</td>
                  <td>{movie.rating}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => navigate(`/movies/${movie.pk}`)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(movie.pk)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MovieList;
