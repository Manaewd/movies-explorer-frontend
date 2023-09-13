import { useState, useCallback } from "react";
import { EMAIL } from "../utils/constants";

function emailValidation(email) {
  const patternEmail = EMAIL;
  return patternEmail.test(email);
}

export default function Validation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  let isValidEmail = true;

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });

    if (name === "email") {
      isValidEmail = emailValidation(value);
      setErrors({
        ...errors,
        [name]: isValidEmail ? "" : "Некорректный email ",
      });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }

    const isFormValid = target.closest("form").checkValidity();
    setIsValid(isValidEmail && isFormValid);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}