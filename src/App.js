import logo from "./logo.svg";
import Style from "./App.module.css";
import GodInfo from "./components/GodInfo";
import { useState, useEffect } from "react";

function App() {
  const [godStatus1, setGodStatus1] = useState({
    p1: "Kronos",
    p2: "Rhea",
    s1: "Kronos",
    s2: "Rhea",
    desc: false,
  });

  const [godStatus2, setGodStatus2] = useState({
    p1: "Rhea",
    p2: "Kronos",
    s1: null,
    s2: null,
    desc: false,
  });

  const [childClick, setChildClick] = useState({ child: null, parents: null });
  const [mainClick, setMainClick] = useState(null);

  useEffect(() => {
    // console.log("godStatus2", godStatus2);
  }, [godStatus2]);

  useEffect(() => {
    // if (childClick.child !== null) {
    //   // console.log("childClick", childClick);
    //   setGodStatus1({
    //     p1: childClick.parents.parent1,
    //     p2: childClick.parents.parent2,
    //     s1: childClick.child,
    //     s2: null,
    //     desc: false,
    //   });
    //   setGodStatus2({
    //     p1: null,
    //     p2: null,
    //     s1: childClick.child,
    //     s2: null,
    //     desc: true,
    //   });
    // }
  }, [childClick]);

  useEffect(() => {
    // if (mainClick !== null) {
    //   // console.log("mainClick", mainClick);
    //   setGodStatus1({
    //     p1: mainClick.parent1,
    //     p2: mainClick.parent2,
    //     s1: mainClick.parent1,
    //     s2: mainClick.parent2,
    //     desc: false,
    //   });
    //   setGodStatus2({
    //     p1: mainClick.parent1,
    //     p2: mainClick.parent2,
    //     s1: null,
    //     s2: null,
    //     desc: false,
    //   });
    // }
  }, [mainClick]);

  return (
    <div className={Style.App}>
      <header className={Style.Header}>
        <h1 className={Style.Title}>THEOGONY</h1>
        <hr />
        <h2 className={Style.SubTitle}>Greek Gods Bloodline</h2>
      </header>
      <div className={Style.Divider}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          // stroke="black"
          // strokeWidth={"1rem"}
        >
          <defs>
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsla(60, 20%, 99%, 1)" />
              <stop offset="41%" stopColor="hsla(211, 78%, 62%, 1)" />
              <stop offset="59%" stopColor="hsla(211, 78%, 62%, 1)" />
              <stop offset="100%" stopColor="hsla(60, 20%, 99%, 1)" />
            </linearGradient>
          </defs>
          <path
            d="M0 0L0 800L1200 800L1200 0L598.97 285.28L0 0z"
            fill="url(#myGradient)"
          ></path>
        </svg>
      </div>
      <main className={Style.Main}>
        {/* <GodInfo p1="Kronos" p2="Rhea" shift={0} setGodStatus={setGodStatus} /> */}
        {/* <GodInfo
          p1={godStatus1.p1}
          p2={godStatus1.p2}
          s1={godStatus1.s1}
          s2={godStatus1.s2}
          desc={godStatus1.desc}
          shift={0}
          setGodStatus={setGodStatus2}
          setChildClick={setChildClick}
          setMainClick={setMainClick}
        /> */}
        <GodInfo
          p1={godStatus2.p1}
          p2={godStatus2.p2}
          s1={godStatus2.s1}
          s2={godStatus2.s2}
          desc={godStatus2.desc}
          shift={0}
          setGodStatus={setGodStatus1}
          setChildClick={setChildClick}
          setMainClick={setMainClick}
        />
      </main>
    </div>
  );
}

export default App;
