import api from "./axios";

export const getMovies = async () => {
  return api.get("/api/movies/");
};

export const getMovie = async (id) => {
  return api.get(`/api/movies/${id}`);
};

export const createMovie = async (formData) => {
  return api.post("/api/movies/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const updateMovie = async (id, formData) => {
  return api.put(`/api/movies/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const deleteMovie = async (id) => {
  return api.delete(`/api/movies/${id}`);
};

export const loginUser = async (credentials) => {
  return api.post("/api/", credentials);
};

export const registerUser = async (credentials) => {
  const payload = {
    ...credentials,
    customusername: credentials.username
  };
  return api.post("/register/", payload);
};