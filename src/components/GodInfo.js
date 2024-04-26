import React, { useState, useEffect, useRef } from "react";
import Style from "./GodInfo.module.css";
import GodButton from "./GodButton";
import GodDescription from "./GodDescription";
import { styleBtn } from "./utils.js";
import {
  fetchGodInfo,
  fetchGodChildren,
  fetchGodPartners,
  fetchGodParents,
  fetchGodChildrenAndPartners,
} from "./fetchInfo.js";

const GodInfo = ({
  p1,
  p2,
  s1,
  s2,
  desc,
  setGodStatus,
  setChildClick,
  setMainClick,
}) => {
  // const [error, setError] = useState(null); TO DO
  const [shiftPercentage, setShiftPercentage] = useState(0);

  // Stores parents of current children or selected god
  const [parents, setParents] = useState({
    parent1: p1,
    parent2: p2,
  });

  // To disable or active the children buttons
  const [activeChildren, setActiveChildren] = useState(true);
  // To disable or active the partners buttons
  const [activePartners, setActivePartners] = useState(false);

  // Array with all the visible and not visible gods
  const [gods, setGods] = useState([]);

  useEffect(() => {
    if (gods !== null) {
      const indexMainIn = gods.findIndex((god) => god.state === "main_in");
      if (indexMainIn !== -1) {
        const updatedGods = [...gods];
        updatedGods[indexMainIn].state = "main";
        setTimeout(() => {
          setGods(updatedGods);
        }, 500);
      }

      const indexMainOut = gods.findIndex((god) => god.state === "main_out");
      if (indexMainOut !== -1) {
        const updatedGods = [...gods];
        updatedGods[indexMainOut].state = "child";
        setTimeout(() => {
          setGods(updatedGods);
        }, 500);
      }
    }
  }, [gods]);

  // Stores array with the god information
  const [godInfo, setGodInfo] = useState(null);

  // Stores array with children of god p1 and p2
  const [childrenNum, setChildrenNum] = useState(0);
  const [partnersNum, setPartnersNum] = useState(0);

  // Bool to either mirror parents or no
  const [mirrorPartners, setMirrorPartners] = useState(false);

  const [prevPartner, setPrevPartner] = useState({ name: null, right: false });

  useEffect(() => {
    fetchGodChildren(
      parents.parent1,
      parents.parent2,
      gods,
      setGods,
      setChildrenNum
    );
  }, [parents]);

  const handleClick = (index, name, state) => {
    if (state === "child") return onClickChild(index);
    else if (state === "main") return onClickMain(index);
    else if (state === "partner") return onClickPartner(index);
    else if (state === "parent") return onClickParent(index, name);
  };
  const onClickChild = (index) => {
    // setChildClick({ child: godsChildren[index], parents: parents });
    setShiftPercentage(
      3.5 + index * 9 - (childrenNum * 7 + (childrenNum - 1) * 2) / 2
    );
    // setGodStatus({ p1: null, p2: null, desc: true, s1: null, s2: null });
    window.scrollTo({ top: 300, behavior: "smooth" });
    fetchGodPartners(gods[index].name, index, gods, setGods);
    setActiveChildren(false);

    setTimeout(() => {
      setActivePartners(true);
    }, 400);

    return "main";
  };

  const onClickMain = (index) => {
    setActivePartners(false);
    setMainClick(parents);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveChildren(true);
    const updatedGods = [...gods]; // Create a copy of gods array
    updatedGods[index] = { ...updatedGods[index], state: "main_out" }; // Update the specific element
    const filteredGods = updatedGods.filter((god) => god.state !== "partner");
    setGods(filteredGods);

    setShiftPercentage(0);
    setPrevPartner({ name: null, right: false });
    setMirrorPartners(false);
    // setGodStatus({ p1: null, p2: null, desc: false, s1: null, s2: null });
    return "child";
  };

  const onClickPartner = (index) => {
    setChildrenNum(0);
    const indexMain = gods.findIndex((god) => god.state === "main");
    if (mirrorPartners) {
      if ((index - childrenNum - 1) % 2 === 0) {
        setGods([
          { name: gods[indexMain].name, state: "parent" },
          { name: gods[index].name, state: "parent" },
        ]);
      } else {
        setGods([
          { name: gods[index].name, state: "parent" },
          { name: gods[indexMain].name, state: "parent" },
        ]);
      }
    } else {
      if ((index - childrenNum - 1) % 2 === 0) {
        setGods([
          { name: gods[indexMain].name, state: "parent" },
          { name: gods[index].name, state: "parent" },
        ]);
      } else {
        setGods([
          { name: gods[index].name, state: "parent" },
          { name: gods[indexMain].name, state: "parent" },
        ]);
      }
    }
    return "partner";
  };

  const onClickParent = (index, name) => {
    // fetchGodInfo(parents.parent1, parents.parent2, setGodsChildren);

    fetchGodChildrenAndPartners(
      parents.parent1,
      parents.parent2,
      gods,
      setGods,
      setChildrenNum,
      name === gods[0].name ? gods[1].name : gods[0].name,
      setShiftPercentage,
      setMirrorPartners,
      index
    );

    setGodStatus({ p1: null, p2: null, desc: true, s1: null, s2: null });
    return "main";
  };

  function getStyle(state, index) {
    if (state === "child" || state === "main_out") {
      return styleBtn.godChild(
        index,
        childrenNum,
        shiftPercentage,
        activeChildren
      );
    } else if (state === "partner") {
      return styleBtn.godPartner(
        index - childrenNum,
        mirrorPartners,
        activePartners
      );
    } else if (state === "parent" || state === "partner1") {
      return index === 0 ? styleBtn.godParent(0) : styleBtn.godParent(1);
    } else if (state === "main" || state === "main_in") {
      return styleBtn.godMain;
    }
  }

  return (
    <>
      {
        <>
          {desc ? (
            <div className={Style.desc}>
              <GodDescription godInfo={godInfo?.god} />
            </div>
          ) : (
            <>
              <div className={Style.info}>
                {console.log("GODS", gods)}
                {gods.map((god, index) => {
                  var key;
                  if (
                    god.state === "partner" ||
                    god.state === "parent" ||
                    god.state === "main" ||
                    god.state === "main_out"
                  )
                    key = god.name + "_partner";
                  else key = god.name;
                  return (
                    <GodButton
                      key={key}
                      id={key}
                      name={god.name}
                      index={index}
                      state={god.state}
                      style={getStyle(god.state, index)}
                      isSelected={
                        god.state === "main" || god.state === "parent"
                      }
                      handleClick={handleClick}
                    />
                  );
                })}
              </div>
            </>
          )}
        </>
      }
    </>
  );
};

export default GodInfo;
