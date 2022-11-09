import React from "react";
import "./LoginScreen.css";
import FormInput from "../../components/FormInput/FormInput";
import UsernameValidator from "../../utils/UsernameValidator";
import PasswordValidator from "../../utils/PasswordValidator";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = React.useState({
    value: "",
    errorMessage: "",
  });

  const [password, setPassword] = React.useState({
    value: "",
    errorMessage: "",
  });

  const inputs = [
    {
      id: 1,
      placeholder: "Username",
      type: "text",
      label: "Username",
      name: "username",
    },
    {
      id: 2,
      placeholder: "Password",
      type: "password",
      label: "Password",
      name: "password",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // username validation
    const usernameError = UsernameValidator(username.value);
    if (usernameError) {
      setUsername({ ...username, errorMessage: usernameError });
      isValid = false;
    }

    // password validation
    const passwordError = PasswordValidator(password.value);
    if (passwordError) {
      setPassword({ ...password, errorMessage: passwordError });
      isValid = false;
    }

    if (isValid) {
      alert("Login Successful");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername({ value, errorMessage: "" });
    } else if (name === "password") {
      setPassword({ value, errorMessage: "" });
    }
  };

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleSubmit}>
        <header>
          <h1>Login Screen</h1>
        </header>
        <div className="login__form__container">
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={
                input.name === "username" ? username.value : password.value
              }
              onChange={onChange}
              errorMessage={
                input.name === "username"
                  ? username.errorMessage
                  : password.errorMessage
              }
            />
          ))}
          <Link to="/" className="login__button">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
