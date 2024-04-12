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
    godSelected2: null,
  });

  // Stores array with children of god p1 and p2
  const [godsChildren, setGodsChildren] = useState(null);
  // Stores array with partners of current selected god
  const [godPartners, setGodPartners] = useState(null);

  // Bool to either mirror parents or no
  const [mirrorPartners, setMirrorPartners] = useState(false);

  const [prevPartner, setPrevPartner] = useState({ name: null, right: false });

  useEffect(() => {
    if (selected.godSelected2 === null) {
      if (selected.godSelected1 === null) {
        setGodPartners(null);
      } else {
        fetchGodPartners(selected.godSelected1, setGodPartners);

        if (prevPartner !== null)
          fetchGodParents(selected.godSelected1, parents, setParents);
      }
    } else {
      setGodStatus({
        p1: selected.godSelected1,
        p2: selected.godSelected2,
        desc: false,
      });
    }
  }, [selected]);
  useEffect(() => {
    fetchGodInfo(parents.parent1, parents.parent2, setGodsChildren);
  }, [parents]);

  useEffect(() => {
    console.log("prevPartner", prevPartner);
    // if (prevPartner !== null) {
    // setMirrorPartners(prevPartner.right);
    // } else setMirrorPartners(false);
  }, [prevPartner]);

  useEffect(() => {
    console.log("godPartners");
    if (prevPartner !== null && godPartners !== null) {
      const newIndex = godPartners.partners?.findIndex(
        (element) => element === prevPartner.name
      );
      console.log("newIndex", newIndex);
      if (prevPartner.right) {
        if (newIndex % 2 === 0) setMirrorPartners(true);
        else setMirrorPartners(false);
      } else {
        if (newIndex % 2 === 0) setMirrorPartners(false);
        else setMirrorPartners(true);
      }
    }
  }, [godPartners]);

  const onClickChild = (index) => {
    setSelected({
      godSelected1: godsChildren[index],
      godSelected2: null,
    });
  };

  const onClickMain = (index) => {
    setSelected({ godSelected1: null, godSelected2: null });
  };

  const onClickPartner = (index) => {
    setPrevPartner(null);
    if (mirrorPartners) {
      if (index % 2 === 0) {
        console.log("1");
        setSelected({
          godSelected2: godPartners.partners[index],
          godSelected1: selected.godSelected1,
        });
      } else {
        console.log("2");
        setSelected({
          godSelected2: selected.godSelected1,
          godSelected1: godPartners.partners[index],
        });
      }
    } else {
      if (index % 2 === 0) {
        console.log("1!");
        setSelected({
          godSelected2: selected.godSelected1,
          godSelected1: godPartners.partners[index],
        });
      } else {
        console.log("2!");
        setSelected({
          godSelected2: godPartners.partners[index],
          godSelected1: selected.godSelected1,
        });
      }
    }
    setGodPartners(null);
  };

  const onClickParent = (index, name) => {
    // fetchGodInfo(parents.parent1, parents.parent2, setGodsChildren);
    console.log("name", name);
    console.log("selected.godSelected1", selected.godSelected1);
    console.log("selected.godSelected2", selected.godSelected2);
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
                              0
                            )}
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
