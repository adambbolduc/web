$(document).ready(function () {

    getAllTasks();

    $('#add').click(function () {
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

var postNewTask = function () {
    $.ajax({
        url: 'http://localhost:5000/tasks/' + $('#inputID').val(),
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({task: $("#task").val()}),
    })
        .done(function (data) {
            getAllTasks();
        })
        .fail(function (jqXHR, textStatus) {
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
                .append($('<button>')
                    .attr('class', "btn btn-warning col-xs-6 editButton")
                    .attr('data-id',(data.tasks)[i].id)
                    .attr('data-task', (data.tasks)[i].task)
                    .text("Edit")
            )
                .append($('<button>')
                    .attr('class', "btn btn-danger col-xs-6")
                    .text("Delete")
            )
        )
    }

    $('.editButton').click(function() {
        var taskID = $(this).attr('data-id');
        var task = $(this).attr('data-task');
        alert(taskID +" : " + task);
        openModal(taskID, task);
    });
};


var openModal = function(taskID, task) {

    var modal = $('#editModal').modal();

    modal.find('p').text(task);
    modal.attr('task', task);
    modal.show();



}









