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
    setGodState(res[1]);
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
          {name}
        </span>
      </label>
    </>
  );
};

export default GodButton;
