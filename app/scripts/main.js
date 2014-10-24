/*global TodomvcBb, $*/


window.TodomvcBb = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    ENTER_KEY: 13,
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');

        // Create our global collection of **Todos**.
        TodomvcBb.Todos = new TodomvcBb.Collections.Todolist();

        new TodomvcBb.Views.Appview();


        TodomvcBb.TodoRouter = new TodomvcBb.Routers.Workspace();
        Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
    TodomvcBb.init();
});
