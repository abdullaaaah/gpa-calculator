let START_NUM_FIELDS = 2
let num_fields = START_NUM_FIELDS


function add_field()
{
    $(".transparent").removeClass("transparent")
    $(".trans-click").attr("onclick", null)

    num_fields += 1;

    $('#gpaForm').append("<div class='input-group mb-3 transparent trans-click id='" + num_fields + " onclick='add_field()'> \
                <div class='input-group-prepend'> \
                    <span class='input-group-text'>Percent</span> \
                </div> \
                <input name = 'a"+ num_fields +",mark' type='text' class='form-control' placeholder='0' aria-describedby=basic-addon1> \
                  <div class='input-group-prepend'> \
                      <span class='input-group-text'>Weight</span> \
                  </div> \
                <input name = 'a" + num_fields + ",weight' type='text' class='form-control' placeholder='0' aria-describedby='basic-addon1'> \
                <select class='custom-select'> \
                            <option selected>Type Of Assessment...</option> \
                            <option value='1'>Exam</option> \
                            <option value='2'>Midterm</option> \
                            <option value='3'>Assignment</option> \
                            <option value='4'>Tutorial Marks</option> \
                        </select> \
                    </div>");

    return 0
}

function remove_field(){
    console.log("lol this shit too hard")
    return 0
}

//jQuery shit here
$(document).ready(function()
{

});