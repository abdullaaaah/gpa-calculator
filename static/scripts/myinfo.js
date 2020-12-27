/* Purpose of file: Any js for the main page */


/* Chart functions */
function BuildChart(labels, values, chartTitle) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, 
      datasets: [{
        label: chartTitle, 
        data: values, 
        lineTension: 0.3,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderColor: "rgba(0, 0, 0, 0.5)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(0, 0, 0, 0.5)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(0, 0, 0, 0.5)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
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
            },
            responsive: true,
            maintainAspectRatio: false,
        }
  });
  return myChart;
}

function generate_graph()
{

  var table = document.getElementById('dataTable');
  var json = [];
  var headers =[];
  for (var i = 0; i < table.rows[0].cells.length; i++) {
    headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
  }


  for (var i = 1; i < table.rows.length; i++) {
    var tableRow = table.rows[i];
    var rowData = {};
    for (var j = 0; j < tableRow.cells.length; j++) {
      rowData[headers[j]] = tableRow.cells[j].innerHTML;
    }

    json.push(rowData);
  }



  var labels = json.map(function (e) {
    return e.coursecode;
  });
  console.log(labels);

  var values = json.map(function (e) {
    return e.percentage;
  });

  var chart = BuildChart(labels, values, "%");

}
/* Chart function ends */


function render_all_courses_table()
{

    s = ''

    for (course of courses)
    {

        mark = calculate_percentage(marks_in_courses[course])

        s += `
        <tr>
        <th scope="row">${course}</th>
        <td>${mark}</td>
        </tr>

        `
    }

    return s
}


$(document).ready(function() {

    $("#course-overview-table").append(render_all_courses_table())

    generate_graph()

})