import React from "react";
import "./FormInput.css";

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <div className="formInput__container">
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} />
      {errorMessage && <span className="formInput__error">{errorMessage}</span>}
    </div>
  );
};

export default FormInput;
