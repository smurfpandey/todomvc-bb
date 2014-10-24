/*global TodomvcBb, Backbone*/

TodomvcBb.Routers = TodomvcBb.Routers || {};

(function () {
    'use strict';

    TodomvcBb.Routers.Workspace = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },

        setFilter: function(param){
            //Set current filter
            if(param){
                param = param.trim();
            }
            TodomvcBb.TodoFilter = param || '';

            TodomvcBb.Todos.trigger('filter');
        }
    });

})();
