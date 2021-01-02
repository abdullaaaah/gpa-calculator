let courses = []
let options = ["Assignment", "Quiz", "Tutorial Activity", "Lab", "Midterm", "Exam"]
var marks_in_courses = {}

/* Database stuff */

/*
Here is a function that detects whether localStorage is both supported and available:
Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
*/
function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

function load_from_cache()
{
  courses = JSON.parse(localStorage.getItem('courses'))
  marks_in_courses = JSON.parse(localStorage.getItem('marks_in_courses'))

  if(courses === null) reset_storage()
}

function reset_storage()
{
  localStorage.setItem('courses', "[]")
  localStorage.setItem('marks_in_courses', "{}")

  load_from_cache()
}

function save_to_cache()
{
  // Save courses
  localStorage.setItem('courses', JSON.stringify(courses))
  // save mark data
  localStorage.setItem('marks_in_courses', JSON.stringify(marks_in_courses))
}


if (storageAvailable('localStorage')) {
  load_from_cache()
}
else {
  alert("This website won't work properly for you, please update your browser.")
}



/*
Renders the courses in <courses> into the sidebar
*/
function render_all_courses()
{

  //Reset it
  $("#course-list-sidebar").html("")

  for (course of courses)
  {
      $("#course-list-sidebar").append("<li><a href='/courses/" + course.toUpperCase() + "'>" + course.toUpperCase() + "</a></li>")
  }
}

/*
Adds a course, <course_name> to the array, <courses> above.
This function is invoked by the add course button in the header.
*/
function add_course(course_name)
{

  $('#course-name').val("")


  if (courses.includes(course_name))
  {
    alert("course already exists")
    return false
  }

  courses.push(course_name.toUpperCase());
  render_all_courses()
  save_to_cache()
  $("#no-course-msg").remove()
  $("#course-overview-table").html("")
  $("#course-overview-table").append(render_all_courses_table())
  generate_graph()
  return true
}

/* Round to two decimal places */
function two_decimal_places(num){
  return Math.round((num + Number.EPSILON)*100)/100
}


/* calculate % given data_dict */
function calculate_percentage(marks)
{
	total_grade = 0
  total_weight = 0
  for (mark in marks)
  {
		total_grade += marks[mark].Mark * marks[mark].Weight;
    total_weight += marks[mark].Weight;
  }

  if (total_grade === 0) return "N/A"

	return two_decimal_places(total_grade / total_weight)

}


/* return cGPA given data_dict */

/*
source: https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
*/
function range(start, end) {
  return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}

gpa_scale = {
0.0: range(0, 49),
0.7: range(50, 52),
1.0: range(53, 56),
1.3: range(57, 59),
1.7: range(60, 62),
2.0: range(63, 66),
2.3: range(67, 69),
2.7: range(70, 72),
3.0: range(73, 76),
3.3: range(77, 79),
3.7: range(80, 84),
4.0: range(85, 100)
}

convert_to_gpa = function(percentage)
{
for(scale in gpa_scale) {
  if(gpa_scale[scale].includes(percentage)) {
    return scale
  }
}

return 0
}
