from typing import Dict


def dict_converter(marks: Dict) -> Dict:
    """
    Converts dict to  prefered format
    """
    new_dict = {}
    for item in marks:
        new_item = item.split(',')
        if new_item[0] not in new_dict:
            new_dict[new_item[0]] = {new_item[1]: marks[item]}
        else:
            new_dict[new_item[0]][new_item[1]] = marks[item]
    return new_dict
