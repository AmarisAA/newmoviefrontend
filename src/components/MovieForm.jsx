import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMovie, getMovie, updateMovie } from "@/api/APIService";

function MovieForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [movie, setMovie] = useState({
    name: "",
    description: "",
    year: "",
    rating: "",
    movie_image: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) return;

      try {
        const response = await getMovie(id);
        const movieData = response.data;

        setMovie({
          name: movieData.name || "",
          description: movieData.description || "",
          year: movieData.year || "",
          rating: movieData.rating || "",
          movie_image: null,
        });

        setImagePreview(movieData.movie_image || "");
      } catch {
        setError("Unable to load movie.");
      }
    };

    loadMovie();
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMovie({ ...movie, movie_image: file });

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!movie.name) {
      setError("Name is required.");
      return;
    }
    if (Number(movie.rating) < 0 || Number(movie.rating) > 10) {
      setError("Rating must be between 0 and 10.");
      return;
    }

    const formData = new FormData();
    formData.append("name", movie.name);
    formData.append("description", movie.description);
    formData.append("year", movie.year);
    formData.append("rating", movie.rating);
    if (movie.movie_image instanceof File) {
      formData.append("movie_image", movie.movie_image);
    }

    if (isEditMode) {
      await updateMovie(id, formData);
    } else {
      await createMovie(formData);
    }

    navigate("/movies");
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <div className="card">
            <div className="card-header">
              {isEditMode ? "Edit Movie" : "Add New Movie"}
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-2"
                  name="name"
                  placeholder="Name"
                  value={movie.name || ""}
                  onChange={handleChange}
                />
                <input
                  className="form-control mb-2"
                  name="description"
                  placeholder="Description"
                  value={movie.description || ""}
                  onChange={handleChange}
                />
                <input
                  className="form-control mb-2"
                  name="year"
                  type="number"
                  placeholder="Year"
                  value={movie.year || ""}
                  onChange={handleChange}
                />
                <input
                  className="form-control mb-2"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  placeholder="Rating"
                  value={movie.rating || ""}
                  onChange={handleChange}
                />

                {imagePreview && (
                  <div className="mb-3">
                    <label className="form-label d-block">Current Image</label>
                    <img
                      src={imagePreview}
                      alt={movie.name}
                      className="img-thumbnail preview-image"
                    />
                  </div>
                )}
                <input
                  className="form-control mb-3"
                  name="movie_image"
                  type="file"
                  onChange={handleFileChange}
                />
                <button className="btn btn-primary me-2" type="submit">
                  {isEditMode ? "Update" : "Save"}
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => navigate("/movies")}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieForm;
