import Style from "./GodButton.module.css";
import React, { useEffect, useState } from "react";
import { styleBtn } from "./utils.js";

const GodButton = ({
  key,
  name,
  style,
  isActive,
  handleClick,
  index,
  total,
  isSelected,
}) => {
  const [selectedButton, setSelectedButton] = useState(isSelected);

  useEffect(() => {
    setSelectedButton(isSelected);
  }, [isSelected]);

  const handleSelect = () => {
    setSelectedButton(!selectedButton);
    handleClick(index, total, name);
  };

  return (
    <>
      <label htmlFor={key}>
        <input
          type="checkbox"
          id={key}
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
