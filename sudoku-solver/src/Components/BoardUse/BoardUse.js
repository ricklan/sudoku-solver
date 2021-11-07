import tab from "../../keys/key-tab.svg";
import arrowkeys from "../../keys/key-arrow.svg";
import numbers from "../../keys/key-one-to-nine.svg";
import del from "../../keys/key-del.svg";
import mouse from "../../keys/key-mouse.svg";
import "./BoardUse.css";
/**
 * Returns a React element representing instructions on how to use the sudoku board.
 * @returns {ReactElement} Returns a React element representing instructions on how
 * to use the sudoku board.
 */

export function BoardUse() {
  /*todo:add images*/
  return (
    <div id="board-use">
      <h2>Board use:</h2>
      <div className="key-group">
        <p>Navigation:</p>
        <img className="key-long key" src={tab} alt="Tab key" />
        <img className="key-arrow key" src={arrowkeys} alt="Arrow Keys" />
        <img className="key-mouse key" src={mouse} alt="Mouse" />
      </div>
      <div className="key-group">
        <p id="input">Input:</p>
        <img className="key-nums key" src={numbers} alt="One to nine" />
        <img className="key-long key" src={del} alt="Delete key" />
      </div>
      <ol>
        <li>Each cell must be a number between 1-9 or blank</li>
        <li>
          Each row, column, and 3x3 box may only contain each number between 1-9
          once
        </li>
      </ol>
    </div>
  );
}
