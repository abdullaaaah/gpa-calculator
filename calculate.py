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


class GPACalculator:

    def __init__(self, assessment_dict):
        self.assessment_dict = assessment_dict
        self.gpa_dict = {range(85, 100): 4.0, range(80, 85): 3.7,
                         range(77, 80): 3.3, range(73, 77): 3.0,
                         range(70, 73): 2.7, range(67, 70): 2.3,
                         range(63, 67): 2.0, range(60, 63): 1.7,
                         range(57, 60): 1.3, range(53, 57): 1.0,
                         range(50, 53): 0.7, range(0, 50): 0.0}

    def calculate_mark(self, marks: dict) -> float:
        """
        Given a AssDict, <assessments> this function return the average of those
        marks out of total course weight.

        Round to two decimal places.

        >>> marks1 = {'test': {'mark': 100, 'weight': 50}}
        >>> G = GPACalculator(assessments)
        >>> G.calculate_mark(marks1)
        100.0
        >>> marks2 = {'test1': {'mark': 100, 'weight': 10}, 'test2': {'mark': 50, 'weight': 20} }
        >>> G = GPACalculator(assessments)
        >>> G.calculate_mark(marks2)
        66.67
        """
        current_weight = 0
        current_mark = 0

        for i in self.assessment_dict:
            weighted_mark = (
                    self.assessment_dict[i][MARK] * self.assessment_dict[i][
                WEIGHT])
            current_mark += weighted_mark
            current_weight += self.assessment_dict[i][WEIGHT]

        return round(current_mark / current_weight, 2)

    def convert_to_gpa(self, mark: int) -> float:
        """
        Given a mark in two decimal places, this function
        return the mark in GPA format.

        >>> G = GPACalculator(assessments)
        >>> G.convert_to_gpa(87)
        4.0
        >>> G.convert_to_gpa(84)
        3.7
        >>> G.convert_to_gpa(51)
        0.7
        """
        for ranges in self.gpa_dict:
            if mark in ranges:
                return self.gpa_dict[ranges]

    def calculate_gpa(self, gpa_assessments: 'AssDict') -> float:
        """
        Given a AssDict, <assessments> this function calculate the
        exact GPA and return

        Round to two decimal places.

        >>> G = GPACalculator(assessments)
        >>> G.calculate_gpa(assessments)
        4.0
        """
        total_weight = 0
        total_grade_weight = 0
        for assessment in self.assessment_dict:
            grade = self.assessment_dict[assessment]['mark']
            weight = self.assessment_dict[assessment]['weight']
            total_weight += weight
            total_grade_weight += grade * weight
        if total_weight > 0:
            return self.convert_to_gpa(round(total_grade_weight / total_weight))
        return self.convert_to_gpa(0)

    def process_assessments(self, f: TextIO) -> 'AllAssDict':
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
