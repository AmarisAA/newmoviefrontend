import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api/APIService";
import { useAuth } from "@/context/useAuth";

function Auth() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginUser(credentials);
      login(response.data, credentials.username);
      navigate("/");
    } catch {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title">Login</h4>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <input className="form-control mb-3" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} />
                <input className="form-control mb-3" name="password" type="password" placeholder="Password" value={credentials.password} onChange={handleChange} />
                <button className="btn btn-primary" type="submit">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

