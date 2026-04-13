import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";

import Home from "./components/Home";
import Auth from "./components/Auth";
import Register from "./components/Register";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <>
      <nav className="nav justify-content-center gap-3 p-3">
        <Link to="/">Home</Link>
        {user && <Link to="/movies">Movies</Link>}
        {!user && <Link to="/auth">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && (
          <button type="button" className="btn btn-link p-0" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <MovieList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/new"
          element={
            <ProtectedRoute>
              <MovieForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <MovieForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

