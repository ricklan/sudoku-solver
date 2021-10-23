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
      checkRow(x);
      checkColumn(y);
      checkSquare(x, y);
    } else if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      processArrowKey(e, curSelCell);
    }
  };

  const checkRow = (row) => {
    board[row].forEach((curCell, i) => {
      let isValidCell = true;
      for (let j = 0; j < 8; j++) {
        if (i !== j && !validateCell(curCell, board[row][j])) {
          isValidCell = false;
        }
      }
      if (!isValidCell) {
        curCell.hasDupRow = true;
        highlightCell(curCell.getTag(), "cell-highlight-error");
      } else {
        curCell.hasDupRow = false;
        if (!curCell.hasDupCol && !curCell.hasDupSquare) {
          removeHighlight(curCell.getTag(), "cell-highlight-error");
        }
      }
    });
  };

  const checkColumn = (y) => {
    board.forEach((row1, x1) => {
      let isValidCell = true;
      board.forEach((row2, x2) => {
        if (x1 !== x2 && !validateCell(board[x1][y], board[x2][y])) {
          isValidCell = false;
        }
      });
      if (!isValidCell) {
        board[x1][y].hasDupCol = true;
        highlightCell(board[x1][y].getTag(), "cell-highlight-error");
      } else {
        board[x1][y].hasDupCol = false;
        if (!board[x1][y].hasDupRow && !board[x1][y].hasDupSquare) {
          removeHighlight(board[x1][y].getTag(), "cell-highlight-error");
        }
      }
    });
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

  const validateCell = (cell1, cell2) => {
    let isValidCell = true;
    if (cell1.value !== "" && cell2.value === cell1.value) {
      isValidCell = false;
      cell2.hasError = true;
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
