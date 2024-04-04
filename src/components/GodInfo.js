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

  // Stores array with children of god p1 and p2
  const [godsChildren, setGodsChildren] = useState(null);

  // Tells current selected god/s
  // If only one is selected its alwasy 1 and 2 is null then
  const [selected, setSelected] = useState({
    godSelected1: null,
    godSelected2: null,
  });

  // Stores array with partners of current selected god
  const [godPartners, setGodPartners] = useState(null);
  // Tells if children should be visible or no
  const [activeChildren, setActiveChildren] = useState(true);
  // Tells if partners should be visible or no
  const [activePartners, setActivePartners] = useState(false);
  // Shift in rem, of how right or left are the children
  const [shiftChildren, setShiftChildren] = useState(shift);

  const [showPartner, setPartner] = useState({
    index: null,
    style: null,
  });
  const [showChild, setChild] = useState({
    index: null,
    style: null,
  });

  useEffect(() => {
    fetchGodInfo(parents.parent1, parents.parent2, setGodsChildren);
  }, []);

  useEffect(() => {
    setParents({
      parent1: p1,
      parent2: p2,
    });
  }, [p1, p2]);

  useEffect(() => {
    if (selected.godSelected2 === null) {
      setGodStatus({ desc: !activeChildren });
      if (selected.godSelected1 !== null) {
        fetchGodPartners(selected.godSelected1, setGodPartners);
        fetchGodParents(selected.godSelected1, setParents);
        const newIndex = godsChildren?.findIndex(
          (element) => element === selected.godSelected1
        );
        setShiftChildren(
          3.5 +
            newIndex * 9 -
            (godsChildren?.length * 7 + (godsChildren?.length - 1) * 2) / 2
        );
      } else setShiftChildren(0);
    } else {
      setGodStatus({
        p1: selected.godSelected1,
        p2: selected.godSelected2,
        desc: false,
      });
    }
  }, [selected, godsChildren]);

  useEffect(() => {
    fetchGodInfo(parents.parent1, parents.parent2, setGodsChildren);
  }, [parents]);

  useEffect(() => {
    const newIndex = godsChildren?.findIndex(
      (element) => element === selected.godSelected1
    );
    setChild({
      index: newIndex,
    });
  }, [godsChildren]);

  const onClickChild = (index) => {
    if (godsChildren[index] === selected.godSelected1)
      setSelected({ godSelected1: null, godSelected2: null });
    else setSelected({ godSelected1: godsChildren[index], godSelected2: null });

    setActiveChildren(!activeChildren);
    fetchGodPartners(godsChildren[index], setGodPartners);

    setChild({
      index: index,
    });

    if (activePartners) {
      setActivePartners(!activePartners);
    } else {
      setTimeout(() => {
        setActivePartners(!activePartners);
      }, 500);
    }
  };

  const onClickPartner = (index, total) => {
    if (index % 2 === 0) {
      setSelected({
        godSelected2: selected.godSelected1,
        godSelected1: godPartners.partners[index],
      });
    } else
      setSelected({
        godSelected2: godPartners.partners[index],
        godSelected1: selected.godSelected1,
      });
    if (showPartner.index === index) {
      setPartner({
        index: null,
        style: null,
      });
    } else {
      setPartner({
        index: index,
        style: index % 2 === 0 ? styleBtn.godParent1 : styleBtn.godParent2,
      });
    }
    setActivePartners(!activePartners);
  };

  const onClickParent = (index, total, name) => {
    if (name === selected.godSelected1) {
      setSelected({
        godSelected2: null,
        godSelected1: selected.godSelected2,
      });
    } else {
      setSelected({
        godSelected2: null,
        godSelected1: selected.godSelected1,
      });
    }

    setTimeout(() => {
      setPartner({
        index: null,
        style: null,
      });
    }, 1);

    setActivePartners(!activePartners);
  };

  return (
    <>
      {godsChildren && (
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
                <div className={Style.info}>
                  {godsChildren.map((child, index) => {
                    return (
                      <GodButton
                        key={child + "_child"}
                        name={child}
                        index={index}
                        total={godsChildren.length}
                        style={
                          showPartner.index !== null
                            ? showPartner.style === styleBtn.godParent2
                              ? styleBtn.godParent1
                              : styleBtn.godParent2
                            : styleBtn.godChild(
                                index,
                                godsChildren.length,
                                shiftChildren
                              )
                        }
                        isActive={activeChildren}
                        isSelected={index === showChild.index ? true : false}
                        handleClick={onClickChild}
                      />
                    );
                  })}
                  <div className={Style.partners}>
                    {godPartners?.partners.map((partner, index) => (
                      <GodButton
                        key={partner + "_partner"}
                        name={partner}
                        index={index}
                        isActive={activePartners}
                        handleClick={onClickPartner}
                        style={
                          showPartner.index === index
                            ? showPartner.style
                            : styleBtn.godPartner(index)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default GodInfo;
