const PasswordValidator = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters";
  } else if (
    !password.match(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    )
  ) {
    return "Password must contain at least one number, one uppercase letter, and one special character";
  } else {
    return "";
  }
};

export default PasswordValidator;
