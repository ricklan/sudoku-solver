import "./SudokuBoard.css";
import Cell from "../../classes/Cell";

/**
 * Returns a React element that represents the sudoku board puzzle, including
 * its submit and clear buttons.
 * @returns {ReactElement} A React element representing the sudoku board
 * puzzle and its submit and clear buttons.
 */
export function SudokuBoard() {
  let board = [...Array(9)].map((i, row) => {
    return [...Array(9)].map((j, col) => {
      return new Cell(row, col);
    });
  });

  /**
   * Processes the input from the sudoku board puzzle and makes an api call to
   * the backend to solve the puzzle. If the puzzle has a solution it will be
   * displayed, otherwise an error will display.
   * @param {event} e - The event that triggers this function.
   */
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
        document.querySelector("#error-message").innerHTML =
          error.response.data;
      });
  };

  /**
   * Creates and returns a representation of the sudoku board as a 2D array of
   * integers.
   * @returns {Array} Representation of the board as integers in a 2D array.
   */
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

  /**
   * Displays the answer to a sudoku puzzle provided by answerArray.
   * @param {Array} answerArray - The solution to a sudoku puzzle to display.
   */
  const displayAnswer = (answerArray) => {
    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        cell.getTag().innerHTML = answerArray[x][y];
        cell.setValue(answerArray[x][y]);
      });
    });
  };

  /**
   * Returns the Cell object that is currently selected by the user, otherwise
   * return null.
   * @returns {Cell} Cell that is currently selected by the user.
   */
  const findSelected = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].getSelected()) {
          return board[row][col];
        }
      }
    }
    return null;
  };

  /**
   * Selects cellTag by setting it to focus and sets its Cell object equivalent
   * to true.
   * @param {HTMLElement} cellTag - The cell HTML Element to select.
   */
  const selectCell = (cellTag) => {
    let row = cellTag.id.substring(1, 2);
    let col = cellTag.id.substring(3, 4);
    board[row][col].toggleSelected();
    cellTag.focus();
  };

  /**
   * Processes and modifies the appearance of the sudoku board based on e's
   * key that is pressed.
   * @param {Event} e - The Event that triggers this function.
   */
  const processKeyDown = (e) => {
    let curCellTag = e.target;
    let row = parseInt(curCellTag.id.substring(1, 2));
    let col = parseInt(curCellTag.id.substring(3, 4));
    let curSelCell = findSelected();
    if ((e.key >= "1" && e.key <= "9") || e.key === "Delete") {
      let curCell = board[row][col];
      if (e.key === "Delete") {
        curCell.setValue("");
        curCell.setUserEntered(false);
        curCellTag.classList.remove("cell-user-entered");
        curCellTag.innerHTML = "";
      } else {
        curCell.setValue(e.key);
        curCell.setUserEntered(true);
        curCellTag.classList.add("cell-user-entered");
        curCellTag.innerHTML = e.key;
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
      e.preventDefault();
      processArrowKey(e, curSelCell);
    }
  };

  /**
   * Checks the row of the sudoku board and modifies the appearance of the board
   * and its array equivalent based on whether duplicate numbers are found.
   * @param {number} row - The row number to check.
   */
  const checkRow = (row) => {
    let isValidCell = true;
    board[row].forEach((curCell) => {
      isValidCell = checkSection("row", curCell, board[row]);
      let cellTag = curCell.getTag();
      if (!isValidCell) {
        curCell.setDupRow(true);
        cellTag.classList.add("cell-highlight-error");
      } else {
        curCell.setDupRow(false);
        if (!curCell.getDupCol() && !curCell.getDupSquare()) {
          cellTag.classList.remove("cell-highlight-error");
        }
      }
    });
  };

  /**
   * Checks the col of the sudoku board and modifies the appearance of the board
   * and its array equivalent based on whether duplicate numbers are found.
   * @param {number} col - The column number to check for.
   */
  const checkColumn = (col) => {
    let isValidCell = true;
    let cellsToCheck = [];
    for (let row = 0; row <= 8; row++) {
      cellsToCheck.push(board[row][col]);
    }

    cellsToCheck.forEach((curCell) => {
      isValidCell = checkSection("col", curCell, cellsToCheck);
      let cellTag = curCell.getTag();
      if (!isValidCell) {
        curCell.setDupCol(true);
        cellTag.classList.add("cell-highlight-error");
      } else {
        curCell.setDupCol(false);
        if (!curCell.getDupRow() && !curCell.getDupSquare()) {
          cellTag.classList.remove("cell-highlight-error");
        }
      }
    });
  };

  /**
   * Checks the 3x3 square of the sudoku board and modifies the appearance of the
   * board and its array equivalent based on whether dusplicate numbers are found.
   * @param {number} row - The row of the Cell that had its value modified.
   * @param {number} col - The column of the Cell that had its value modified.
   */
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
          !checkSection("square", cell, cellsToCheck) /*||
          !checkSection(false, true, cell, cellsToCheck)*/
        ) {
          isValidCell = false;
        }
      }

      let cellTag = cell.getTag();
      if (!isValidCell) {
        cell.setDupSquare(true);
        cellTag.classList.add("cell-highlight-error");
      } else {
        cell.setDupSquare(false);
        if (!cell.getDupRow() && !cell.getDupCol()) {
          cellTag.classList.remove("cell-highlight-error");
        }
      }
    });
  };

  /**
   * Finds the range of the rows or columns of the 3x3 square that the most
   * recently modified Cell is part of.
   * @param {number} coord - The row or column of Cell that had its value modified.
   * @returns {Array} An array containing the row or column range of the 3x3
   * square that the most recently modified Cell is part of.
   */
  const findRange = (coord) => {
    if (coord <= 2) {
      return [0, 2];
    } else if (coord >= 6) {
      return [6, 8];
    }
    return [3, 5];
  };

  /**
   * Returns true if curCell does not contain the same value as any other cells
   * in cellsToCheck, within a specified section (row, column, or square). Returns
   * false otherwise.
   * @param {string} section - The section to check. Must be either "row",
   * "col", or "square".
   * @param {Cell} curCell - The Cell to check duplicates for.
   * @param {Array} cellsToCheck - The Cells to compare to curCell.
   * @returns {boolean} Whether the section contains any duplicate values.
   */
  const checkSection = (section, curCell, cellsToCheck) => {
    let isValidCell = true;
    cellsToCheck.forEach((otherCell) => {
      if (
        !(
          curCell.getRow() === otherCell.getRow() &&
          curCell.getCol() === otherCell.getCol()
        ) &&
        !validateCell(curCell, otherCell, section)
      ) {
        isValidCell = false;
      }
    });
    return isValidCell;
  };

  /**
   * Returns true if cell1 and cell2's values are the same (meaning they are not
   * valid cells). Returns false otherwise. Modifies cell2's values based on this conclusion.
   * @param {Cell} cell1 - The first Cell to compare.
   * @param {Cell} cell2 - The second Cell to compare.
   * @param {string} section - The section to check ("row", "col", or "square")
   * @returns {boolean} Whether cell1 and cell2's values are the same.
   */
  const validateCell = (cell1, cell2, section) => {
    let isValidCell = true;
    if (cell1.getValue() !== "" && cell2.getValue() === cell1.getValue()) {
      isValidCell = false;
      if (section === "square") {
        cell2.setDupSquare(true);
      } else if (section === "row") {
        cell2.setDupRow(true);
      } else {
        cell2.setDupCol(true);
      }
      cell2.getTag().classList.add("cell-highlight-error");
    }
    return isValidCell;
  };

  /**
   * Returns the coordinate (row or column) of the new cell that would be
   * selected based on the key pressed and cellPos.
   * @param {String} key - The arrow key that was pressed ("ArrowUp",
   * "ArrowDown", "ArrowLeft", or "ArrowRight")
   * @param {number} cellPos - The row or column of the Cell that was recently
   * modified.
   * @returns {number} The coordinate of the new cell that would be selected.
   */
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

  /**
   * Determines and selects the new Cell based on they key that e triggers and
   * curSelCell.
   * @param {Event} e - The event that triggers this function.
   * @param {Cell} curSelCell - The currently selected Cell.
   */
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

  /**
   * Resets the sudoku board to be blank.
   */
  const clearBoard = () => {
    board.forEach((row) => {
      row.forEach((cell) => {
        cell.setValue("");
        cell.getTag().innerHTML = "";
        cell.setDupCol(false);
        cell.setDupRow(false);
        cell.setDupSquare(false);
        cell.getTag().classList.remove("cell-highlight-error");
        cell.getTag().classList.remove("cell-user-entered");
      });
    });
  };

  /**
   * Deselects cellTag and its Cell counterpart.
   * @param {HTMLElement} cellTag - The HTML Element representing the Cell to be
   * deselected.
   */
  const deselectCurSelectedCell = (cellTag) => {
    let row = parseInt(cellTag.id.substring(1, 2));
    let col = parseInt(cellTag.id.substring(3, 4));
    board[row][col].toggleSelected();
  };

  return (
    <>
      <h2 id="prompt">Enter values into the board and hit submit to solve!</h2>
      <ul id="sudoku-board">
        {board.map((row, x) => {
          return row.map((cell, y) => {
            return (
              <li
                className={`cell row${x} col${y}`}
                id={`c${x}-${y}`}
                key={`${x}-${y}`}
                onKeyDown={(e) => processKeyDown(e)}
                onFocus={(e) => selectCell(e.target)}
                onBlur={(e) => deselectCurSelectedCell(e.target)}
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
