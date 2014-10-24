/*global TodomvcBb, Backbone, JST*/

TodomvcBb.Views = TodomvcBb.Views || {};

(function () {
    'use strict';

    TodomvcBb.Views.Appview = Backbone.View.extend({
        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#todoapp',

        // Our template for the line of statistics at the bottom of the app.
        statsTemplate: JST['app/scripts/templates/AppView.hbs'],

        // Delegated events for creating new items, and clearing completed ones.
        events: {
          'keypress #new-todo': 'createOnEnter',
          'click #clear-completed': 'clearCompleted',
          'click #toggle-all': 'toggleAllComplete'
        },

        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed.
        initialize: function () {
            this.allCheckbox = this.$('#toggle-all')[0];
            this.$input = this.$('#new-todo');
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');

            this.listenTo(TodomvcBb.Todos, 'add', this.addOne);
            this.listenTo(TodomvcBb.Todos, 'reset', this.addAll);

            this.listenTo(TodomvcBb.Todos, 'change:completed', this.filterOne);
            this.listenTo(TodomvcBb.Todos,'filter', this.filterAll);
            this.listenTo(TodomvcBb.Todos, 'all', this.render);

            TodomvcBb.Todos.fetch();
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function() {
          var completed = TodomvcBb.Todos.completed().length;
          var remaining = TodomvcBb.Todos.remaining().length;

          if (TodomvcBb.Todos.length ) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html(this.statsTemplate({
              completed: completed,
              remaining: remaining
            }));

            this.$('#filters li a')
              .removeClass('selected')
              .filter('[href="#/' + ( TodomvcBb.TodoFilter || '' ) + '"]')
              .addClass('selected');
          } else {
            this.$main.hide();
            this.$footer.hide();
          }

          this.allCheckbox.checked = !remaining;
        },

        // Add a single todo item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function( todo ) {
          var view = new TodomvcBb.Views.Todoview({ model: todo });
          $('#todo-list').append( view.render().el );
        },

        // Add all items in the **Todos** collection at once.
        addAll: function() {
          this.$('#todo-list').html('');
          TodomvcBb.Todos.each(this.addOne, this);
       },

       filterOne : function (todo) {
          todo.trigger('visible');
        },

        // New
        filterAll : function () {
          TodomvcBb.Todos.each(this.filterOne, this);
        },


        // New
        // Generate the attributes for a new Todo item.
        newAttributes: function() {
          return {
            title: this.$input.val().trim(),
            order: TodomvcBb.Todos.nextOrder(),
            completed: false
          };
        },

        // New
        // If you hit return in the main input field, create new Todo model,
        // persisting it to localStorage.
        createOnEnter: function( event ) {
          if ( event.which !== TodomvcBb.ENTER_KEY || !this.$input.val().trim() ) {
            return;
          }

          TodomvcBb.Todos.create( this.newAttributes() );
          this.$input.val('');
        },

        // New
        // Clear all completed todo items, destroying their models.
        clearCompleted: function() {
          _.invoke(TodomvcBb.Todos.completed(), 'destroy');
          return false;
        },

        // New
        toggleAllComplete: function() {
          var completed = this.allCheckbox.checked;

          TodomvcBb.Todos.each(function( todo ) {
            todo.save({
              'completed': completed
            });
          });
        }

    });

})();
