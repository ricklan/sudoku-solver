import "./App.css";
import { SudokuBoard } from "./SudokuBoard";
import { BoardUse } from "./BoardUse";

function App() {
  return (
    <div className="App">
      <SudokuBoard />
      <BoardUse />
    </div>
  );
}

export default App;
