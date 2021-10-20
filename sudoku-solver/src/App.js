import "./App.css";

function SudokuBoard() {
  let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  return (
    <>
      <form>
        <div id="sudoku-board">
          <label for="board">Enter values for the sudoku board</label>
          {board.map((row, x) => {
            return (
              <>
                <br />
                {row.map((cell, y) => {
                  return (
                    <input
                      type="text"
                      maxlength="1"
                      pattern="[0-9]"
                      id={`${x}-${y}`}
                    />
                  );
                })}
              </>
            );
          })}
        </div>
        <div id="board-menu">
          <button>Submit</button>
          <button>Clear</button>
        </div>
      </form>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <SudokuBoard />
    </div>
  );
}

export default App;
