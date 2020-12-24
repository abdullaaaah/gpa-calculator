//var START_NUM_FIELDS = 3
//var num_fields = START_NUM_FIELDS

/*
function add_field()
{
    $(".transparent").removeClass("transparent")
    $(".clickadd").attr("onclick", null) //tryna remove this mf onclick
    $(".clickadd").removeClass("trans-font")

    num_fields += 1;


    $('#gpaForm').append("<div class='row transparent'><div class='col no-space'> \
            <input name='a" + num_fields + ",mark' type='text' class='form-control trans-font clickadd' placeholder='85' onclick='add_field()'> \
        </div> \
        <div class='col no-space'> \
            <input name='a" + num_fields + ",weight' type='text' class='form-control trans-font clickadd' placeholder='20.0' onclick='add_field()'> \
        </div></div> \
    ");

    return
}
*/

$(document).ready(function()
{
    $("#calc-gpa").click(function()
    {
        var dic = $("form").serializeArray();
        $.post("/calculate", dic, function(data, status){
            $('#gpaView').text(data['gpa'])
            $('#markView').text(data['mark']+"%")
        })
    });

});