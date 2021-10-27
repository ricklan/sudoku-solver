import "./SudokuBoard.css";
import Cell from "./Cell";

export function SudokuBoard() {
  let board = [...Array(9)].map((i, x) => {
    return [...Array(9)].map((j, y) => {
      return new Cell("", false, x, y);
    });
  });

  //https://online-sudoku-solver.herokuapp.com/api/solvePuzzle
  const processBoard = (e) => {
    e.preventDefault();
    let boardArray = convertToArray();
    const axios = require("axios");
    axios
      .post("http://127.0.0.1:5000/api/solvePuzzle", { puzzle: boardArray })
      .then(function (response) {
        displayAnswer(response.data);
        document.querySelector("#error-message").innerHTML = "";
      })
      .catch(function (error) {
        console.log(error);
        document.querySelector("#error-message").innerHTML = "Invalid Puzzle";
      });
  };

  const convertToArray = () => {
    let boardArray = [];
    board.forEach((row) => {
      let newRow = [];
      row.forEach((cell) => {
        if (cell.value === "") {
          newRow.push(0);
        } else {
          newRow.push(parseInt(cell.value));
        }
      });
      boardArray.push(newRow);
    });
    return boardArray;
  };

  const displayAnswer = (answerArray) => {
    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        cell.getTag().innerHTML = answerArray[x][y];
        cell.value = answerArray[x][y];
      });
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
    let isValidCell = true;
    board[row].forEach((curCell) => {
      isValidCell = checkSection(true, false, curCell, board[row]);

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
    let isValidCell = true;
    let cellsToCheck = [];
    for (let x = 0; x <= 8; x++) {
      cellsToCheck.push(board[x][y]);
    }

    cellsToCheck.forEach((curCell) => {
      isValidCell = checkSection(false, false, curCell, cellsToCheck);

      if (!isValidCell) {
        curCell.hasDupCol = true;
        highlightCell(curCell.getTag(), "cell-highlight-error");
      } else {
        curCell.hasDupCol = false;
        if (!curCell.hasDupRow && !curCell.hasDupSquare) {
          removeHighlight(curCell.getTag(), "cell-highlight-error");
        }
      }
    });
  };

  const checkSquare = (row, col) => {
    let rowRange = findRange(row);
    let colRange = findRange(col);
    let cellsToCheck = [];
    for (let i = 0; i < 3; i++) {
      cellsToCheck.push(board[rowRange[0]][colRange[0] + i]);
      cellsToCheck.push(board[rowRange[0] + 1][colRange[0] + i]);
      cellsToCheck.push(board[rowRange[0] + 2][colRange[0] + i]);
    }
    cellsToCheck.forEach((cell) => {
      let isValidCell = true;
      for (let i = 0; i < 3; i++) {
        if (
          !checkSection(false, true, cell, cellsToCheck) ||
          !checkSection(false, true, cell, cellsToCheck)
        ) {
          isValidCell = false;
        }
      }
      if (!isValidCell) {
        cell.hasDupSquare = true;
        highlightCell(cell.getTag(), "cell-highlight-error");
      } else {
        cell.hasDupSquare = false;
        if (!cell.hasDupRow && !cell.hasDupCol) {
          removeHighlight(cell.getTag(), "cell-highlight-error");
        }
      }
    });
  };

  const findRange = (coord) => {
    if (coord <= 2) {
      return [0, 2];
    } else if (coord >= 6) {
      return [6, 8];
    }
    return [3, 5];
  };

  const checkSection = (checkingRow, checkingSquare, curCell, cellsToCheck) => {
    let isValidCell = true;
    cellsToCheck.forEach((otherCell) => {
      if (
        !(curCell.x === otherCell.x && curCell.y === otherCell.y) &&
        !validateCell(curCell, otherCell, checkingRow, checkingSquare)
      ) {
        isValidCell = false;
      }
    });
    return isValidCell;
  };

  const validateCell = (cell1, cell2, checkingRow, checkingSquare) => {
    let isValidCell = true;
    if (cell1.value !== "" && cell2.value === cell1.value) {
      isValidCell = false;
      if (checkingSquare) {
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
        <p id="error-message"></p>
      </div>
    </>
  );
}
