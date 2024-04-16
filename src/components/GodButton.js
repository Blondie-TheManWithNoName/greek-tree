import Style from "./GodButton.module.css";
import React, { useEffect, useState } from "react";
import { styleBtn } from "./utils.js";

const GodButton = ({
  id,
  name,
  style,
  state,
  handleClick,
  index,
  isSelected,
}) => {
  const [selectedButton, setSelectedButton] = useState(isSelected);
  const [godStyle, setGodStyle] = useState(style);
  const [godState, setGodState] = useState(state);

  useEffect(() => {
    setSelectedButton(isSelected);
  }, [isSelected]);

  useEffect(() => {
    setGodStyle(style);
  }, [style]);

  useEffect(() => {
    setGodState(state);
  }, [state]);

  const handleSelect = () => {
    setSelectedButton(!selectedButton);

    const res = handleClick(index, name, godState);
    // setGodStyle(res[0]);
    setGodState(res);
  };

  // function getStyle(state, index) {
  //   console.log("STYLE");
  //   if (state === "child") {
  //     return styleBtn.godChild(index, childrenNum, 0);
  //   } else if (state === "partner") {
  //   } else if (state === "parent") {
  //   } else if (state === "main") {
  //     return styleBtn.godMain;
  //   }
  // }

  return (
    <>
      <label htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          className={Style.check}
          onChange={handleSelect}
          checked={selectedButton}
        />
        <span className={`${Style.dot}`} style={godStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-5 -5 110 60"
            width="100"
            height="50"
            style={{ fill: "#FDFDFC" }}
          >
            <path
              d="M 5 25 C 5 24 5 24 9.6 13 C 10 12 11 12 13 12 L 87 12 C 88 12 90 12 90.4 13 C 95 24 95 25 95 25 C 95 25 95 27 90.4 37 C 90 38 89 38 87 38 L 13 38 C 11 38 10 38 9.6 37 C 5 26 5 26 5 25 Z

"
              stroke="#AABFDA"
              stroke-width="1"
              stroke-linejoin="round"
            />
          </svg>

          <span className={Style.text}>{name}</span>
        </span>
      </label>
    </>
  );
};

export default GodButton;
