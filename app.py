from flask import Flask, request
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)
# CORS(app, resources=r'/api/*')
# CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def solve_sudoku(array):
    '''
    This function uses backtracking to solve a sudoku puzzle.
    '''

    row = 0
    column = 0
    completed_sudoku = True

    # Loops through the array to see if it has been filled with non-zero numbers.
    for i in range(9):
        for j in range(9):
            if array[i][j] == 0:
                completed_sudoku = False
                row = i
                column = j
                break
        else:
            continue
        break

    # If the sudoku is complete, then we print it.
    if completed_sudoku:
        return array
    else:

        # Otherwise, we call find_valid_inputs and use the values from there.
        valid_inputs = find_valid_inputs(array, row, column)
        for value in valid_inputs:
            array[row][column] = value

            if (solve_sudoku(array) is not None): # Recursively calling self.solve_sudoku()
                return array

        array[row][column] = 0 # Backtracking

    return None

def find_valid_inputs(array, row, column):
    '''
    This function is used to find all the possible valid inputs.
    '''

    # This is used to store the possible values.
    possible_values = [1,2,3,4,5,6,7,8,9]

    # Removes all the numbers that are already in the given row.
    for number in array[row]:
        if number in possible_values:
            possible_values.remove(number)

    # Removes all the numbers that are already in the given column.
    for row_value in range(9):
        if array[row_value][column] in possible_values:
            possible_values.remove(array[row_value][column])

    # Removes all the numbers that are already in that block.
    # This finds the row section the element is in.
    if (row >= 0 and row <= 2):
        row_index = 0
    elif (row >= 3 and row <= 5):
        row_index = 3
    else:
        row_index = 6
        
    # This finds the columnumn section the element is in.
    if (column >= 0 and column <= 2):
        column_index = 0
    elif (column >= 3 and column <= 5):
        column_index = 3
    else:
        column_index = 6
    
    # This for loop goes through each 3 by 3 section to check if there's a
    # number there already.
    for i in range(row_index, row_index + 3):
        for j in range(column_index, column_index + 3):
            if array[i][j] in possible_values:
                possible_values.remove(array[i][j])    

    return possible_values

def checkValidPuzzle(puzzle):
    '''
    This function checks if the given puzzle is valid or not
    '''

    # If the puzzle isn't a 9 by 9 array, return False
    if(not(type(puzzle) is list and len(puzzle) == 9 and len(puzzle[0]) == 9)):
        return False
    
    rows = {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[]}
    cols = {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[]}
    squares = {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[]}

    # Loops through the puzzle to find if it's valid or not
    for i in range(9):
        for j in range(9):
            cell = puzzle[i][j]

            if(cell != 0):

                # Gets the square associated with the cell
                square = getSquare(i, j)

                # Checks if the same number is already in the same row, column and square
                if(cell in rows[i] or cell in cols[j] or cell in squares[square]):
                    return False

                # Adds the cell value to the hashmaps
                rows[i].append(cell)
                cols[j].append(cell)
                squares[square].append(cell)

    return True

def getSquare(row, col):
    '''
    This function returns the square the cell is on, based on its row and column values
    '''
    if(0 <= row <= 2):
        if(0 <= col <= 2):
            return 0
        elif(3 <= col <= 5):
            return 1
        else:
            return 2
    elif(3 <= col <= 5):
        if(0 <= col <= 2):
            return 3
        elif(3 <= col <= 5):
            return 4
        else:
            return 5
    else:
        if(0 <= col <= 2):
            return 6
        elif(3 <= col <= 5):
            return 7
        else:
            return 8
    

@app.route('/api/solvePuzzle', methods=["POST"])
def solveSudoku():
    '''
    This is an API that returns a solved sudoku puzzle or an error message if the puzzle can't be solved
    '''

    # Gets the inputted puzzle
    puzzle = request.json["puzzle"]

    # Checks if the puzzle is valid or not
    if(checkValidPuzzle(puzzle)):
        result = solve_sudoku(puzzle)
        if(result):
            return json.dumps(solve_sudoku(puzzle)), 200
        else:
            return "Puzzle not solvable", 400
    else:
        return "Invalid Puzzle", 404

@app.route('/')
def home():
    return "<h1> Welcome to online sudoku solver </h1>"

if (__name__ == "__main__"):
    app.secret_key = b"secretkey"
    app.run(debug = True)