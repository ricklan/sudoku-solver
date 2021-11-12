import requests
# import json

def test_empty_puzzle():
    url = "http://127.0.0.1:5000/api/solvePuzzle"
    array = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]]
    puzzle = {"puzzle": array}
    response = requests.post(url, json = puzzle)
    assert response.status_code == 200

def test_unsolvable_puzzle():
    url = "http://127.0.0.1:5000/api/solvePuzzle"
    array = [[0, 1, 2, 3, 4, 5, 6, 7, 8],
            [0, 0, 0, 0, 0, 0, 0, 9, 0],
            [9, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]]
    puzzle = {"puzzle": array}
    response = requests.post(url, json = puzzle)
    assert response.status_code == 400

def test_invalid_puzzle():
    url = "http://127.0.0.1:5000/api/solvePuzzle"
    array = [[0, 1, 2, 3, 4, 5, 6, 7, 8],
            [0, 0, 0, 0, 0, 'h', 0, 9, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]]
    puzzle = {"puzzle": array}
    response = requests.post(url, json = puzzle)
    assert response.status_code == 404