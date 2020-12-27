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
