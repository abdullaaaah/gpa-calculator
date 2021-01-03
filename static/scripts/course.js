/*
Purpose: Any javascript logic regarding the course page.
*/

function render_row(end=0)
{
    let start = 0;
    let s = '';

    while (start <= end)
    {
        s += `
            <div class="form-row align-items-center" id="row${start}">
                <div class="col-auto">
                    <div class="input-group" id="${start}">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-light border-0 small">Percent:</span>
                        </div>
                        <input id="percent${start}" onkeyup = "update(); updateSaveBtn()" class="form-control bg-light border-0 small" aria-describedby="basic-addon1">
                        <div class="input-group-prepend ">
                            <span class="input-group-text bg-light border-0 small">Weight:</span>
                        </div>
                        <input maxlength="3" id="weight${start}" onkeyup = "update(); updateSaveBtn()" class="form-control bg-light border-0 small" aria-describedby="basic-addon1">
                        <select id = "name${start}" onchange = "update()" class="custom-select bg-light border-0 small">
                            ${render_options('Assignment', options)}
                        </select>
                        <button type="button" class="btn btn-danger btn-danger-outline" id="del_field${start}" onclick="remove_field(${start})"><i class="fas fa-times"></i></button>

                    </div>
                </div>
            </div>
        `;

        start++;
    }

    // this should be fine assuming this function is only ran on empty courses
    num_fields = end + 1;
    return s;
}


function render_transparent_row()
{
    s = '';
    //num_fields++;

    s += `

    <div class="form-row align-items-center" id="row${num_fields}">
    <div class="col-auto">
        <div class="input-group mb-3 transparent trans-click" id="${num_fields}" onclick="add_field()">
            <div class="input-group-prepend">
                <span class="input-group-text bg-light border-0 small">Percent:</span>
            </div>
            <input id="percent${num_fields}" onkeyup = "update(); updateSaveBtn()" class="form-control bg-light border-0 small" aria-describedby="basic-addon1">
            <div class="input-group-prepend">
                <span class="input-group-text bg-light border-0 small">Weight:</span>
            </div>
            <input id="weight${num_fields}" onkeyup = "update(); updateSaveBtn()" class="form-control bg-light border-0 small" aria-describedby="basic-addon1">
            <select id = "name${num_fields}" onchange = "update()" class="custom-select bg-light border-0 small">
                ${render_options("Assignment", options)}
            </select>
            <button type="button" id = "del_field${num_fields}" onclick= ""
            class="btn btn-danger btn-danger-outline invisible"><i class="fas fa-times"></i></button>
        </div>
    </div>
</div>

    `;


    return s;
}


/*
Purpose: Helper function for render_options
         Removes <value> from Array, <arr>
*/
function remove_item_once(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  /*
  Purpose: Helper function for render_options
  */
  function order_options(first, options)
  {
    remove_item_once(options, first)
    options.unshift(first);
  }

  /*
  Purpose: Renders <option></option> dynamically
        <first> is always first on the list
  */
  function render_options(first, options)
  {
    order_options(first, options)
    let s = '';

    for (let option in options)
    {
        if (options.hasOwnProperty(option)) {
            s += `<option value="${options[option]}">${options[option]}</option>`;
        }
    }

    return s;
  }


function render_row_from_dict(marks)
{

  let s = ''
  num_fields = 0

  for (let mark in marks)
  {
      if (marks.hasOwnProperty(mark)){
          console.log(marks[mark])
        s += `
        <div class="form-row align-items-center" id="${mark.slice(1)}">
        <div class="col-auto">
            <div class="input-group mb-3" id="${mark.slice(4)}">
                <div class="input-group-prepend">
                    <span class="input-group-text bg-light border-0 small">Percent:</span>
                </div>
                <input id="percent${mark.slice(4)}" value="${marks[mark].Mark}" onkeyup="update(); updateSaveBtn()" class="form-control bg-light border-0 small" aria-describedby="basic-addon1">
                <div class="input-group-prepend ">
                    <span class="input-group-text bg-light border-0 small">Weight:</span>
                </div>
                <input maxlength="3" value="${marks[mark].Weight}" id="weight${mark.slice(4)}" onkeyup="update(); updateSaveBtn()" class="form-control bg-light border-0 small" aria-describedby="basic-addon1">
                <select id="name${mark.slice(4)}" onchange="update()" class="custom-select bg-light border-0 small">
                    ${render_options(marks[mark].Type, options)}
                </select>
                <button type="button" class="btn btn-danger btn-danger-outline" id="del_field${mark.slice(4)}" onclick="remove_field(${mark.slice(4)})"><i class="fas fa-times"></i></button>
            </div>
        </div>
        </div>
    
        `
    }

    num_fields++;
  }

  return s

}


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
        $("#saveBtn").html("<i class='fas fa-exclaimation'></i> Click To Save")
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