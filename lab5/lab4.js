$(document).ready(function() {
    'use strict';

    var id;
    var dialog;

    $.ajax({
        url: 'http://localhost:5000/tasks',
        type: 'GET',
        dataType: 'json'
    })
    .done(function (data) {

    })
    .fail(function (jqXHR, textStatus) {

    });

    function refreshDisplay(data){
        $("table").find("tr:gt(0)").remove();
        var tr;
        for (var i = 0; i < data.tasks.length; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + (data.tasks)[i].id + "</td>");
            tr.append("<td>" + (data.tasks)[i].task + "</td>");
            tr.append("<td><button class='btn edit'>Edit</button><button class='btn delete'>Delete</button></td>");
            $('table').append(tr);
        }
    };

    function editTask(){
        $.ajax({
            url : 'http://localhost:5000/tasks/' + id,
            type : 'PUT',
            data : JSON.stringify({ task: $("#edit").val()}),
            contentType: 'application/json'
        })
        .done(function (data) {
            refreshDisplay(data);
        })
        .fail(function (jqXHR, textStatus) {

        });
        dialog.dialog( "close" );
    };

    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Confirm": editTask,
            Cancel: function() {
                dialog.dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
        }
    });

    var form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        editTask();
    });

    $("#get").click(function(){
        $.ajax({
            url : 'http://localhost:5000/tasks/' + $('#getID').val(),
            type : 'GET',
            contentType: 'application/json'
        })
        .done(function (data) {
            $("table").find("tr:gt(0)").remove();
            var tr;
            tr = $('<tr/>');
            tr.append("<td>" + data.task.id + "</td>");
            tr.append("<td>" + data.task.task + "</td>");
            tr.append("<td><button class='btn edit'>Edit</button><button class='btn delete'>Delete</button></td>");
            $('table').append(tr);
        })
        .fail(function (jqXHR, textStatus) {

        });
    });

    $("#add").click(function(){
        $.ajax({
            url : 'http://localhost:5000/tasks/' + $('#id').val(),
            type : 'POST',
            data : JSON.stringify({ task: $("#task").val()}),
            contentType: 'application/json'
        })
        .done(function (data) {
            refreshDisplay(data);
        })
        .fail(function (jqXHR, textStatus) {

        });
    });

    $('#id').keyup(function () {
        var replaced = this.value.replace(/[^0-9\.]/g, '');
        if (this.value != replaced) {
            this.value = replaced;
        }
    });

    $(document).on('click', '.edit', function(){
        id = $(this).parent().prev().prev().text();
        dialog.dialog( "open" );
    });

    $(document).on('click', '.delete', function(){
        id = $(this).parent().prev().prev().text();

        $.ajax({
            url : 'http://localhost:5000/tasks/' + id,
            type : 'DELETE'
        })
        .done(function (data) {
            refreshDisplay(data);
        })
        .fail(function (jqXHR, textStatus) {

        });
    });

});
