import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/api/APIService";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
    first_name: "",
    last_name: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      setError("Passwords must match.");
      return;
    }
    try {
      await registerUser(form);
      navigate("/auth");
    } catch {
      setError("Registration failed. Check the fields and try again.");
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
                <input className="form-control mb-2" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
                <input className="form-control mb-2" name="password2" type="password" placeholder="Confirm Password" value={form.password2} onChange={handleChange} />
                <input className="form-control mb-2" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input className="form-control mb-2" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} />
                <input className="form-control mb-3" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} />
                <button className="btn btn-primary" type="submit">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
