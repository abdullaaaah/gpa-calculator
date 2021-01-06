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

/*===================
    LOAD Functions
====================*/

/* This function loads courses and marks from localStorage */
function load_from_cache()
{
  courses = JSON.parse(localStorage.getItem('courses'))
  marks_in_courses = JSON.parse(localStorage.getItem('marks_in_courses'))

  if(courses === null) reset_storage()
}

/* this function loads the gpa scale from localStorage */
function load_gpa_scale()
{
  let temp = JSON.parse(localStorage.getItem('gpa_scale'))

  if (temp)
  {
    gpa_scale = temp
  }

}

/*=================
 SAVE
==================*/

/* Saves courses and marks to localStorage */
function save_to_cache()
{
  // Save courses
  localStorage.setItem('courses', JSON.stringify(courses))
  // save mark data
  localStorage.setItem('marks_in_courses', JSON.stringify(marks_in_courses))
}

/* saves the GPA scale */
function save_gpa_scale()
{
  localStorage.setItem('gpa_scale', JSON.stringify(gpa_scale))
  alert("Saved!")
}

/*==================
DELETE
===================*/

/* Resets localStorage */
function reset_storage()
{
  localStorage.setItem('courses', "[]")
  localStorage.setItem('marks_in_courses', "{}")
  load_from_cache()
}


/* delete course given course_name */
let delete_course = function(course_name)
{
  if (course_name in marks_in_courses) delete marks_in_courses[course_name]
  if (courses.includes(course_name)) courses = arrayRemove(courses, course_name)
  save_to_cache()
  refresh_table()
}

/*=================
ADD
==================*/


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
  refresh_table()
  return true
}




/*================
EXTRA
=================*/

/* A little check */
if (storageAvailable('localStorage')) {
  load_from_cache()
}
else {
  alert("This website won't work properly for you, please update your browser.")
}
