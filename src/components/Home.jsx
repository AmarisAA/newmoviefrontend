import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router-dom";
import movieImg from "@/assets/movie_logo.jpg";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <blockquote className="fs-5">
        Welcome {user || "Guest"}!
      </blockquote>
      <div className="card mx-auto" style={{ maxWidth: "720px" }}>
        <div className="row g-0 align-items-center">
          <div className="col-md-6 d-none d-md-block">
            <img src={movieImg} className="img-fluid rounded-start" alt="Movies" />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">Movies</h5>
              <p className="card-text">View descriptions and ratings of your movie list.</p>
              <button className="btn btn-primary" onClick={() => navigate(user ? "/movies" : "/auth")}>
                {user ? "View Details" : "Login to View Details"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
