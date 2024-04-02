import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "./GodInfo.module.css";
import GodButton from "./GodButton";
import GodDescription from "./GodDescription";

const GodInfo = () => {
  const [godInfo, setGodInfo] = useState(null);
  const [twoSelected, setTwoSelected] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    selectedCount % 2 === 0 ? setTwoSelected(true) : setTwoSelected(false);
    console.log("ASDS", twoSelected);
  });

  useEffect(() => {
    const fetchGodInfo = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4005/api/gods/Zeus");
        setGodInfo(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGodInfo();
    setGodInfo({
      god: ["God"],
      partners: [
        "Partner1",
        "Partner2",
        "Partner3",
        "Partner4",
        "Partner5",
        "Partner6",
      ],
      childrenNames: [
        "Child1",
        "Child2",
        "Child3",
        "Child4",
        "Child5",
        "Child6",
      ],
    });

    // Clean-up function for component unmounting
    return () => {
      // Any clean-up actions if needed
    };
  }, []);
  function calPosPartner(index) {
    const radius = 12; // Radius of the semicircle
    const centerX = 50; // X-coordinate of the center of the semicircle
    const centerY = 15;
    if (index % 2 === 0) {
      const angleIncrement = Math.PI / 25; // Increment angle for each element
      const angle = angleIncrement * index;
      // Calculate position based on angle and radius
      const x = centerX - radius * Math.cos(angle);
      const y = centerY - radius * Math.sin(angle);
      return { x, y, angle };
    } else {
      const angleIncrement = -Math.PI / 25; // Decrement angle for each element (counterclockwise)
      const angle = angleIncrement * (index - 1);
      // Calculate position based on angle and radius
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { x, y, angle };
    }
  }
  return (
    <>
      <div>{selectedCount}</div>
      {godInfo && (
        <div className={Style.info}>
          {/* <div className="info-parents"></div> */}
          {/* <div className={Style.infoRelatives}> */}
          {godInfo.partners.map((partner, index) => {
            return (
              <GodButton
                key={partner}
                name={partner}
                setSelectedCount={setSelectedCount}
                selectedCount={selectedCount}
                style={
                  twoSelected
                    ? {
                        top: index === 0 ? `15%` : "-50%",
                        left:
                          index === 0
                            ? `calc(42.5% - 3.5rem)`
                            : `calc(${calPosPartner(index).x}% - 3.5rem)`,
                        rotate: `${calPosPartner(index).angle}rad`,
                      }
                    : {
                        top: `${calPosPartner(index).y}%`,
                        left: `calc(${calPosPartner(index).x}% - 3.5rem)`,
                        rotate: `${calPosPartner(index).angle}rad`,
                      }
                }
              />
            );
          })}
          {/* </div> */}
          {/* <div className={Style.infoGod}> */}
          <GodButton
            name={godInfo.god}
            setSelectedCount={setSelectedCount}
            selectedCount={selectedCount}
            style={{
              top: "15%",
              left: twoSelected ? `calc(57.5% - 3.5rem)` : "calc(50% - 3.5rem)",
            }}
          />
          {/* </div> */}
          {/* <div className={Style.infoRelatives}> */}
          {/* <GodButton name={godInfo.god} /> */}
          {/* </div> */}
          {/* <div className={Style.infoChildren}> */}
          {godInfo.childrenNames.map((child, index) => (
            <GodButton
              key={child}
              name={child}
              setSelectedCount={setSelectedCount}
              selectedCount={selectedCount}
              style={{
                top: twoSelected ? "30%" : "100%",
                left: 20 + index * 10 + "%",
              }}
            />
          ))}
          <GodDescription twoSelected={twoSelected} />
        </div>
      )}
    </>
  );
};

export default GodInfo;
