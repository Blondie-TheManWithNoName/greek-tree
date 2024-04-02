import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Style from "./GodInfo.module.css";
import GodButton from "./GodButton";
import GodDescription from "./GodDescription";
import { styleBtn } from "./utils.js";

const GodInfo = ({ name, desc, shift }) => {
  const [godInfo, setGodInfo] = useState(null);
  const [children, setChildren] = useState(true);
  const [twoSelected, setTwoSelected] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [godPartners, setGodPartners] = useState(null);
  const [error, setError] = useState(null);
  const divRef = useRef(null);
  const [godName, setGodName] = useState(name);

  const [parents, setParents] = useState({
    parent1: "parent1",
    parent2: "parent2",
  });

  useEffect(() => {
    fetchGodInfo();

    // Clean-up function for component unmounting
    return () => {
      // Any clean-up actions if needed
    };
  }, []);

  const fetchGodInfo = async () => {
    console.log("HOLA", godName);
    try {
      const response = await axios.get(
        "http://127.0.0.1:4005/api/gods/" + godName
      );
      setGodInfo(response.data);
    } catch (error) {
      setError(error.message);
    }

    // setGodInfo({
    //   god: ["God"],

    //   childrenNames: [
    //     "Child1",
    //     "Child2",
    //     "Child3",
    //     "Child4",
    //     "Child5",
    //     "Child6",
    //     "Child7",
    //   ],
    // });
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

  const handleClick = (index, total) => {
    setParents({ parent1: godInfo.childrenNames[index] });
    setActiveButtonChild(!activeButtonChild);
    // selectedButton !== index || selectedButton === null
    // setSelectedButton(index);
    // : setSelectedButton(null);

    const fetchGodPartners = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4005/api/gods/" + godInfo.childrenNames[index]
        );
        setGodPartners(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGodPartners();

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
      parents.parent2 = parents.parent1;
      parents.parent1 = godPartners.partners[index];
    } else parents.parent2 = godPartners.partners[index];
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
    setGodName(name);
    fetchGodInfo();
    setTimeout(() => {
      setPartner({
        index: null,
        style: null,
      });
    }, 1);
    // setChild({
    //   index: index,
    // });
    console.log("godInfo", godInfo.childrenNames);
    console.log("name", name);
    const newIndex = godInfo.childrenNames.findIndex(
      (element) => element === name
    );
    console.log("name", newIndex);

    // setShiftPercentage(3.5 + index * 9 - (total * 7 + (total - 1) * 2) / 2);
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
                    key={parents.parent1}
                    name={parents.parent1}
                    index={0}
                    isActive={true}
                    isSelected={true}
                    handleClick={handleClickParent}
                    twoSelected={twoSelected}
                    style={styleBtn.godParent(0)}
                  />

                  <GodButton
                    key={parents.parent2}
                    name={parents.parent2}
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
                  {godInfo.childrenNames.map((child, index) => (
                    <GodButton
                      key={child}
                      name={child}
                      index={index}
                      total={godInfo.childrenNames.length}
                      style={
                        showPartner.index !== null
                          ? showPartner.style === styleBtn.godParent2
                            ? styleBtn.godParent1
                            : styleBtn.godParent2
                          : styleBtn.godChild(
                              index,
                              godInfo.childrenNames.length,
                              shiftPercentage
                            )
                      }
                      isActive={activeButtonChild}
                      isSelected={index === showChild.index ? true : false}
                      twoSelected={twoSelected}
                      handleClick={handleClick}
                    />
                  ))}
                  <div className={Style.partners}>
                    {godPartners?.partners.map((partner, index) => (
                      <GodButton
                        key={partner}
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
