let num_fields = 1
let line_chart;
let bar_chart;
let final_grade;
let final_weight;
let data_dict;

function add_field()
{
    let del_field = "#del_field" + num_fields
    $(".transparent").removeClass("transparent")
    $(del_field).removeClass("invisible")
    $(del_field).attr("onclick", "remove_field(" + num_fields + ")")
    $(".trans-click").attr("onclick", null)


    num_fields += 1;
    //I made a function for this before, so ive swapped it here. -Abd
    $('#sideBar').append(render_transparent_row);
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
    update();
}

function change_percent_color(){
    let grade = $('#total_percent').text()
    grade = parseInt(grade.slice(0, 2))
    if (grade >= 85){
        $('#total_percent').attr("class", "text-success")
    }
    else if (grade < 85 && grade >= 70){
        $('#total_percent').attr("class", "text-warning")
    }
    else if (grade < 70){
        $('#total_percent').attr("class", "text-danger")
    }

}

function line_graph_data() {
    let line_graph_dict = {}
    let type_count = {'Exam': 0, 'Midterm': 0, 'Assignment': 0,
                        'Quiz': 0, 'Lab': 0, 'Tutorial Activity': 0}

    final_grade = 0
    final_weight = 0

    for (let row in data_dict){
        if (data_dict.hasOwnProperty(row)) {
                let weight = data_dict[row]['Weight']
                let grade = data_dict[row]['Mark']
                let type = data_dict[row]['Type']
                final_grade += grade * weight
                final_weight += weight
                if (type in type_count){
                    type_count[type] += 1
                }
                line_graph_dict[type + " " + type_count[type]] = final_grade / final_weight
            }
    }
    return line_graph_dict
}

function bar_graph_data() {
    let bar_graph_dict = {}
    let type_freq_dict = {}
    for (let row in data_dict) {
        if (data_dict.hasOwnProperty(row)) {
            let type = data_dict[row]['Type']
            let grade = data_dict[row]['Mark']
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
    if (isNaN(percent)){
        $('#total_percent').text("0%")
    }
    else {
        $('#total_percent').text(percent + "%")
    }
    change_percent_color()
}

function change_weight_color(weight){
    if (weight > 100){
        $('#total_weight').attr("class", "mb-4 ml-4 text-danger")
    }
    else if (weight <= 100 || weight >= 0){
        $('#total_weight').attr("class", "mb-4 ml-4 text-dark")
    }
    else{
        $('#total_weight').attr("class", "mb-4 ml-4 text-danger")
    }
}

function change_total_weight(weight){
    if (isNaN(weight)){
        $('#total_weight').text("Total Weight: " + "0")
    }
    else{
        $('#total_weight').text("Total Weight: " + weight)
    }
    change_weight_color(weight)

}

function percent_check(percent) {
    let final_percent = 0
    for (let row in data_dict) {
        if (data_dict.hasOwnProperty(row)) {
            let grade = data_dict[row]['Mark']
            final_percent += grade
        }
    }
    return !(percent < 0 || final_percent > data_dict.length * 100 || percent > 100 || isNaN(percent));
}

function weight_check(weight) {
    let final_weight = 0
    for (let row in data_dict) {
        if (data_dict.hasOwnProperty(row)) {
            let row_weight = data_dict[row]['Weight']
            final_weight += row_weight
        }
    }
    return !(final_weight > 100 || weight < 0 || isNaN(weight));
}
function change_to_red(row, type){
    let type_id = '#'+type+row.slice(4)
    $(type_id).addClass('border-danger')
}

function change_to_white(row, type){
    let type_id = '#'+type+row.slice(4)
    $(type_id).removeClass('border-danger')
}

function update(){
    scrape_data()
    let line_data = line_graph_data()
    let bar_data = bar_graph_data()
    for (let row in data_dict){
        if (data_dict.hasOwnProperty(row)){
            let percent = data_dict[row]['Mark']
            let weight = data_dict[row]['Weight']
            if (percent_check(percent) && weight_check(weight)) {
                change_to_white(row, 'percent')
                change_to_white(row, 'weight')
                change_chart(line_chart, line_data)
                change_chart(bar_chart, bar_data)
                if (final_weight <= 0 || isNaN(final_weight)) {
                    change_percent(0)
                } else {
                    change_percent(two_decimal_places(final_grade / final_weight))
                }
                max_grade()
                min_grade()
                goal_percentage()
                change_total_weight(final_weight)
            } else{
                if (!(percent_check(percent))){
                    change_to_red(row, 'percent')
                }else{
                    change_to_white(row, 'percent')
                }

                if (!(weight_check(weight))){
                    change_to_red(row, 'weight')
                }else{
                    change_to_white(row, 'weight')
                }
                change_total_weight(final_weight)
            }
        }
    }
    if (!Object.keys(data_dict).length){
        final_grade = 0
        final_weight = 0
        change_chart(line_chart, line_data)
        change_chart(bar_chart, bar_data)
        change_percent(0)
        max_grade()
        goal_percentage()
        change_total_weight(final_weight)
    }
}

function goal_percentage(){
    let goal = parseInt($('#gpa_goal').val())
    let w_2 = parseInt($('#next_weight').val())
    let g_2;
    let grade = parseFloat(final_grade) / parseFloat(final_weight)
    let weight = parseFloat(final_weight)
    if (!percent_check(goal)){
        $('#gpa_goal').addClass('text-danger')
    }
    else{
        $('#gpa_goal').removeClass('text-danger')
    }
    if (!weight_check(w_2)){
        $('#next_weight').addClass('text-danger')
    }
    else{
        $('#next_weight').removeClass('text-danger')
    }

    if (isNaN(w_2)) {
        let rem_weight = 100-weight
        g_2 = two_decimal_places(((weight * (grade - goal) - (rem_weight * goal)) / (-1*(rem_weight))))
        w_2 = 100 - final_weight
    }
    else{
        g_2 = two_decimal_places(((weight * (grade - goal) - (w_2 * goal)) / (-1*(w_2))))
    }
    if (isNaN(w_2) || isNaN(g_2) || w_2 === Infinity || w_2 === -Infinity ||
        g_2 === Infinity || g_2 === -Infinity){
        if (isNaN(g_2) || g_2 === Infinity || g_2 === -Infinity) {
            $('#needed_gpa').text(0 + "%")
            $('#needed_weight').text(0)
        }
        if (isNaN(w_2) || w_2 === Infinity || w_2 === -Infinity){
            $('#needed_weight').text(w_2 + "%")
            $('#needed_gpa').text(g_2)
        }
    }
    else {
        $('#needed_gpa').removeClass('text-danger')
        $('#needed_weight').removeClass('text-danger')
        $('#needed_gpa').text(g_2 + "%")
        $('#needed_weight').text(w_2)
        if (!(percent_check(g_2))){
            $('#needed_gpa').addClass('text-danger')
        }
        if (!(weight_check(w_2))){
            $('#needed_weight').addClass('text-danger')

        }
    }
}
function max_min_check(grade, weight, type){
    if (isNaN(grade) || isNaN(weight)){
        if (isNaN(grade)){
            $('#'+type+'_grade').text(0 + "%")
        }
        else{
            $('#'+type+'_grade').text(max_grade + "%")
        }
        if (isNaN(weight)){
            $('#remain_weight').text(0)
        }
        else{
            $('#remain_weight').text(weight)
        }
    }
    else {
        $('#'+type+'_grade').text(grade + "%")
        $('#remain_weight').text(weight)
        if (!(percent_check(grade))){
            $('#'+type+'_grade').addClass('text-danger')
        }
        else{
            $('#'+type+'_grade').removeClass('text-danger')
        }
    }
}

function max_grade(){
    let remain_weight = 100 - final_weight
    let assume_grade = 100
    let current_grade = final_grade / final_weight
    let max_grade = ((current_grade * final_weight) + (assume_grade * remain_weight))/100
    max_min_check(max_grade, remain_weight, 'max')
}

function min_grade(){
    let remain_weight = 100 - final_weight
    let current_grade = final_grade / final_weight
    let min_grade = (current_grade * final_weight)/100
    max_min_check(min_grade, remain_weight, 'min')
}

function scrape_data(){
    data_dict = {}
    for (let i = 0; i <= (num_fields - 1); i++) {
        let inner_dict = {}
        let mark = parseFloat($('#percent' + i).val())
        let type = $('#name' + i).val()
        let weight = parseFloat($('#weight' + i).val())
        inner_dict['Mark'] = mark
        inner_dict['Weight'] = weight
        inner_dict['Type'] = type
        data_dict['#row' + i] = inner_dict
        }
    return data_dict
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
                backgroundColor: "rgba(7, 17, 54, 0.05)",
                borderColor: "#071136",
                pointRadius: 3,
                pointBackgroundColor: "#071136",
                pointBorderColor: "#071136",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "#071136",
                pointHoverBorderColor: "#071136",
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
                backgroundColor: "#071136",
                hoverBackgroundColor: "#071136",
                borderColor: "#071136",
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
