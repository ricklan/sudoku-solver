import "./App.css";

function SudokuBoard() {
  let board = [
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
  ];

  function processBoard(e) {
    e.preventDefault();
    console.log("processing board");
  }

  function updateCell(e) {
    if (e.key >= "1" && e.key <= "9") {
      board[parseInt(e.target.id.substring(0, 1))][
        parseInt(e.target.id.substring(2, 3))
      ] = e.key;
      e.target.value = e.key;
      console.log(`cell ${e.target.id} input value ${e.key}`);
      console.log(board);
    }
  }

  return (
    <>
      <form>
        <div id="sudoku-board">
          <label htmlFor="board">Enter values for the sudoku board</label>
          {board.map((row, x) => {
            return (
              <div key={`row ${x}`}>
                <br key={row} />
                {row.map((cell, y) => {
                  return (
                    <input
                      type="text"
                      maxLength="1"
                      pattern="[1-9]"
                      id={`${x}-${y}`}
                      key={`${x}-${y}`}
                      defaultValue={board[x][y]}
                      onKeyPress={(e) => updateCell(e)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div id="board-menu">
          <button onClick={(e) => processBoard(e)}>Submit</button>
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
