/*
Purpose: Any javascript logic regarding the sidebar page.
*/

load_gpa_scale()

$(document).ready(function() {


    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    render_all_courses()


    //Enter on add course
    document.querySelector("#course-name").addEventListener("keyup", event => {
        if(event.key !== "Enter") return; // Use `.key` instead.
        document.querySelector("#popupbtn").click(); // Things you want to do.
        event.preventDefault(); // No need to `return false;`.
    });


})
