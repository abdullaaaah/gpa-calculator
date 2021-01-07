/*
Purpose: Any extra javascript logic regarding the course page.
         including, any JS after the dom has loaded
*/



/*
Purpose: Save / Update data in <marks_in_courses>
*/
function save_marks_in_courses()
{
    $("#saveBtn").html("<i class='fas fa-check'></i> Saved")
    marks_in_courses[course_name] = data_dict
    save_to_cache()
    console.log(data_dict)
}

let updateSaveBtn = function() {
        // Change save button
        $("#saveBtn").html("<i class='far fa-save'></i> Click To Save")
}

$(document).ready(function() {

    if (course_name in marks_in_courses)
    {
        $("#sideBar").append(render_row_from_dict(marks_in_courses[course_name]));
        update(line_chart)
        $("#sideBar").append(render_transparent_row())
    }
    else
    {
        $("#sideBar").append(render_row());
        $("#sideBar").append(render_transparent_row())
    }


})