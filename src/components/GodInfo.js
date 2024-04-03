import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Style from "./GodInfo.module.css";
import GodButton from "./GodButton";
import GodDescription from "./GodDescription";
import { styleBtn } from "./utils.js";

const GodInfo = ({ p1, p2, desc, shift, setGodStatus }) => {
  const [godInfo, setGodInfo] = useState(null);
  const [godName, setGodName] = useState(null);
  const [children, setChildren] = useState(true);
  const [twoSelected, setTwoSelected] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [godPartners, setGodPartners] = useState(null);
  const [error, setError] = useState(null);
  const divRef = useRef(null);

  const [showGodInfo, setShowGodInfo] = useState(null);
  const [selected, setSelected] = useState({
    godSelected1: null,
    godSelected2: null,
  });
  const [parents, setParents] = useState();

  useEffect(() => {
    setParents({
      parent1: p1,
      parent2: p2,
    });
    fetchGodInfo();

    // Clean-up function for component unmounting
    return () => {
      // Any clean-up actions if needed
    };
  }, []);

  useEffect(() => {
    setParents({
      parent1: p1,
      parent2: p2,
    });
  }, [p1, p2]);

  useEffect(() => {
    if (selected.godSelected2 == null)
      setGodStatus({ desc: !activeButtonChild });
    else
      setGodStatus({
        p1: selected.godSelected1,
        p2: selected.godSelected2,
        desc: false,
      });
  }, [selected]);

  useEffect(() => {
    fetchGodPartners(godName);
    fetchGodParents(godName);
  }, [godName]);

  useEffect(() => {
    fetchGodInfo();
  }, [parents]);

  useEffect(() => {
    const newIndex = godInfo?.findIndex((element) => element === godName);
    setChild({
      index: newIndex,
    });

    if (selected.godSelected1 !== null)
      setShiftPercentage(
        3.5 +
          newIndex * 9 -
          (godInfo?.length * 7 + (godInfo?.length - 1) * 2) / 2
      );
  }, [godInfo]);

  const fetchGodInfo = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:4005/api/gods/children/" +
          parents.parent1 +
          "&" +
          parents.parent2
      );
      setGodInfo(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const [activeButtonChild, setActiveButtonChild] = useState(true);
  const [activeButtonPartner, setActiveButtonPartner] = useState(false);
  const [shiftPercentage, setShiftPercentage] = useState(shift);

  const [showPartner, setPartner] = useState({
    index: null,
    style: null,
  });
  const [showChild, setChild] = useState({
    index: null,
    style: null,
  });

  const fetchGodPartners = async (name) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:4005/api/gods/" + name
      );
      setGodPartners(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchGodParents = async (name) => {
    try {
      //console.log("fetchGodParents", name);
      const response = await axios.get(
        "http://127.0.0.1:4005/api/gods/parents/" + name
      );
      //console.log("response.data", response.data[0]);
      // setParents({
      //console.log("response.data.parent1", response.data[0].parent1);
      setParents({
        parent1: response.data[0].parent1,
        parent2: response.data[0].parent2,
      });
      // });
    } catch (error) {
      setError(error.message);
    }
  };
  const handleClick = (index, total) => {
    setSelected({ godSelected1: godInfo[index] });
    setActiveButtonChild(!activeButtonChild);
    // selectedButton !== index || selectedButton === null
    // setSelectedButton(index);
    // : setSelectedButton(null);

    fetchGodPartners(godInfo[index]);
    // setGodPartners({
    //   partners: [
    //     "Partner1",
    //     "Partner2",
    //     "Partner3",
    //     "Partner4",
    //     "Partner5",
    //     "Partner6",
    //   ],
    // });

    setChild({
      index: index,
    });

    children
      ? setShiftPercentage(3.5 + index * 9 - (total * 7 + (total - 1) * 2) / 2)
      : setShiftPercentage(0);

    if (activeButtonPartner) {
      setActiveButtonPartner(!activeButtonPartner);
      setChildren(!children);
    } else {
      setChildren(!children);
      setTimeout(() => {
        setActiveButtonPartner(!activeButtonPartner);
      }, 500);
    }
  };

  const handleClickPartner = (index, total) => {
    setTimeout(() => {
      setTwoSelected(!twoSelected);
    }, 500);

    if (index % 2 === 0) {
      setSelected({
        godSelected2: selected.godSelected1,
        godSelected1: godPartners.partners[index],
      });
    } else
      setSelected({
        godSelected1: selected.godSelected1,
        godSelected2: godPartners.partners[index],
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
    setActiveButtonPartner(!activeButtonPartner);
  };

  const handleClickParent = (index, total, name) => {
    // setActiveButtonChild(!activeButtonChild);
    // setGodName(name);

    setGodName(
      selected.godSelected1 == name
        ? selected.godSelected2
        : selected.godSelected1
    );

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
    // //console.log("handleClickParent1", godInfo);
    // //console.log("handleClickParent2", godInfo);
    // //console.log("handleClickParent3", godInfo);

    // setTimeout(() => {
    setPartner({
      index: null,
      style: null,
    });
    // }, 1);

    setTwoSelected(!twoSelected);
    setActiveButtonPartner(!activeButtonPartner);
  };

  return (
    <>
      {godInfo && (
        <>
          {desc ? (
            <div className={Style.info} ref={divRef}>
              <GodDescription />
            </div>
          ) : (
            <>
              {twoSelected ? (
                <div className={Style.info}>
                  <GodButton
                    key={selected.godSelected1}
                    name={selected.godSelected1}
                    index={0}
                    isActive={true}
                    isSelected={true}
                    handleClick={handleClickParent}
                    twoSelected={twoSelected}
                    style={styleBtn.godParent(0)}
                  />

                  <GodButton
                    key={selected.godSelected2}
                    name={selected.godSelected2}
                    index={1}
                    isActive={true}
                    isSelected={true}
                    handleClick={handleClickParent}
                    twoSelected={twoSelected}
                    style={styleBtn.godParent(1)}
                  />
                </div>
              ) : (
                <div className={Style.info} ref={divRef}>
                  {godInfo.map((child, index) => {
                    //console.log("showChild.index", index === showChild.index);
                    return (
                      <GodButton
                        key={child + "_child"}
                        name={child}
                        index={index}
                        total={godInfo.length}
                        style={
                          showPartner.index !== null
                            ? showPartner.style === styleBtn.godParent2
                              ? styleBtn.godParent1
                              : styleBtn.godParent2
                            : styleBtn.godChild(
                                index,
                                godInfo.length,
                                shiftPercentage
                              )
                        }
                        isActive={activeButtonChild}
                        isSelected={index === showChild.index ? true : false}
                        twoSelected={twoSelected}
                        handleClick={handleClick}
                      />
                    );
                  })}
                  <div className={Style.partners}>
                    {godPartners?.partners.map((partner, index) => (
                      <GodButton
                        key={partner + "_partner"}
                        name={partner}
                        index={index}
                        isActive={activeButtonPartner}
                        handleClick={handleClickPartner}
                        twoSelected={twoSelected}
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
