import logo from "./logo.svg";
import Style from "./App.module.css";
import GodInfo from "./components/GodInfo";

function App() {
  return (
    <div className={Style.App}>
      <header className={Style.Header}></header>
      <main className={Style.Main}>
        <GodInfo name="Hera" desc={true} shift={0} />
        <GodInfo name="Zeus" shift={0} />
        {/* <GodInfo /> */}
      </main>
    </div>
  );
}

export default App;
