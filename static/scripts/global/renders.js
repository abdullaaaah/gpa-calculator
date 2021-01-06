/*
any function that generates html goes in here
*/

/*
Renders the courses in <courses> into the sidebar
*/
function render_all_courses()
{

  //Reset it
  $("#course-list-sidebar").html("")

  //Static
  $("#course-list-sidebar").append(`<li id=""><a href="/">Home</a><li>`)

  for (course of courses)
  {
      $("#course-list-sidebar").append("<li><a href='/courses/" + course.toUpperCase() + "'>" + course.toUpperCase() + "</a></li>")
  }

  $("#course-list-sidebar").append(`<li id=""><a href="/settings">Settings</a><li>`)
}

/*
Helper for add_course and delete_course
It refreshes table.
*/
let refresh_table = function ()
{
  $("#no-course-msg").remove()
  $("#course-overview-table").html("")
  $("#course-overview-table").append(render_all_courses_table())
  generate_graph()
}