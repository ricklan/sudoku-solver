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

  let selectCell = (cellTag) => {
    let curSelCell = findSelected();
    if (curSelCell) {
      removeHighlight(curSelCell.getTag(), "cell-highlight");
      curSelCell.toggleSelected();
    }
    highlightCell(cellTag, "cell-highlight");
    let x = cellTag.id.substring(1, 2);
    let y = cellTag.id.substring(3, 4);
    board[x][y].toggleSelected();
    cellTag.focus();
  };

  const highlightCell = (cellTag, classToAdd) => {
    cellTag.classList.add(classToAdd);
  };

  const removeHighlight = (cellTag, classToRemove) => {
    cellTag.classList.remove(classToRemove);
  };

  const processKeyDown = (e) => {
    let x = parseInt(e.target.id.substring(1, 2));
    let y = parseInt(e.target.id.substring(3, 4));
    let curSelCell = findSelected();
    if (e.key >= "1" && e.key <= "9") {
      selectCell(e.target);
      board[x][y].value = e.key;
      e.target.innerHTML = e.key;
      checkRow(x, 0, 8);
      checkColumn(y, 0, 8);
      // checkSquare(x, y);
    } else if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      processArrowKey(e, curSelCell);
    }
  };

  const checkRow = (row, start, end) => {
    for (let i = start; i <= end; i++) {
      checkSection(start, end, true, row, false, board[row][i]);
    }
  };

  const checkColumn = (y, start, end) => {
    for (let x1 = start; x1 <= end; x1++) {
      checkSection(start, end, false, y, false, board[x1][y]);
    }
  };
  const checkSection = (
    start,
    end,
    checkingRow,
    coord1,
    checkingSquare,
    cell1
  ) => {
    let isValidCell = true;
    for (let coord2 = start; coord2 <= end; coord2++) {
      let cell2;
      if (checkingRow) {
        cell2 = board[coord1][coord2];
      } else {
        cell2 = board[coord2][coord1];
      }
      if (
        !(cell1.x === cell2.x && cell1.y === cell2.y) &&
        !validateCell(cell1, cell2)
      ) {
        isValidCell = false;
      }
    }
    if (!isValidCell) {
      if (checkingSquare) {
        cell1.hasDupSquare = true;
      } else if (checkingRow) {
        cell1.hasDupRow = true;
      } else {
        cell1.hasDupCol = true;
      }
      highlightCell(cell1.getTag(), "cell-highlight-error");
    } else {
      let otherDup1;
      let otherDup2;
      if (checkingSquare) {
        cell1.hasDupSquare = false;
        otherDup1 = cell1.hasDupRow;
        otherDup2 = cell1.hasDupCol;
      } else if (checkingRow) {
        cell1.hasDupRow = false;
        otherDup1 = cell1.hasDupCol;
        otherDup2 = cell1.hasDupSquare;
      } else {
        cell1.hasDupCol = false;
        otherDup1 = cell1.hasDupRow;
        otherDup2 = cell1.hasDupSquare;
      }
      if (!otherDup1 && !otherDup2) {
        removeHighlight(cell1.getTag(), "cell-highlight-error");
      }
    }
  };

  const checkSquare = (x, y) => {
    let xRange = findXRange(x);
    let yRange = findYRange(y);
  };

  const findXRange = (x) => {
    //
  };

  const findYRange = (y) => {
    //
  };

  const validateCell = (cell1, cell2, checkingRow, checkingSquare) => {
    let isValidCell = true;
    if (cell1.value !== "" && cell2.value === cell1.value) {
      isValidCell = false;
      if (checkSquare) {
        cell2.hasDupSquare = true;
      } else if (checkingRow) {
        cell2.hasDupRow = true;
      } else {
        cell2.hasDupCol = true;
      }
      highlightCell(cell2.getTag(), "cell-highlight-error");
    }
    return isValidCell;
  };

  const move = (key, cellPos) => {
    if (cellPos === 0 && (key === "ArrowUp" || key === "ArrowLeft")) {
      return 8;
    } else if (cellPos === 8 && (key === "ArrowDown" || key === "ArrowRight")) {
      return 0;
    } else {
      if (key === "ArrowUp" || key === "ArrowLeft") {
        return cellPos - 1;
      } else {
        return cellPos + 1;
      }
    }
  };

  const processArrowKey = (e, curSelCell) => {
    let newHighlightX;
    let newHighlightY;
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      newHighlightX = move(e.key, curSelCell.x);
      newHighlightY = curSelCell.y;
    } else {
      newHighlightX = curSelCell.x;
      newHighlightY = move(e.key, curSelCell.y);
    }
    selectCell(board[newHighlightX][newHighlightY].getTag());
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
                onClick={(e) => selectCell(e.target)}
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
    </>
  );
}
