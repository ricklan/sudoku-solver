import "../css/App.css";
import { SudokuBoard } from "./SudokuBoard";
import { BoardUse } from "./BoardUse";
import { Header } from "./Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <SudokuBoard />
      <BoardUse />
    </div>
  );
}

export default App;
