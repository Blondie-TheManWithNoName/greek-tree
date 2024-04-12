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

const GodInfo = ({
  p1,
  p2,
  s1,
  s2,
  desc,
  shift,
  setGodStatus,
  setChildClick,
}) => {
  // const [error, setError] = useState(null); TO DO

  // Stores parents of current children or selected god
  const [parents, setParents] = useState({
    parent1: p1,
    parent2: p2,
  });

  useEffect(() => {
    setParents({
      parent1: p1,
      parent2: p2,
    });
  }, [p1, p2]);

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
        console.log("AS");
        fetchGodPartners(selected.godSelected1, setGodPartners);

        if (prevPartner.name !== null)
          fetchGodParents(selected.godSelected1, parents, setParents);
      }
    }
  }, [selected]);
  useEffect(() => {
    console.log("FETCH", parents.parent1, parents.parent2);
    fetchGodInfo(parents.parent1, parents.parent2, setGodsChildren);
  }, [parents]);

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

  const onClickChild = (index) => {
    setChildClick(godsChildren[index]);
    setSelected({
      godSelected1: godsChildren[index],
      godSelected2: null,
    });
    setGodStatus({ p1: null, p2: null, desc: true, s1: null, s2: null });
  };

  const onClickMain = (index) => {
    setPrevPartner({ name: null, right: false });
    // setMirrorPartners(false);
    setSelected({ godSelected1: null, godSelected2: null });
    setGodStatus({ p1: null, p2: null, desc: false, s1: null, s2: null });
  };

  const onClickPartner = (index) => {
    setGodStatus({
      p1: godPartners.partners[index],
      p2: selected.godSelected1,
      desc: false,
      s1: godPartners.partners[index],
      s2: selected.godSelected1,
    });

    if (mirrorPartners) {
      if (index % 2 === 0) {
        setSelected({
          godSelected2: godPartners.partners[index],
          godSelected1: selected.godSelected1,
        });
      } else {
        setSelected({
          godSelected2: selected.godSelected1,
          godSelected1: godPartners.partners[index],
        });
      }
    } else {
      if (index % 2 === 0) {
        setSelected({
          godSelected2: selected.godSelected1,
          godSelected1: godPartners.partners[index],
        });
      } else {
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
                    {console.log("godsChildren", godsChildren)}
                    {selected.godSelected1 === null ? (
                      godsChildren.map((child, index) => (
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
                      ))
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
                      {godPartners?.partners.map((partner, index) => (
                        <GodButton
                          key={partner + "_partner"}
                          name={partner}
                          index={index}
                          handleClick={onClickPartner}
                          style={styleBtn.godPartner(index, mirrorPartners)}
                        />
                      ))}
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
