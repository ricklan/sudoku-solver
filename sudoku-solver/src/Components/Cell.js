class Cell {
  constructor(value, selected, x, y) {
    this.value = "";
    this.selected = selected;
    this.hasError = false;
    this.x = x;
    this.y = y;
  }
  toggleSelected() {
    this.selected = !this.selected;
  }
  toggleError() {
    this.hasError = !this.hasError;
  }
  getTag() {
    return document.querySelector(`#c${this.x}-${this.y}`);
  }
}

export default Cell;
