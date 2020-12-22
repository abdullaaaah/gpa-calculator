let num_fields = 1

function add_field()
{
    let del_field = "#del_field" + num_fields
    $(".transparent").removeClass("transparent")
    $(del_field).removeClass("invisible")
    $(del_field).attr("onclick", "remove_field(" + num_fields + ")")
    $(".trans-click").attr("onclick", null)


    num_fields += 1;
    $('#sideBar').append(
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
               <div class='col col-xl-2'>\
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
        $('#weight' + i).attr("id", "weight" + num)
        $('#percent' + i).attr("id", "percent" + num)
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

function grab_all_data() {
    let data_dict = {}
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
            let counter = 2
            let string_add = ""
            while (($('#name' + i).val() + " " + string_add) in data_dict) {
                string_add = ""
                string_add += ""+counter
                counter += 1
            }
            data_dict[($('#name' + i).val() + " " + string_add)] = mark_total / weight_total
        }
        if (i <= num_fields - 1 && weight_total > 0 && mark_total >= 0){
            change_percent(Math.round((mark_total /weight_total + Number.EPSILON) * 100) / 100)
        }
        else{
            change_percent(0)
        }
    }
    if (num_fields === 0){
        change_percent(0)
    }
    return data_dict
}
function change_chart(chart, data){
    chart.data.labels = []
    chart.data.datasets[0].data = []
    for (let key in data){
        if (data.hasOwnProperty(key)) {
            chart.data.labels.push(key);
            chart.data.datasets[0].data.push(data[key])
        }
    }
    chart.update();

}
function change_percent(percent){
    console.log(percent)
    $('#total_percent').text(percent + "%")
    change_color()
}


$(document).ready(function()
{
    $("#calc-gpa").click(function()
    {
        var dic = $("form").serializeArray();
        $.post("/calculate", dic, function(data){
            $('#total_percent').text(data['gpa'])
        })
        let data = grab_all_data()
        change_chart(chart, data)
    });
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [],
            datasets: [{
                label: 'My Performance',
                borderColor: 'rgb(99,174,255)',
                data: []
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
