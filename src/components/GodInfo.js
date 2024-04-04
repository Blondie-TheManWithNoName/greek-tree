import React, { useState, useEffect, useRef } from "react";
import Style from "./GodInfo.module.css";
import GodButton from "./GodButton";
import GodDescription from "./GodDescription";
import { styleBtn } from "./utils.js";
import {
  fetchGodInfo,
  fetchGodPartners,
  fetchGodParents,
} from "./fetchInfo.js";

const GodInfo = ({ p1, p2, desc, shift, setGodStatus }) => {
  // const [error, setError] = useState(null); TO DO

  // Stores parents of current children or selected god
  const [parents, setParents] = useState({
    parent1: p1,
    parent2: p2,
  });
  // Tells current selected god/s
  // If only one is selected its alwasy 1 and 2 is null then
  const [selected, setSelected] = useState({
    godSelected1: null,
    index1: null,
    godSelected2: null,
  });

  // Stores array with children of god p1 and p2
  const [godsChildren, setGodsChildren] = useState(null);
  // Stores array with partners of current selected god
  const [godPartners, setGodPartners] = useState(null);
  // Tells if children should be visible or no
  const [activeChildren, setActiveChildren] = useState(true);
  // Tells if partners should be visible or no
  const [activePartners, setActivePartners] = useState(false);
  // Shift in rem, of how right or left are the children
  const [shiftChildren, setShiftChildren] = useState(shift);
  // Bool to either mirror parents or no
  const [mirrorPartners, setMirrorPartners] = useState(false);

  const [prevPartner, setPrevPartner] = useState(null);

  const [parentsAnimation, setParentsAnimation] = useState([false, false]);

  // useEffect(() => {
  //   fetchGodInfo(parents.parent1, parents.parent2, setGodsChildren);
  // }, []);

  // useEffect(() => {
  //   setParents({
  //     parent1: p1,
  //     parent2: p2,
  //   });
  // }, [p1, p2]);

  useEffect(() => {
    console.log("godsChildren", godsChildren);
  }, [godsChildren]);

  useEffect(() => {
    console.log("parents", parents);
  }, [parents]);

  useEffect(() => {
    console.log("godPartners", godPartners);
  }, [godPartners]);

  useEffect(() => {
    console.log("selected", selected);
  }, [selected]);

  useEffect(() => {
    if (selected.godSelected2 === null) {
      if (selected.godSelected1 === null) {
        setGodPartners(null);
        setShiftChildren(0);
      } else {
        fetchGodPartners(selected.godSelected1, setGodPartners);
        if (selected.index1 !== null) {
          setShiftChildren(
            3.5 +
              selected.index1 * 9 -
              (godsChildren?.length * 7 + (godsChildren?.length - 1) * 2) / 2
          );
        }
      }
      setGodStatus({ desc: !activeChildren });
    } else {
      setGodStatus({
        p1: selected.godSelected1,
        p2: selected.godSelected2,
        desc: false,
      });
    }
  }, [selected]);
  useEffect(() => {
    // console.log("parents");
    fetchGodInfo(parents.parent1, parents.parent2, setGodsChildren);
  }, [parents]);

  useEffect(() => {
    // console.log("godChildren", selected.godSelected1, selected.godSelected2);
    // if (selected.godSelected1 !== null && godsChildren !== null) {
    //   const newIndex = godsChildren?.findIndex(
    //     (element) => element === selected.godSelected1
    //   );
    //   setShiftChildren(
    //     3.5 +
    //       newIndex * 9 -
    //       (godsChildren?.length * 7 + (godsChildren?.length - 1) * 2) / 2
    //   );
    // }
  }, [godsChildren]);

  useEffect(() => {
    // fetchGodInfo("prevPartner", prevPartner);
  }, [prevPartner]);

  useEffect(() => {
    if (prevPartner !== null && godPartners !== null) {
      const newIndex = godPartners.partners?.findIndex(
        (element) => element === prevPartner
      );
      if (newIndex % 2 === 0) setMirrorPartners(true);
    }
  }, [godPartners]);

  const onClickChild = (index) => {
    setSelected({
      godSelected1: godsChildren[index],
      index1: index,
      godSelected2: null,
    });

    // setActiveChildren(!activeChildren);

    if (activePartners) {
      // setActivePartners(!activePartners);
    } else {
      // setTimeout(() => {
      // setActivePartners(!activePartners);
      // }, 500);
    }
  };

  const onClickMain = (index) => {
    setSelected({ godSelected1: null, godSelected2: null, index1: null });
    // setActivePartners(!activePartners);
  };

  const onClickPartner = (index) => {
    setPrevPartner(null);
    setParentsAnimation([true, index]);
    // setTimeout(() => {
    if (
      (index % 2 === 0 && !mirrorPartners) ||
      (index % 2 !== 0 && mirrorPartners)
    ) {
      setSelected({
        godSelected2: selected.godSelected1,
        godSelected1: godPartners.partners[index],
        index1: index,
      });
    } else {
      setSelected({
        godSelected2: godPartners.partners[index],
        godSelected1: selected.godSelected1,
        index1: selected.index1,
      });
      setGodsChildren(null);
    }
    // }, 500);

    // Hide rest of the partners
    setActivePartners(!activePartners);
  };

  const onClickParent = (index, name) => {
    fetchGodInfo(parents.parent1, parents.parent2, setGodsChildren);
    fetchGodParents(selected.godSelected1, parents, setParents);

    setMirrorPartners(false);
    if (name === selected.godSelected1) {
      setSelected({
        godSelected2: null,
        godSelected1: selected.godSelected2,
        index1: null,
      });
    } else {
      setPrevPartner(name);
      setSelected({
        godSelected2: null,
        godSelected1: selected.godSelected1,
        index1: null,
      });
    }
    // setParentsAnimation([true, 2]);
    // setTimeout(() => {
    setParentsAnimation([false, index]);
    // }, 300);
    setActivePartners(!activePartners);
  };

  return (
    <>
      {
        <>
          {desc ? (
            <div className={Style.info}>
              <GodDescription />
            </div>
          ) : (
            <>
              {selected.godSelected2 !== null ? (
                <div className={Style.info}>
                  <GodButton
                    key={selected.godSelected1}
                    name={selected.godSelected1}
                    index={0}
                    isActive={true}
                    isSelected={true}
                    handleClick={onClickParent}
                    style={styleBtn.godParent(0)}
                  />

                  <GodButton
                    key={selected.godSelected2}
                    name={selected.godSelected2}
                    index={1}
                    isActive={true}
                    isSelected={true}
                    handleClick={onClickParent}
                    style={styleBtn.godParent(1)}
                  />
                </div>
              ) : (
                godsChildren && (
                  <div className={Style.info}>
                    {selected.godSelected1 === null ? (
                      godsChildren.map((child, index) => {
                        return (
                          <GodButton
                            key={child + "_child"}
                            name={child}
                            index={index}
                            total={godsChildren.length}
                            style={styleBtn.godChild(
                              index,
                              godsChildren.length,
                              shiftChildren
                            )}
                            isActive={activeChildren}
                            isSelected={child === selected.godSelected1}
                            handleClick={onClickChild}
                          />
                        );
                      })
                    ) : (
                      <GodButton
                        key={selected.godSelected1 + "_main"}
                        name={selected.godSelected1}
                        index={0}
                        total={godsChildren.length}
                        style={styleBtn.godMain}
                        isActive={activeChildren}
                        isSelected={true}
                        handleClick={onClickMain}
                      />
                    )}
                    <div className={Style.partners}>
                      {godPartners?.partners.map((partner, index) => {
                        return (
                          <GodButton
                            key={partner + "_partner"}
                            name={partner}
                            index={index}
                            isActive={activePartners}
                            handleClick={onClickPartner}
                            style={styleBtn.godPartner(index, mirrorPartners)}
                          />
                        );
                      })}
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </>
      }
    </>
  );
};

export default GodInfo;
