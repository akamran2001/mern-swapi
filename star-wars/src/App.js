import "./App.css";
import Planets from "./Planets";
import Planet from "./Planet";
import Films from "./Films";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Planets></Planets>
        <Planet planet_id={3}></Planet>
        <Films></Films>
      </header>
    </div>
  );
}

export default App;
