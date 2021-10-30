import "./App.css";
import { SudokuBoard } from "../SudokuBoard/SudokuBoard";
import { BoardUse } from "../BoardUse";
import { Header } from "../Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div id="board-and-rules">
        <SudokuBoard />
        <BoardUse />
      </div>
    </div>
  );
}

export default App;
