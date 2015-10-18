$(function () {
    $(document).ready(function () {

        var TaskModel = Backbone.Model.extend({
            urlRoot: "http://localhost:5000/tasks"
        });

        var TaskCollection = Backbone.Collection.extend({
            url: "http://localhost:5000/tasks",
            model: TaskModel,
            parse: function (response) {
                return response.tasks;
            }
        });

        var TaskView = Backbone.View.extend({
            el: "#task_container",
            template: _.template($('#task_view_template').html()),
            initialize: function () {
                _.bindAll(this, "render");

                var self = this;

                this.collection.bind("change", function () {
                    self.render();
                })
            },
            render: function () {
                self = this;
                var htmlToRender = "";
                this.collection.each(function (task) {
                    htmlToRender += self.template(task.toJSON());
                });
                this.$el.html(htmlToRender);
            }
        });;


        var taskCollection = new TaskCollection();
        var taskView = new TaskView({collection: taskCollection});
        taskCollection.fetch().complete(function () {
            taskView.render();
        });

    });

});