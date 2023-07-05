import "./App.css";
import Planets from "./Planets";
import Planet from "./Planet";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Planets></Planets>
        <Planet planet_id={1}></Planet>
      </header>
    </div>
  );
}

export default App;
