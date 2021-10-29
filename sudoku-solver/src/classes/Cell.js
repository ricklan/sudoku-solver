/**
 * A class representing a cell of a sudoku board.
 */
class Cell {
  /**
   * Create a Cell.
   * @param {number} row - The row that the Cell belongs to.
   * @param {number} col - The column that the Cell belongs to.
   */
  constructor(row, col) {
    this.value = "";
    this.selected = false;
    this.hasDupRow = false;
    this.hasDupCol = false;
    this.hasDupSquare = false;
    this.row = row;
    this.col = col;
    this.userEntered = false;
  }

  /**
   * Sets whether the Cell is selected or not.
   */
  toggleSelected() {
    this.selected = !this.selected;
  }

  /**
   * Returns whether this Cell is selected or not.
   * @returns {boolean} Whether this Cell is selected or not.
   */
  getSelected() {
    return this.selected;
  }

  /**
   * Returns the HTMLElement associated with this Cell.
   * @returns {HTMLElement} The HTML Element that is associated with this Cell.
   */
  getTag() {
    return document.querySelector(`#c${this.row}-${this.col}`);
  }

  /**
   * Returns the value contained in this Cell.
   * @returns {number} The value contained in this Cell.
   */
  getValue() {
    return this.value;
  }

  /**
   * Sets the value of this Cell..
   * @param {string} value - The value contained in this Cell.
   */
  setValue(value) {
    this.value = value;
  }

  /**
   * Sets this Cell's hasDupRow.
   * @param {boolean} hasDupRow - Whether this Cell has another Cell in its row
   * that shares the same value between 1-9.
   */
  setDupRow(hasDupRow) {
    this.hasDupRow = hasDupRow;
  }

  /**
   * Returns whether this Cell has another Cell in its row that shares the same
   * value between 1-9.
   * @returns {boolean} Whether this Cell has another Cell in its row
   * that shares the same value between 1-9.
   */
  getDupRow() {
    return this.hasDupRow;
  }

  /**
   * Set this Cell's hasDupCol.
   * @param {boolean} hasDupCol - Whether this Cell has another Cell in its
   * column that shares the same value between 1-9.
   */
  setDupCol(hasDupCol) {
    this.hasDupCol = hasDupCol;
  }

  /**
   * Returns whether this Cell has another Cell in its column that
   * shares the same value between 1-9.
   * @returns {boolean} Whether this Cell has another Cell in its column that
   * shares the same value between 1-9.
   */
  getDupCol() {
    return this.hasDupCol;
  }

  /**
   * Set this Cell's hasDupSquare.
   * @param {boolean} hasDupSquare - Whether this Cell has another Cell in its
   * 3x3 square that shares the same value between 1-9.
   */
  setDupSquare(hasDupSquare) {
    this.hasDupSquare = hasDupSquare;
  }

  /**
   * Returns whether this Cell has another Cell in its 3x3 square that shares
   * the same value between 1-9.
   * @returns {boolean} Whether this Cell has another Cell in its 3x3 square that
   * shares the same value between 1-9.
   */
  getDupSquare() {
    return this.hasDupSquare;
  }

  /**
   * Returns the row this Cell belongs to.
   * @returns {string} The row this Cell belongs to.
   */
  getRow() {
    return this.row;
  }

  /**
   * Returns the column this Cell belongs to.
   * @returns {string} The column this Cell belongs to.
   */
  getCol() {
    return this.col;
  }

  /**
   * Set this Cell's isUserEntered.
   * @param {boolean} isUserEntered - Whether the value in this Cell is etnered
   * by the user.
   */
  setUserEntered(isUserEntered) {
    this.userEntered = isUserEntered;
  }
}

export default Cell;
