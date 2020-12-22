let num_fields = 1
let num_exams = 0
let num_assignments = 0

function add_field()
{
    let del_field = "#del_field" + num_fields
    $(".transparent").removeClass("transparent")
    $(del_field).removeClass("invisible")
    $(del_field).attr("onclick", "remove_field(" + num_fields + ")")
    $(".trans-click").attr("onclick", null)


    num_fields += 1;
    $('#gpaForm').append(
        "<div class='row' id='row"+num_fields+"'> \
        <div class='col'> \
        <div class='input-group mb-3 transparent trans-click' id='"+num_fields+"' onclick='add_field()'> \
                <div class='input-group-prepend'> \
                    <span class='input-group-text'>Percent</span> \
                </div> \
                <input id = 'percent"+num_fields+"' name = 'mark' type='text' class='form-control' placeholder=99 aria-describedby=basic-addon1> \
                  <div class='input-group-prepend'> \
                      <span class='input-group-text'>Weight</span> \
                  </div> \
                <input id = 'weight"+num_fields+"' name = 'weight' type='text' class='form-control' placeholder='10' aria-describedby='basic-addon1'> \
                <select id = 'name"+num_fields+"' class='custom-select'> \
                            <option value='Exam'>Exam</option> \
                            <option value='Midterm'>Midterm</option> \
                            <option value='Assignment'>Assignment</option> \
                            <option value='Tutorial Marks'>Tutorial Marks</option> \
                        </select> \
                    </div>\
               </div>\
               <div class='col col-lg-2'>\
                <button type='button' id ='del_field"+ num_fields +"' class='btn btn-danger invisible'>Delete</button>\
            </div>\
               </div>");
    return 0
}

function remove_field(id){
    /*delete row id*/
    if (id > -1){
        let row_id = '#row' + id
        let del_field = '#del_field' + id
        $(row_id).remove()
        $(del_field).remove()
        num_fields -= 1
    }
    /* refactor all other ids */
    for (let i = id; i <= num_fields+1; i++){
        let num = i-1
        $('#row' + i).attr("id", "row" + num)
        $('#del_field' + i).attr("id", "del_field" + num)
        $('#' + i).attr("id", ""+num)
        $('#del_field' + num).attr("onclick", "remove_field(" + num + ")")
        $('#name' + i).attr("id", "name" + num)
    }
    return 0
}

function change_color(){
    let grade = $('#total_percent').text()
    grade = parseInt(grade.slice(0, 2))
    if (grade >= 85){
        $('#total_percent').attr("style", "color:#69EA22;")
    }
    else if (grade < 85 && grade >= 75){
        $('#total_percent').attr("style", "color:#ea7f22;")
    }
    else if (grade < 75){
        $('#total_percent').attr("style", "color:#ea2222;")
    }

}

function grab_all_data(chart) {
    chart.data.labels = []
    chart.data.datasets[0].data = []
    for (let i = 0; i <= num_fields - 1; i++) {
        let mark_total = 0
        let weight_total = 0
        for (let n = 0; n <= i; n++) {
            let mark = parseFloat($('#percent' + n).val())
            let weight = parseFloat($('#weight' + n).val())
            mark_total += mark * weight
            weight_total += weight
        }
        if (weight_total > 0 && mark_total >= 0) {
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(mark_total / weight_total);
            });
        }
        chart.data.labels.push($('#name' + i).val())
    }
    chart.update();
    let latest_percent = chart.data.datasets[0].data
    let index = chart.data.datasets[0].data.length;
    $('#total_percent').text(latest_percent[index-1]+"%")
}

$(document).ready(function()
{
    $("#calc-gpa").click(function()
    {
        var dic = $("form").serializeArray();
        $.post("/calculate", dic, function(data){
            $('#total_percent').text(data['gpa'])
        })
        grab_all_data(chart)
        change_color()
    });
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [], /*Names of Assignments etc*/
            datasets: [{
                label: 'My Performance',
                backgroundColor: 'rgb(99,174,255)',
                borderColor: 'rgb(99,174,255)',
                data: [] /*Percent per thing*/
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        step: 5
                    }
                }]
            }
        }
    });
});
