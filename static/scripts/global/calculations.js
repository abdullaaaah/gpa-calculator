/*
Calculation functions go here
*/


/*
calculate % given data_dict
It takes in a data_dict, and not the actual marks_in_courses
*/
function calculate_percentage(marks)
{
    total_grade = 0
    total_weight = 0
    for (mark in marks)
    {
        ass_mark = parseFloat(marks[mark].Mark)
        ass_weight = parseFloat(marks[mark].Weight)

        total_grade += ass_mark * ass_weight
        total_weight += ass_weight
    }

  if (total_grade === 0 && total_weight === 0) return 0
	return two_decimal_places(total_grade / total_weight)

}


/*
return your culminative percentage from marks_in_courses (collection of data dicts)
*/
let calculate_cpercent = function()
{
  let total_percent = 0
  let count = 0
	for(course in marks_in_courses)
  {
    // if average of the course isnt null
    let percentage = calculate_percentage(marks_in_courses[course])
		if (percentage)
    {
    	total_percent += parseFloat(percentage)
      count++
    }
  }

  let cpercent = two_decimal_places(total_percent / count)

  if (total_percent === 0) return 0
  if (cpercent === Math.trunc(cpercent)) return cpercent
  return cpercent.toFixed(2)

}


/* convert % to gpa */
let convert_to_gpa = function(percentage)
{
for(scale in gpa_scale) {
  if(gpa_scale[scale].includes(percentage)) {
    return parseFloat(scale)
  }
}

return 0
}


/* return cGPA given data_dict */
let calculate_cgpa = function(data)
{
  let total_gpa = 0
  let count = 0
	for(course in marks_in_courses)
  {
    // if average of the course isnt null
    let percentage = calculate_percentage(marks_in_courses[course])
		if (percentage)
    {
      let gpa = convert_to_gpa(Math.trunc(percentage))
    	total_gpa += parseFloat(gpa)
      count++
    }
  }
  if (total_gpa === 0) return 0
  return two_decimal_places(total_gpa / count).toFixed(2)

}

