// import axios from "axios";
import "./SudokuBoard.css";
import Cell from "./Cell";

// axios.defaults.baseURL = "https://online-sudoku-solver.herokuapp.com";

export function SudokuBoard() {
  let board = [...Array(9)].map((i, x) => {
    return [...Array(9)].map((j, y) => {
      return new Cell("", false, x, y);
    });
  });

  console.log(board);

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

  // const updateCell = (e) => {
  //   let x = parseInt(e.target.id.substring(0, 1));
  //   let y = parseInt(e.target.id.substring(2, 3));
  //   if (e.key >= "1" && e.key <= "9") {
  //     board[x][y] = e.key;
  //     e.target.value = e.key;
  //   } else if (board[x][y] === "") {
  //     e.target.value = " ";
  //   }
  // };

  const findSelected = () => {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (board[x][y].selected) {
          return board[x][y];
        }
      }
    }
    return null;
  };

  const highlightCell = (cell) => {
    let curSelCell = findSelected();
    if (curSelCell) {
      curSelCell.toggleHighlight();
      document
        .querySelector(`#c${curSelCell.x}-${curSelCell.y}`)
        .classList.remove("cell-highlight");
    }
    cell.classList.add("cell-highlight");
    let x = cell.id.substring(1, 2);
    let y = cell.id.substring(3, 4);
    board[x][y].toggleHighlight();
  };

  const processKeyDown = (e) => {
    let x = parseInt(e.target.id.substring(1, 2));
    let y = parseInt(e.target.id.substring(3, 4));
    if (e.key >= "1" && e.key <= "9") {
      board[x][y].value = e.key;
      console.log(board[x][y]);
      e.target.innerHTML = e.key;
    }
  };

  return (
    <>
      <h1>Enter values for the sudoku board</h1>
      <ul id="sudoku-board">
        {board.map((row, x) => {
          return row.map((cell, y) => {
            return (
              <li
                className="cell"
                id={`c${x}-${y}`}
                key={`${x}-${y}`}
                onClick={(e) => highlightCell(e.target)}
                onKeyDown={(e) => processKeyDown(e)}
                tabIndex="0"
              ></li>
            );
          });
        })}
      </ul>
      <div id="board-menu">
        <button onClick={(e) => processBoard(e)}>Submit</button>
        <button>Clear</button>
      </div>
      {/* </form> */}
    </>
  );
}
