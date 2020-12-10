from typing import Dict

SAMPLE_DATA = {"a1,mark":'2',"a1,weight":'5',"a2,mark":"","a2,weight":""}

def dict_converter(marks: Dict) -> Dict:
    """
    Converts dict to  prefered format
    """
    new_dict = {}
    for item in marks:
        new_item = item.split(',')
        if marks[item] != '': #Reject empty strings for now [TEMP]
            if new_item[0] not in new_dict:
                new_dict[new_item[0]] = {new_item[1]: marks[item]}
            else:
                new_dict[new_item[0]][new_item[1]] = marks[item]
    return new_dict


print(dict_converter(SAMPLE_DATA))