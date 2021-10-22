class Cell {
  constructor(value, selected, x, y) {
    this.value = "";
    this.selected = selected;
    this.x = x;
    this.y = y;
  }
  toggleHighlight() {
    this.selected = !this.selected;
  }
}

export default Cell;
