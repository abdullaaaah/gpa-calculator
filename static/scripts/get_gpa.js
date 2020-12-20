function add_field()
{
    $(".transparent").removeClass("transparent")
    $(".transparent").removeAttr("onclick") //tryna remove this mf onclick

    $('#gpaForm').append("<div class='row transparent'><div class='col no-space'> \
            <input name='a3,mark' type='text' class='form-control trans-font' placeholder='85' onClick='add_field()'> \
        </div> \
        <div class='col no-space'> \
            <input name='a3,weight' type='text' class='form-control trans-font' placeholder='20.0' onClick='add_field()'> \
        </div></div> \
    ");

    return
}


$(document).ready(function()
{
    $("#calc-gpa").click(function()
    {

    });

});