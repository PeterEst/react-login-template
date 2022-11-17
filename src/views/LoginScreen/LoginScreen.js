import React, { useContext, useState } from "react";
import "./LoginScreen.css";
import FormInput from "../../components/FormInput/FormInput";
import EmailValidator from "../../utils/EmailValidator";
import PasswordValidator from "../../utils/PasswordValidator";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { checkUser } = useContext(AuthContext);

  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });

  const [password, setPassword] = useState({
    value: "",
    errorMessage: "",
  });

  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const inputs = [
    {
      id: 1,
      placeholder: "Email",
      type: "text",
      label: "Email",
      name: "email",
    },
    {
      id: 2,
      placeholder: "Password",
      type: "password",
      label: "Password",
      name: "password",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // email validation
    const emailError = EmailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, errorMessage: emailError });
      isValid = false;
    }

    // password validation
    const passwordError = PasswordValidator(password.value, false);
    if (passwordError) {
      setPassword({ ...password, errorMessage: passwordError });
      isValid = false;
    }

    if (isValid) {
      axios
        .post(
          "http://localhost:3300/login",
          {
            email: email.value,
            password: password.value,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          checkUser();
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setServerErrorMessage(err.response.data.errors);
        });
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail({ value, errorMessage: "" });
      setServerErrorMessage("");
    } else if (name === "password") {
      setPassword({ value, errorMessage: "" });
      setServerErrorMessage("");
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
              value={input.name === "email" ? email.value : password.value}
              onChange={onChange}
              errorMessage={
                input.name === "email"
                  ? email.errorMessage
                  : password.errorMessage
              }
            />
          ))}
          {serverErrorMessage && (
            <p className="__server__error__message">{serverErrorMessage}</p>
          )}
          <button className="__button">Login</button>
          <Link
            to={"/register"}
            style={{ color: "#014d90", textAlign: "center", marginTop: 10 }}
          >
            Register Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
