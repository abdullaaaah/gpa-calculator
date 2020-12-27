var courses = ["CSC108", "MAT135"];
var options = ["Assignment", "Quiz", "Tutorial Activity", "Lab", "Midterm", "Exam"];
var marks_in_courses  = {
    CSC108: {
        "#row0": {
          "Mark": 90,
          "Weight": 9,
          "Type": "Assignment"
        },
        "#row1": {
          "Mark": 100,
          "Weight": 9,
          "Type": "Assignment"
        },
        "#row2": {
          "Mark": 75,
          "Weight": 25,
          "Type": "Midterm"
        }
      }
}

/* Database stuff */
function load_from_cache()
{
  courses = JSON.parse(localStorage.getItem('courses'))
  options = JSON.parse(localStorage.getItem('options'))
  marks_in_courses = JSON.parse(localStorage.getItem('marks_in_courses'))
}

function reset_storage()
{
  localStorage.setItem('courses', "[]")
  localStorage.setItem('options', "[]")
  localStorage.setItem('marks_in_courses', "{}")

  load_from_cache
}

function save_to_cache()
{
  // Save courses
  localStorage.setItem('courses', JSON.stringify(courses))
  // save options
  localStorage.setItem('options', JSON.stringify(options))
  // save mark data
  localStorage.setItem('marks_in_courses', JSON.stringify(marks_in_courses))
}


if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
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
      $("#course-list-sidebar").append("<li><a href='/courses/" + course + "'>" + course + "</a></li>")
  }
}

/*
Adds a course, <course_name> to the array, <courses> above.
This function is invoked by the add course button in the header.
*/
function add_course(course_name)
{
  courses.push(course_name);
  render_all_courses()
}
