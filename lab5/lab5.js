$(document).ready(function () {

    getAllTasks();

    $('#add').click(function () {
        postNewTask();
    });

    $('#modalEditButton').click(function () {
        var id = $('#editID').val();
        var task = $('#editTask').val();
        editTask(id,task);
        closeModal();
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

var edit

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
        openModal(taskID, task);
    });
};

var editTask = function(id,task) {
    $.ajax({
        url: 'http://localhost:5000/tasks/' + id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({task: task}),
    })
        .done(function (data) {
            getAllTasks();
        })
        .fail(function (jqXHR, textStatus) {
            alert("cannot post : " + textStatus + "  " + jqXHR)
        });
}

var openModal = function(taskID, task) {

    var modal = $('#editModal').modal();

    modal.find('#editID').val(taskID);
    modal.find('#editTask').val(task)
    modal.show();

}

var closeModal = function() {

    var modal = $('#editModal').modal('toggle');

}









