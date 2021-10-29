import "./SudokuBoard.css";
import Cell from "./Cell";

export function SudokuBoard() {
  let board = [...Array(9)].map((i, row) => {
    return [...Array(9)].map((j, col) => {
      return new Cell(row, col);
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
        if (cell.getValue() === "") {
          newRow.push(0);
        } else {
          newRow.push(parseInt(cell.getValue()));
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
        cell.setValue(answerArray[x][y]);
      });
    });
  };

  const findSelected = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].selected) {
          return board[row][col];
        }
      }
    }
    return null;
  };

  const selectCell = (cellTag) => {
    let row = cellTag.id.substring(1, 2);
    let col = cellTag.id.substring(3, 4);
    board[row][col].toggleSelected();
    cellTag.focus();
  };

  const highlightCell = (cellTag, classToAdd) => {
    cellTag.classList.add(classToAdd);
  };

  const removeHighlight = (cellTag, classToRemove) => {
    cellTag.classList.remove(classToRemove);
  };

  const processKeyDown = (e) => {
    let row = parseInt(e.target.id.substring(1, 2));
    let col = parseInt(e.target.id.substring(3, 4));
    let curSelCell = findSelected();
    if ((e.key >= "0" && e.key <= "9") || e.key === "Delete") {
      if (e.key === "0" || e.key === "Delete") {
        board[row][col].setValue("");
        e.target.innerHTML = "";
      } else {
        board[row][col].setValue(e.key);
        e.target.innerHTML = e.key;
      }
      checkRow(row);
      checkColumn(col);
      checkSquare(row, col);
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
        curCell.setDupRow(true);
        highlightCell(curCell.getTag(), "cell-highlight-error");
      } else {
        curCell.setDupRow(false);
        if (!curCell.getDupCol() && !curCell.getDupSquare()) {
          removeHighlight(curCell.getTag(), "cell-highlight-error");
        }
      }
    });
  };

  const checkColumn = (col) => {
    let isValidCell = true;
    let cellsToCheck = [];
    for (let row = 0; row <= 8; row++) {
      cellsToCheck.push(board[row][col]);
    }

    cellsToCheck.forEach((curCell) => {
      isValidCell = checkSection(false, false, curCell, cellsToCheck);

      if (!isValidCell) {
        curCell.setDupCol(true);
        highlightCell(curCell.getTag(), "cell-highlight-error");
      } else {
        curCell.setDupCol(false);
        if (!curCell.getDupRow() && !curCell.getDupSquare()) {
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
        cell.setDupSquare(true);
        highlightCell(cell.getTag(), "cell-highlight-error");
      } else {
        cell.setDupSquare(false);
        if (!cell.getDupRow() && !cell.getDupCol()) {
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
        !(
          curCell.getRow() === otherCell.getRow() &&
          curCell.getCol() === otherCell.getCol()
        ) &&
        !validateCell(curCell, otherCell, checkingRow, checkingSquare)
      ) {
        isValidCell = false;
      }
    });
    return isValidCell;
  };

  const validateCell = (cell1, cell2, checkingRow, checkingSquare) => {
    let isValidCell = true;
    if (cell1.getValue() !== "" && cell2.getValue() === cell1.getValue()) {
      isValidCell = false;
      if (checkingSquare) {
        cell2.setDupSquare(true);
      } else if (checkingRow) {
        cell2.setDupRow(true);
      } else {
        cell2.setDupCol(true);
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
    let newHighlightRow;
    let newHighlightCol;
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      newHighlightRow = move(e.key, curSelCell.getRow());
      newHighlightCol = curSelCell.getCol();
    } else {
      newHighlightRow = curSelCell.getRow();
      newHighlightCol = move(e.key, curSelCell.getCol());
    }
    board[newHighlightRow][newHighlightCol].getTag().focus();
  };

  const clearBoard = () => {
    board.forEach((row) => {
      row.forEach((cell) => {
        cell.setValue("");
        cell.getTag().innerHTML = "";
        cell.setDupCol(false);
        cell.setDupRow(false);
        cell.setDupSquare(false);
        removeHighlight(cell.getTag(), "cell-highlight-error");
      });
    });
  };

  const clearCurSelectedCell = (cellTag) => {
    let row = parseInt(cellTag.id.substring(1, 2));
    let col = parseInt(cellTag.id.substring(3, 4));
    board[row][col].toggleSelected();
  };

  return (
    <>
      <h2>Enter values into the board and hit submit to solve!</h2>
      <ul id="sudoku-board">
        {board.map((row, x) => {
          return row.map((cell, y) => {
            return (
              <li
                className="cell"
                id={`c${x}-${y}`}
                key={`${x}-${y}`}
                onKeyDown={(e) => processKeyDown(e)}
                onFocus={(e) => selectCell(e.target)}
                onBlur={(e) => clearCurSelectedCell(e.target)}
                tabIndex="0"
              ></li>
            );
          });
        })}
      </ul>
      <div id="board-menu">
        <button onClick={(e) => processBoard(e)}>Submit</button>
        <button onClick={() => clearBoard()}>Clear</button>
        <p id="error-message"></p>
      </div>
    </>
  );
}
