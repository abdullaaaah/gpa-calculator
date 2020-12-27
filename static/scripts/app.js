/*var courses = ["CSC108", "MAT135"];
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
}*/
let courses = []
let options = ["Assignment", "Quiz", "Tutorial Activity", "Lab", "Midterm", "Exam"]
let marks_in_courses = {}

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
  save_to_cache()
}
