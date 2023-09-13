import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ onChange, checked }) {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <div className="checkbox">
      <label className="checkbox__container">
        <input
          className="checkbox__input"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={checked}
        />
        <span className="checkbox__span" />
      </label>
      <p className="checkbox__name">Короткометражки</p>
    </div>
  );
}