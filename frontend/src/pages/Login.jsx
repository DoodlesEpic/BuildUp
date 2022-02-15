import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  // Handle Input Change
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    navigate("/");
  };

  // Render
  return (
    <>
      <section>
        <h1>Login</h1>
      </section>
      <section>
        <form onSubmit={onSubmitForm}>
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

export default Login;
