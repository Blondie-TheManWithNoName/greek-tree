import Style from "./GodButton.module.css";
import React, { useEffect, useState } from "react";

const GodButton = ({ name, style, handleClick, isActive }) => {
  function changeCount() {
    if (isSelected) {
      setSelectedCount(() => {
        if (selectedCount !== 0) {
          return selectedCount - 1;
        }

        return selectedCount;
      });
    } else {
      setSelectedCount(() => selectedCount + 1);
    }
  }
  return (
    <>
      <label htmlFor={name}>
        <input
          type="checkbox"
          id={name}
          className={Style.check}
          // checked={isSelected}
          onChange={handleClick}
        />

        {/* <span className={`${Style.dot} ${Style[style]}`} style={style === "godPartner" ? { left: "0" } : {}}> */}

        <span
          className={`${Style.dot}${
            isActive ? ` ${Style.active}` : ` ${Style.deactive}`
          }`}
          style={{
            top: style.top,
            left: style.left,
            rotate: style.rotate,
          }}
        >
          {name}
        </span>
      </label>
    </>
  );
};

export default GodButton;
