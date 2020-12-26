/*
Purpose: Any javascript logic regarding the course page.
*/

function render_row(end=1)
{
    let start = 0;
    let s = '';

    while (start <= end)
    {
        s += `
            <div class="row" id="row${start}">
                <div class="col">
            `;

        if (start === end) s += `<div class="input-group mb-3 transparent trans-click" id="${start}">`;
        else s += `<div class="input-group mb-3" id="${start}">`;


        s += `
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-light border-0 small">Percent:</span>
                        </div>
                        <input type="number" id="percent${start}" onkeyup = "update(line_chart)" class="form-control bg-light border-0 small" aria-describedby="basic-addon1">
                        <div class="input-group-prepend ">
                            <span class="input-group-text bg-light border-0 small">Weight:</span>
                        </div>
                        <input type="number" maxlength="3" id="weight${start}" onkeyup = "update(line_chart)" class="form-control bg-light border-0 small" aria-describedby="basic-addon1">
                        <select id = "name${start}" onchange = "update(line_chart)" class="custom-select bg-light border-0 small">
                            <option value="Exam">Exam</option>
                            <option value="Midterm">Midterm</option>
                            <option value="Assignment">Assignment</option>
                            <option value="Tutorial Marks">Tutorial Marks</option>
                            <option value="Quiz">Quiz</option>
                            <option value="Lab">Lab</option>
                        </select>
                    </div>
                </div>
                <div class="col col-xl-2">
                    <button type="button" class="btn btn-danger" id="del_field${start}" onclick="remove_field(${start})">Delete</button>
                </div>
            </div>
        `;

        start++;
    }

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

  for (let mark in marks)
  {
      if (marks.hasOwnProperty(mark)){
          console.log(marks[mark])
        s += `
        <div class="row" id="${mark.slice(1)}">
        <div class="col">
            <div class="input-group mb-3" id="${mark.slice(4)}">
                <div class="input-group-prepend">
                    <span class="input-group-text bg-light border-0 small">Percent:</span>
                </div>
                <input type="number" id="percent${mark.slice(4)}" value="${marks[mark].Mark}" onkeyup="update(line_chart)" class="form-control bg-light border-0 small" aria-describedby="basic-addon1">
                <div class="input-group-prepend ">
                    <span class="input-group-text bg-light border-0 small">Weight:</span>
                </div>
                <input type="number" maxlength="3" value="${marks[mark].Weight}" id="weight${mark.slice(4)}" onkeyup="update(line_chart)" class="form-control bg-light border-0 small" aria-describedby="basic-addon1">
                <select id="name${mark.slice(4)}" onchange="update(line_chart)" class="custom-select bg-light border-0 small">
                    ${render_options(marks[mark].Type, options)}
                </select>
            </div>
        </div>
        <div class="col col-xl-2">
            <button type="button" class="btn btn-danger" id="del_field${mark.slice(4)}" onclick="remove_field(${mark.slice(4)})">Delete</button>
        </div>
        </div>
    
        `
    }
  }

  return s

}

$(document).ready(function() {

    if (course_name in marks_in_courses)
    {
        $("#sideBar").append(render_row_from_dict(marks_in_courses[course_name]));
        num_fields = Object.keys(marks_in_courses[course_name]).length
        update(line_chart)
    }
    else
    {
        $("#sideBar").append(render_row());
    }


})