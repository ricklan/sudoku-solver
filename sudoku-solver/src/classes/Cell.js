class Cell {
  constructor(row, col) {
    this.value = "";
    this.selected = false;
    this.hasDupRow = false;
    this.hasDupCol = false;
    this.hasDupSquare = false;
    this.row = row;
    this.col = col;
  }
  toggleSelected() {
    this.selected = !this.selected;
  }
  getTag() {
    return document.querySelector(`#c${this.row}-${this.col}`);
  }
  getValue() {
    return this.value;
  }
  setValue(value) {
    this.value = value;
  }
  setDupRow(hasDupRow) {
    this.hasDupRow = hasDupRow;
  }
  getDupRow() {
    return this.hasDupRow;
  }
  setDupCol(hasDupCol) {
    this.hasDupCol = hasDupCol;
  }
  getDupCol() {
    return this.hasDupCol;
  }
  setDupSquare(hasDupSquare) {
    this.hasDupSquare = hasDupSquare;
  }
  getDupSquare() {
    return this.hasDupSquare;
  }
  getRow() {
    return this.row;
  }
  getCol() {
    return this.col;
  }
}

export default Cell;
