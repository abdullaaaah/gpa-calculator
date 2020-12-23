let num_fields = 1
let line_chart;
let bar_chart;
let final_grade;
let final_weight;
let data_dict;
let num;

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
                    <span class='input-group-text bg-light border-0 small'>Percent:</span> \
                </div> \
                <input id = 'percent"+num_fields+"' name = 'mark' onkeyup = 'update(line_chart)' type='number' maxlength='3' class='form-control bg-light border-0 small' aria-describedby='basic-addon1'> \
                  <div class='input-group-prepend'> \
                      <span class='input-group-text bg-light border-0 small'>Weight:</span> \
                  </div> \
                <input id = 'weight"+num_fields+"' name = 'weight' onkeyup = 'update(line_chart)' type='number' maxlength='3' class='form-control bg-light border-0 small' aria-describedby='basic-addon1'> \
                <select id = 'name"+num_fields+"' onchange = 'update(line_chart)' class='custom-select bg-light border-0 small'> \
                            <option value='Exam'>Exam</option> \
                            <option value='Midterm'>Midterm</option> \
                            <option value='Assignment'>Assignment</option> \
                            <option value='Tutorial Marks'>Tutorial Marks</option> \
                            <option value='Quiz'>Quiz</option> \
                            <option value=\"Lab\">Lab</option> \
                        </select> \
                    </div>\
               </div>\
               <div class='col col-xl-2'>\
                <button type='button' id ='del_field"+ num_fields +"' onclick= '' class='btn btn-danger invisible'>Delete</button>\
            </div>\
               </div>");
}

function remove_field(id){
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
    update(line_chart)
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

function line_graph_data() {
    let line_graph_dict = {}
    let type_count = {'Exam': 0, 'Midterm': 0, 'Assignment': 0,
                        'Quiz': 0, 'Lab': 0, 'Tutorial Marks': 0}

    final_grade = 0
    final_weight = 0

    for (let row in data_dict){
        if (data_dict.hasOwnProperty(row)) {
            for (let type in data_dict[row]) {
                if (data_dict[row].hasOwnProperty(type)) {
                    for (let grade in data_dict[row][type]) {
                        if (data_dict[row][type].hasOwnProperty(grade)) {
                            /*grade:grade, weight:data_dict[row][type][grade]*/
                            let weight = data_dict[row][type][grade]
                            final_grade += grade * weight
                            final_weight += weight

                        }
                    }
                    if (type in type_count){
                        type_count[type] += 1
                    }
                }
            }
            let current_type = Object.keys(data_dict[row])[0]
            if (type_count[current_type] > 1){
                line_graph_dict[current_type + " " + type_count[current_type]] = final_grade / final_weight
            }
            else{
                line_graph_dict[current_type] = final_grade / final_weight
            }
        }

    }
    if (final_weight <= 0 || isNaN(final_weight)){
        change_percent(0)
    }
    else {
        change_percent(two_decimal_places(final_grade / final_weight))
    }
    return line_graph_dict
}

function bar_graph_data() {
    let bar_graph_dict = {}
    let type_freq_dict = {}
    for (let row in data_dict) {
        if (data_dict.hasOwnProperty(row)) {
            for (let type in data_dict[row]) {
                if (data_dict[row].hasOwnProperty(type)) {
                    for (let grade in data_dict[row][type]) {
                        if (data_dict[row][type].hasOwnProperty(grade)){
                            if (!(type in type_freq_dict)){
                                type_freq_dict[type] = 1
                            }
                            else{
                                type_freq_dict[type] += 1
                            }
                            if (!(type in bar_graph_dict)){
                                bar_graph_dict[type] = parseFloat(grade)
                            }
                            else{
                                bar_graph_dict[type] += parseFloat(grade)
                            }
                        }
                    }
                }
            }
        }
    }
    for (let item in type_freq_dict){
        if (type_freq_dict.hasOwnProperty(item)){
            bar_graph_dict[item] = bar_graph_dict[item] / type_freq_dict[item]
        }
    }
    return bar_graph_dict
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
    $('#total_percent').text(percent + "%")
    change_color()
}

function update(){
    scrape_data()
    let line_data = line_graph_data()
    let bar_data = bar_graph_data()
    change_chart(line_chart, line_data)
    change_chart(bar_chart, bar_data)
    goal_percentage()
}

function two_decimal_places(num){
    return Math.round((num + Number.EPSILON)*100)/100
}

function goal_percentage(){
    let goal = parseInt($('#gpa_goal').val())
    let w_2 = parseInt($('#next_weight').val())
    let g_2;
    let grade = parseFloat(final_grade) / parseFloat(final_weight)
    let weight = parseFloat(final_weight)
    if (isNaN(w_2)) {
        g_2 = 100
        w_2 = two_decimal_places(((weight * (grade - goal)) / (goal - g_2)))
        while (w_2 > (100 - weight) || w_2 < 0) {
            g_2 -= 1
            if (g_2 < 0) {
                g_2 = 0
                break
            }
            w_2 = two_decimal_places(((weight * (grade - goal)) / (goal - g_2)))
        }
    }
    else{

        g_2 = two_decimal_places(((weight * (grade - goal) - (w_2 * goal)) / (-1*(w_2))))
    }
    if (isNaN(w_2) || isNaN(g_2)){
        if (isNaN(g_2)) {
            $('#needed_gpa').text("Needed Grade: " + 0)
        }
        if (isNaN(w_2)){
            $('#needed_weight').text("Needed Weight: " + 0)
        }
    }
    else {
        $('#needed_gpa').text("Needed Grade: " + g_2)
        $('#needed_weight').text("Needed Weight: " + w_2)
    }
}

function scrape_data(){
    data_dict = {}
    for (let i = 0; i <= (num_fields - 1); i++) {
        let num_dict = {}
        let type_dict = {}
        let mark = parseFloat($('#percent' + i).val())
        let type = $('#name' + i).val()
        num_dict[mark] = parseFloat($('#weight' + i).val())
        type_dict[type] = num_dict
        data_dict['#row' + i] = type_dict
        }
    return data_dict
}

function save_data(){
    console.log(data_dict)
}


$(document).ready(function()
{
    let ctx = document.getElementById('line_chart').getContext('2d');
    let ctx2 = document.getElementById('bar_chart').getContext('2d');
    line_chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                label: "My Performance",
                data: []
            }]
        },

        // Configuration options go here
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        step: 5
                    }
                }]
            }
        }
    });
    bar_chart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                backgroundColor: "#4e73df",
                hoverBackgroundColor: "#2e59d9",
                borderColor: "#4e73df",
                label: "Assessment Performance",
                data: []
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        step: 5
                    }
                }]
            }
        }
    })

});
