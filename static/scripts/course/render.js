/*
This page contains any functions involving HTML output
*/

// Constants
const PERCENT_TEXT = '<i class="fas fa-percentage"></i>'
const WEIGHT_TEXT = '<i class="fas fa-weight-hanging"></i>'



  /*
  Purpose: Renders <option></option> dynamically
        <first> is always first on the list
        options array is found in app.js
  */
 function render_options(first, options)
 {

    // orders the array
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



/*
Renders a single row, can also be transparent if is_trans is true.
ass_name is the name of assessment which comes first in the selection
 AKA the one user saved
*/
let render_one_row = function (id, mark = '', weight = '', ass_name = "Assignment", is_trans = false) {
    let s = ''

    s += `
    <div class="form-row align-items-center" id="row${id}">
    <div class="col-auto">
        <div class="input-group ${is_trans ? 'transparent trans-click' : ''}" id="${id}" ${is_trans ? 'onclick="add_field()"' : ''}>
            <div class="input-group-prepend">
                <span class="input-group-text bg-light border-1 small">${PERCENT_TEXT}</span>
            </div>
            <input value="${mark}" maxlength="3" id="percent${id}" onkeyup = "update(); updateSaveBtn()" class="form-control bg-light border-1 small" aria-describedby="basic-addon1">
            <div class="input-group-append">
                <span class="input-group-text bg-light border-1 small">${WEIGHT_TEXT}</span>
            </div>
            <input value="${weight}" maxlength="3" id="weight${id}" onkeyup = "update(); updateSaveBtn()" class="form-control bg-light border-1 small input-group-append" aria-describedby="basic-addon1">
            <select id = "name${id}" onchange = "update()" class="custom-select bg-light border-1 border-round small input-group-append">
                ${render_options(ass_name, options)}
            </select>
            <button type="button" class="btn btn-danger ml-2 btn-danger-outline ${is_trans ? 'invisible' : '' }" id="del_field${id}" onclick="remove_field(${id})"><i class="fas fa-times"></i></button>

        </div>
    </div>
</div>
    `


    return s
}


function render_row(end=0)
{
    let start = 0;
    let s = '';

    while (start <= end)
    {
        s += render_one_row(start)
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
    s += render_one_row(num_fields, '', '', "Assignment", true)
    return s;
}

function render_row_from_dict(marks)
{

  let s = ''
  num_fields = 0

  for (let mark in marks)
  {
      if (marks.hasOwnProperty(mark)){
        s += render_one_row(mark.slice(4), marks[mark].Mark, marks[mark].Weight, marks[mark].Type)
    }

    num_fields++;
  }

  return s

}
