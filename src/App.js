import logo from "./logo.svg";
import Style from "./App.module.css";
import GodInfo from "./components/GodInfo";
import { useState, useEffect } from "react";

function App() {
  const [godStatus, setGodStatus] = useState({
    p1: null,
    p2: null,
    desc: false,
  });

  return (
    <div className={Style.App}>
      <header className={Style.Header}></header>
      <main className={Style.Main}>
        <GodInfo p1="Kronos" p2="Rhea" shift={0} setGodStatus={setGodStatus} />
        <GodInfo
          p1={godStatus.p1}
          p2={godStatus.p2}
          desc={godStatus.desc}
          shift={0}
          setGodStatus={setGodStatus}
        />
        {/* <GodInfo /> */}
      </main>
    </div>
  );
}

export default App;
