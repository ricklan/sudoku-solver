// import axios from "axios";
// import axios from "axios";

// axios.defaults.baseURL = "https://online-sudoku-solver.herokuapp.com";

export function SudokuBoard() {
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
  //https://online-sudoku-solver.herokuapp.com/api/solvePuzzle
  const processBoard = (e) => {
    e.preventDefault();
    const axios = require("axios");
    axios
      .post(
        "https://online-sudoku-solver.herokuapp.com/api/solvePuzzle",
        board,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateCell = (e) => {
    if (e.key >= "1" && e.key <= "9") {
      board[parseInt(e.target.id.substring(0, 1))][
        parseInt(e.target.id.substring(2, 3))
      ] = parseInt(e.key);
      e.target.value = e.key;
    }
  };

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
                      defaultValue=""
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
