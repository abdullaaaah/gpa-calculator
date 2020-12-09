from typing import TextIO

# SAMPLE DATA
assessments = {
    'a1': {'mark': 90, 'weight': 25},
    'a2': {'mark': 90, 'weight': 25},
    'a3': {'mark': 88, 'weight': 20}
}

# CONSTANTS
MARK = 'mark'
WEIGHT = 'weight'
END_MARK = 'END'


def calculate_mark(assessments: 'AssDict') -> float:
    """
    Given a AssDict, <assessments> this function return the average of those
    marks out of total course weight.

    Round to two decimal places.

    >>> marks = {
        'test': {'mark': 100, 'weight': 50}
    }
    >>> calculateMarks(marks)
    100.0
    >>> marks = {
        'test1': {'mark': 100, 'weight': 10},
        'test2': {'mark': 50, 'weight': 20}
    }
    >>> calculateMarks(marks)
    66.67
    """
    current_weight = 0
    current_mark = 0

    for i in assessments:
        weighted_mark = (assessments[i][MARK] * assessments[i][WEIGHT])
        current_mark += weighted_mark
        current_weight += assessments[i][WEIGHT]

    return round(current_mark / current_weight, 2)


# TODO: add functionality to calculate exact GPA
def convert_to_gpa(mark: float) -> float:
    """
    Given a mark in two decimal places, this function
    return the mark in GPA format.

    >>> convert_to_gpa(85)
    4.0
    >>> convert_to_gpa(84)
    3.7
    >>> convert_to_gpa(52)
    0.7
    """
    gpa_dict = {range(85, 100): 4.0, range(80, 85): 3.7,
                range(77, 80): 3.3, range(73, 77): 3.0,
                range(70, 73): 2.7, range(67, 70): 2.3,
                range(63, 67): 2.0, range(60, 63): 1.7,
                range(57, 60): 1.3, range(53, 57): 1.0,
                range(50, 53): 0.7, range(0, 50): 0.0}
    for i in gpa_dict:
        if mark in i:
            return gpa_dict[i]


def calculate_gpa(assessments: 'AssDict') -> float:
    """
    Given a AssDict, <assessments> this function calculate the
    exact GPA and return

    Round to two decimal places.
    """
    pass


def process_assessments(f: TextIO) -> 'AllAssDict':
    """
    Given an opened file, f, this function return an AssDict
    """
    d = {}
    line = f.readline()
    while line != '':
        course_name = line.strip()
        d[course_name] = {}
        line = f.readline()
        while END_MARK not in line:
            temp = line.strip().split(",")
            d[course_name][temp[0]] = {MARK: temp[1], WEIGHT: temp[2]}
            line = f.readline()
        line = f.readline()
    return d
