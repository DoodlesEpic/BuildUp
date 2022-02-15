import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = formData;

  // Handle Input Change
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  // Render
  return (
    <>
      <section>
        <h1>Register</h1>
      </section>
      <section>
        <form onSubmit={onSubmitForm}>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="Username"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="email@example.com"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
