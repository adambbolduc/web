$(document).ready(function () {

    getAllTasks();

    $('#add').click(function() {
        postNewTask();
    });

});


var getAllTasks = function () {
    $.ajax({
        url: 'http://localhost:5000/tasks',
        type: 'GET',
        dataType: 'json'
    })
        .done(function (data) {
            refreshTasks(data);
        })
        .fail(function (jqXHR, textStatus) {
            alert("Cannot get tasks, please try again at a later time...")
        });
};

var postNewTask = function() {
    $.ajax({
        url: 'http://localhost:5000/tasks/'+$('#inputID').val(),
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({task: $("#task").val()}),
    })
        .done(function(data){
            getAllTasks();
        })
        .fail(function(jqXHR, textStatus) {
           alert("cannot post : " + textStatus + "  " + jqXHR)
        });
};


var refreshTasks = function (data) {
    var tr = $('table').find('tbody');
    tr.empty();
    for (var i = 0; i < data.tasks.length; i++) {
        tr.append($('<tr>')
                .append($('<td>')
                    .text((data.tasks)[i].id)
            )
                .append($('<td>')
                    .text((data.tasks)[i].task)
            )
                .append($('<input>')
                    .attr('type', "submit")
                    .attr('class', "btn btn-warning col-xs-6")
                    .attr('value', "Edit")

            )
                .append($('<input>')
                    .attr('type', "submit")
                    .attr('class', "btn btn-danger col-xs-6")
                    .attr('value', "Delete")

            )
        )
    }
};





