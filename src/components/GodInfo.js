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
} from "./fetchInfo.js";

const GodInfo = ({
  p1,
  p2,
  s1,
  s2,
  desc,
  shift,
  setGodStatus,
  setChildClick,
  setMainClick,
}) => {
  // const [error, setError] = useState(null); TO DO
  const [shiftPercentage, setShiftPercentage] = useState(0);

  // console.log(p1, p2, s1, s2, desc);

  // Stores parents of current children or selected god
  const [parents, setParents] = useState({
    parent1: p1,
    parent2: p2,
  });

  const [activeChildren, setActiveChildren] = useState(true);
  const [activePartners, setActivePartners] = useState(false);

  const [gods, setGods] = useState([]);
  // const [godsState, setGodsState] = useState({});

  useEffect(() => {
    // gods.map((god) => {
    //   console.log("god", god);
    // });
  }, [gods]);

  // useEffect(() => {
  //   setParents({
  //     parent1: p1,
  //     parent2: p2,
  //   });
  // }, [p1, p2]);

  useEffect(() => {
    setSelected({
      godSelected1: s1,
      godSelected2: s2,
    });
  }, [s1, s2]);

  // Tells current selected god/s
  // If only one is selected its alwasy 1 and 2 is null then
  const [selected, setSelected] = useState({
    godSelected1: null,
    godSelected2: null,
  });

  // Stores array with the god information
  const [godInfo, setGodInfo] = useState(null);

  // Stores array with children of god p1 and p2
  const [childrenNum, setChildrenNum] = useState(0);
  const [partnersNum, setPartnersNum] = useState(0);

  // useEffect(() => {
  //   console.log("childrenNum", childrenNum);
  // }, [childrenNum]);

  // Stores array with partners of current selected god
  const [godPartners, setGodPartners] = useState(null);

  // Bool to either mirror parents or no
  const [mirrorPartners, setMirrorPartners] = useState(false);

  const [prevPartner, setPrevPartner] = useState({ name: null, right: false });

  useEffect(() => {
    if (selected.godSelected2 === null) {
      if (selected.godSelected1 === null) {
        // setActiveChildren(false);

        fetchGodChildren(
          parents.parent1,
          parents.parent2,
          gods,
          setGods,
          setChildrenNum
        );
        // setTimeout(() => {
        //   setActivePartners(true);
        // }, 250);

        // fetchGodInfo(selected.godSelected1, setGodInfo);

        setGodPartners(null);
      } else {
        fetchGodPartners(selected.godSelected1, gods, setGods);
        setTimeout(() => {
          setActivePartners(true);
        }, 250);
        // fetchGodInfo(selected.godSelected1, setGodInfo);
        // if (prevPartner.name !== null)
        // fetchGodParents(selected.godSelected1, parents, gods, setGods);
      }
    }
  }, [selected]);

  useEffect(() => {
    fetchGodChildren(
      parents.parent1,
      parents.parent2,
      gods,
      setGods,
      setChildrenNum
    );
  }, [parents]);

  useEffect(() => {}, [shiftPercentage]);

  useEffect(() => {
    if (prevPartner.name !== null && godPartners !== null) {
      const newIndex = godPartners.partners?.findIndex(
        (element) => element === prevPartner.name
      );
      if (prevPartner.right) {
        newIndex % 2 === 0 ? setMirrorPartners(true) : setMirrorPartners(false);
      } else {
        newIndex % 2 === 0 ? setMirrorPartners(false) : setMirrorPartners(true);
      }
    }
  }, [godPartners]);

  const handleClick = (index, name, state) => {
    console.log(index, name, state);
    if (state === "child") return onClickChild(index);
    else if (state === "main") return onClickMain(index);
    else if (state === "partner") return onClickPartner(index);
  };
  const onClickChild = (index) => {
    // setChildClick({ child: godsChildren[index], parents: parents });
    window.scrollTo(0, 100);
    setShiftPercentage(
      3.5 + index * 9 - (childrenNum * 7 + (childrenNum - 1) * 2) / 2
    );
    // setGodStatus({ p1: null, p2: null, desc: true, s1: null, s2: null });

    setSelected({ godSelected1: gods[index].name, godSelected2: null });
    setActiveChildren(false);
    const updatedGods = [...gods]; // Create a copy of gods array
    updatedGods[index] = { ...updatedGods[index], state: "main" }; // Update the specific element
    setGods(updatedGods);
    setTimeout(() => {
      setActivePartners(true);
    }, 500);

    return [styleBtn.godMain, "main"];
  };

  const onClickMain = (index) => {
    setMainClick(parents);
    setActiveChildren(true);
    const updatedGods = [...gods]; // Create a copy of gods array
    updatedGods[index] = { ...updatedGods[index], state: "child" }; // Update the specific element
    setGods(updatedGods);
    setShiftPercentage(0);
    setPrevPartner({ name: null, right: false });
    setMirrorPartners(false);
    setSelected({ godSelected1: null, godSelected2: null });
    // setGodStatus({ p1: null, p2: null, desc: false, s1: null, s2: null });
    return [styleBtn.godChild(index, childrenNum, 0, activeChildren), "child"];
  };

  const onClickPartner = (index) => {
    // setGodStatus({
    //   p1: godPartners.partners[index],
    //   p2: selected.godSelected1,
    //   desc: false,
    //   s1: null,
    //   s2: null,
    // });

    if (mirrorPartners) {
      if ((index - childrenNum - 1) % 2 === 0) {
        setSelected({
          godSelected2: gods[index],
          godSelected1: selected.godSelected1,
        });
        setGods([
          { name: selected.godSelected1, state: "parent" },
          { name: gods[index].name, state: "parent" },
        ]);
      } else {
        setSelected({
          godSelected2: selected.godSelected1,
          godSelected1: gods[index],
        });
        setGods([
          { name: gods[index].name, state: "parent" },
          { name: selected.godSelected1, state: "parent" },
        ]);
      }
    } else {
      if ((index - childrenNum - 1) % 2 === 0) {
        setSelected({
          godSelected2: selected.godSelected1,
          godSelected1: gods[index],
        });
        setGods([
          { name: gods[index].name, state: "parent" },
          { name: selected.godSelected1, state: "parent" },
        ]);
      } else {
        setSelected({
          godSelected2: gods[index],
          godSelected1: selected.godSelected1,
        });
        setGods([
          { name: selected.godSelected1, state: "parent" },
          { name: gods[index].name, state: "parent" },
        ]);
      }
    }
    setGodPartners(null);
    return [styleBtn.godParent(index), "partner"];
  };

  const onClickParent = (index, name) => {
    // fetchGodInfo(parents.parent1, parents.parent2, setGodsChildren);

    // name === selected.godSelected1
    //   ? setAnimation({ active: true, left: true })
    //   : setAnimation({ active: true, left: false });

    setGodStatus({ p1: null, p2: null, desc: true, s1: null, s2: null });
    if (name === selected.godSelected1) {
      setPrevPartner({ name: name, right: false });
      setSelected({
        godSelected2: null,
        godSelected1: selected.godSelected2,
      });
    } else {
      setPrevPartner({ name: name, right: true });
      setSelected({
        godSelected2: null,
        godSelected1: selected.godSelected1,
      });
    }
  };

  function getStyle(state, index) {
    // console.log("activeChildren", activeChildren);
    if (state === "child") {
      return styleBtn.godChild(
        index,
        childrenNum,
        shiftPercentage,
        activeChildren || gods[index].name === selected.godSelected1
      );
    } else if (state === "partner") {
      return styleBtn.godPartner(
        index - childrenNum,
        mirrorPartners,
        activePartners
      );
    } else if (state === "parent") {
      return index === 0 ? styleBtn.godParent(1) : styleBtn.godParent(0);
    } else if (state === "main") {
      return styleBtn.godMain;
    }
  }

  function getClick(state) {
    if (state === "child") {
      return onClickChild;
    } else if (state === "partner") {
      return onClickPartner;
    } else if (state === "parent") {
    } else if (state === "main") {
      return onClickMain;
    }
  }
  function getLength(state) {
    if (state === "child") {
      return childrenNum;
    } else if (state === "partner") {
    } else if (state === "parent") {
    } else if (state === "main") {
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
                {/* {console.log("gods", gods)} */}
                {/* {console.log("gods", gods)} */}
                {gods.map((god, index) => {
                  const key = god.state === "child" ? god.name : god.name;
                  return (
                    <GodButton
                      key={key}
                      id={god.name + "_" + god.state}
                      name={god.name}
                      index={index}
                      state={god.state}
                      total={getLength(god)}
                      style={getStyle(god.state, index)}
                      isSelected={
                        god.name === selected.godSelected1 ||
                        god.name === selected.godSelected2
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
