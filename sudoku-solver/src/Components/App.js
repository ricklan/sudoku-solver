import "./App.css";
import { SudokuBoard } from "./SudokuBoard";
import { Controls } from "./Controls";

function App() {
  return (
    <div className="App">
      <SudokuBoard />
      <Controls />
    </div>
  );
}

export default App;
