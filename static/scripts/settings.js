let render_edit_gpa_scale = function()
{
    s = ''

    for (scale of gpa_scale.order)
    {
        s += `
        <div class="form-row">
        <div class="col-md-4 mb-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend2">${(scale*1).toFixed(1)}</span>
            </div>
            <input value="${gpa_scale[scale][0]}" id="start-${scale}" type="text" class="form-control" aria-describedby="inputGroupPrepend2" name='start'>
            <input value="${gpa_scale[scale][gpa_scale[scale].length - 1]}" id="end-${scale}"  type="text" class="form-control" aria-describedby="inputGroupPrepend2" name='end'>
          </div>
        </div>
      </div>
        `
    }

    return s

}

let set_gpa_scale_from_form = function()
{
    for (scale of gpa_scale.order)
    {
        start = parseFloat(document.getElementById('start-' + scale).value)
        end = parseFloat(document.getElementById('end-' + scale).value)
        gpa_scale[scale] = range(start, end)
    }

}

$(document).ready(function() {
    $('#edit-gpa-form').append(render_edit_gpa_scale())
})