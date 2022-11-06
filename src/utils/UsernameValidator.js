const UsernameValidator = (username) => {
  if (username === "") {
    return "Username is required";
  } else if (username.length < 3) {
    return "Username is too short";
  } else if (username.length > 20) {
    return "Username is too long";
  } else if (username.match(/[^a-zA-Z0-9]/)) {
    return "Username contains invalid characters";
  } else {
    return "";
  }
};

export default UsernameValidator;
