from app import getSquare

def test_middle_of_square_four():
    assert getSquare(4, 4) == 4

def test_lower_left_corner_of_square_zero():
    assert getSquare(2, 0) == 0

def test_upper_right_corner_of_square_one():
    assert getSquare(0, 5) == 1

def test_upper_left_corner_of_square_four():
    assert getSquare(3, 3) == 4

def test_lower_right_corner_of_square_three():
    assert getSquare(5, 2) == 3

def test_upper_left_corner_of_square_eight():
    assert getSquare(6, 6) == 8

def test_lower_right_corner_of_square_eight():
    assert getSquare(8, 8) == 8