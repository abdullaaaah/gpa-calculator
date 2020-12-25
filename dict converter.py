def dict_converter(marks:dict) -> dict:
	"""Converts dict to  prefered format"""
	new_dict = {}
	for item in marks:
		new_item = item.split(',')
		if new_item[0] not in new_dict:
			new_dict[new_item[0]] = {new_item[1]: float(marks[item])}
		else:
			new_dict[new_item[0]][new_item[1]] = float(marks[item])
	return new_dict