export function BoardUse() {
  /*todo:add images*/
  return (
    <>
      <h2>Board use</h2>
      <p>Navigation: Tab and Arrowkeys</p>
      <p>Input:</p>
      <p>1-9</p>
      <p>0, Delete</p>
      <p>Submit: Submit puzzle</p>
      <p>Clear: Remove all values from board</p>
      <ol>
        <li>Each cell must be a number between 1-9 or blank</li>
        <li>
          Each row, column, and 3x3 box may only contain each number between 1-9
          once
        </li>
      </ol>
    </>
  );
}
