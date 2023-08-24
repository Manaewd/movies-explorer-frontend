import React from "react";

import "./FilterCheckbox.css";

export default function FilterCheckbox({ checkboxName }) {
  return (
    <div className="checkbox">
      <label className="checkbox__container">
        <input className="checkbox__input" type="checkbox" />
        <span className="checkbox__span" />
      </label>
      <p className="checkbox__name">{checkboxName}</p>
    </div>
  );
}