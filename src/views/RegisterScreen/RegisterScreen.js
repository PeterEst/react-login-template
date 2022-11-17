import React, { useState, useContext } from "react";
import FormInput from "../../components/FormInput/FormInput";
import EmailValidator from "../../utils/EmailValidator";
import PasswordValidator from "../../utils/PasswordValidator";
import UsernameValidator from "../../utils/UsernameValidator";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { checkUser } = useContext(AuthContext);

  const [username, setUsername] = useState({
    value: "",
    errorMessage: "",
  });

  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });

  const [password, setPassword] = useState({
    value: "",
    errorMessage: "",
  });

  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    errorMessage: "",
  });

  const [serverErrorMessage, setServerErrorMessage] = useState("");

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
      placeholder: "Email",
      type: "text",
      label: "Email",
      name: "email",
    },
    {
      id: 3,
      placeholder: "Password",
      type: "password",
      label: "Password",
      name: "password",
    },
    {
      id: 4,
      placeholder: "Confirm Password",
      type: "password",
      label: "Confirm Password",
      name: "confirm-password",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // username validation
    const userNameError = UsernameValidator(username.value);
    if (userNameError) {
      setUsername({ ...username, errorMessage: userNameError });
      isValid = false;
    }

    // email validation
    const emailError = EmailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, errorMessage: emailError });
      isValid = false;
    }

    // password validation
    const passwordError = PasswordValidator(password.value, true);
    if (passwordError) {
      setPassword({ ...password, errorMessage: passwordError });
      isValid = false;
    }

    // confirm password validation
    if (password.value !== confirmPassword.value) {
      setConfirmPassword({
        ...confirmPassword,
        errorMessage: "Passwords do not match",
      });
      isValid = false;
    }

    if (isValid) {
      axios
        .post(
          "http://localhost:3300/register",
          {
            username: username.value,
            email: email.value,
            password: password.value,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            checkUser();
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setServerErrorMessage(err.response.data.errors);
        });
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setServerErrorMessage("");
    switch (name) {
      case "username":
        setUsername({ value, errorMessage: "" });
        break;
      case "email":
        setEmail({ value, errorMessage: "" });
        break;
      case "password":
        setPassword({ value, errorMessage: "" });
        break;
      case "confirm-password":
        setConfirmPassword({ value, errorMessage: "" });
        break;
      default:
        break;
    }
  };

  const setFormInputValues = (inputName) => {
    switch (inputName) {
      case "username":
        return username.value;
      case "email":
        return email.value;
      case "password":
        return password.value;
      case "confirm-password":
        return confirmPassword.value;
      default:
        break;
    }
  };

  const setFormErrorValues = (inputName) => {
    switch (inputName) {
      case "username":
        return username.errorMessage;
      case "email":
        return email.errorMessage;
      case "password":
        return password.errorMessage;
      case "confirm-password":
        return confirmPassword.errorMessage;
      default:
        break;
    }
  };

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleSubmit}>
        <header>
          <h1>Register Screen</h1>
        </header>
        <div className="login__form__container">
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={setFormInputValues(input.name)}
              onChange={onChange}
              errorMessage={setFormErrorValues(input.name)}
            />
          ))}
          {serverErrorMessage && (
            <p className="__server__error__message">{serverErrorMessage}</p>
          )}
          <button className="__button">Register</button>
          <Link
            to={"/login"}
            style={{ color: "#014d90", textAlign: "center", marginTop: 10 }}
          >
            Login Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
