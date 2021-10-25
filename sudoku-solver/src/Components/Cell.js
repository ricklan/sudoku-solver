class Cell {
  constructor(value, selected, x, y) {
    this.value = "";
    this.selected = selected;
    this.hasDupRow = false;
    this.hasDupCol = false;
    this.hasDupSquare = false;
    this.x = x;
    this.y = y;
  }
  toggleSelected() {
    this.selected = !this.selected;
  }
  getTag() {
    return document.querySelector(`#c${this.x}-${this.y}`);
  }
}

export default Cell;
