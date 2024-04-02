import Style from "./GodButton.module.css";
import React, { useEffect, useState } from "react";
import { styleBtn } from "./utils.js";

const GodButton = ({
  name,
  style,
  isActive,
  handleClick,
  twoSelected,
  index,
  total,
  isSelected,
}) => {
  const [selectedButton, setSelectedButton] = useState(isSelected);

  const handleSelect = () => {
    setSelectedButton(!selectedButton);
    handleClick(index, total, name);
  };

  return (
    <>
      <label htmlFor={name}>
        <input
          type="checkbox"
          id={name}
          className={Style.check}
          onChange={handleSelect}
          checked={selectedButton}
        />
        <span
          className={`${Style.dot}${
            isActive || selectedButton
              ? ` ${Style.active}`
              : ` ${Style.deactive}`
          }`}
          style={style}
        >
          {name}
        </span>
      </label>
    </>
  );
};

export default GodButton;
