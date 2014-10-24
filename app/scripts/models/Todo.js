/*global TodomvcBb, Backbone*/

TodomvcBb.Models = TodomvcBb.Models || {};

(function () {
    'use strict';

    TodomvcBb.Models.Todo = Backbone.Model.extend({

        // Default attributes ensure that each todo created has `title` and `completed` keys.
        defaults: {
          title: '',
          completed: false
        },

        // Toggle the `completed` state of this todo item.
        toggle: function() {
          this.save({
            completed: !this.get('completed')
          });
        }
    });

})();
