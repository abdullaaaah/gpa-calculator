from typing import Dict

# SAMPLE DATA
assessments = {
    'a1': {'mark': 90, 'weight': 25},
    'a2': {'mark': 90, 'weight': 25},
    'a3': {'mark': 88, 'weight': 20}
}

# CONSTANTS
MARK = 'mark'
WEIGHT = 'weight'


class GPACalculator:

    def __init__(self, assessment_dict: Dict):
        self.class_dict = assessment_dict
        self.gpa_dict = {range(85, 100): 4.0, range(80, 85): 3.7,
                         range(77, 80): 3.3, range(73, 77): 3.0,
                         range(70, 73): 2.7, range(67, 70): 2.3,
                         range(63, 67): 2.0, range(60, 63): 1.7,
                         range(57, 60): 1.3, range(53, 57): 1.0,
                         range(50, 53): 0.7, range(0, 50): 0.0}

    def calculate_mark(self, class_marks: Dict) -> float:
        """
        Given a AssDict, <assessments> this function return the average of those
        marks out of total course weight.

        Round to two decimal places.

        >>> marks1 = {'test': {'mark': 100, 'weight': 50}}
        >>> G = GPACalculator(assessments)
        >>> G.calculate_mark(marks1)
        100.0
        >>> marks2 = {'test1': {'mark': 100, 'weight': 10}, 'test2': {'mark': 50, 'weight': 20} }
        >>> F = GPACalculator(assessments)
        >>> F.calculate_mark(marks2)
        66.67
        """
        current_weight = 0
        current_mark = 0

        for assessment in class_marks:
            weighted_mark = (
                    float(class_marks[assessment][MARK]) *
                    float(class_marks[assessment][WEIGHT]))
            current_mark += weighted_mark
            current_weight += class_marks[assessment][WEIGHT]
        if current_weight > 0:
            return round(current_mark / current_weight, 2)
        return 0

    def convert_to_gpa(self, mark: int) -> float:
        """
        (Helper Function) Given a mark in two decimal places,
        this function return the mark in GPA format.

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

    def calculate_gpa(self) -> float:
        """
        Given a AssDict, <assessments> this function calculate the
        exact GPA and return

        Round to two decimal places.

        >>> marks2 = {'test1': {'mark': 100, 'weight': 10}, 'test2': {'mark': 50, 'weight': 20} }
        >>> F = GPACalculator(marks2)
        >>> F.calculate_gpa()
        2.3
        """
        total = 0
        classes = len(self.class_dict)
        for _ in range(len(self.class_dict)):
            total += self.calculate_mark(self.class_dict)
        average = total/classes
        return self.convert_to_gpa(round(average))
