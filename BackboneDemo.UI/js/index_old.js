var models = {};

// Our base model is "person"
models.Student = Backbone.Model.extend({
    Id: "",
    Name: "",
    Age: ""
});

models.Students = Backbone.Collection.extend({
  model: models.Student,
  url: "http://localhost:61899/api/Students"
});


var Router = Backbone.Router.extend({
    routes: {
      '': 'index'  // At first we display the index route
    },
  
    index: function() {
      var students = new models.Students();

      var view = {};

      students.fetch({
          success: function(collection){
            view = new views.Students({
                collection: collection
              });
            view.render();
          },
          error: function(){
            alert("error");
          }
      });
    }
  });
  
  jQuery(document).ready(function() {
    // When the document is ready we instantiate the router
    var router = new Router();
  
    // And tell Backbone to start routing
    Backbone.history.start();
  });

  var views = {};

views.Student = Backbone.View.extend({
  // Each person will be shown as a table row
  tagName: 'tr',

  initialize: function(options) {
    // Ensure our methods keep the `this` reference to the view itself
    _.bindAll(this, 'render');

    // If the model changes we need to re-render
    this.model.bind('change', this.render);
  },

  render: function() {
    // Clear existing row data if needed
    jQuery(this.el).empty();

    // Write the table columns
    jQuery(this.el).append(jQuery('<td>' + this.model.get('Id') + '</td>'));
    jQuery(this.el).append(jQuery('<td>' + this.model.get('Name') + '</td>'));
    jQuery(this.el).append(jQuery('<td>' + this.model.get('Age') + '</td>'));

    return this;
  }
});

views.Students = Backbone.View.extend({
  // The collection will be kept here
  collection: null,

  // The people list view is attached to the table body
  el: 'tbody',

  initialize: function(options) {
    this.collection = options.collection;

    // Ensure our methods keep the `this` reference to the view itself
    _.bindAll(this, 'render');

    // Bind collection changes to re-rendering
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.render);
    this.collection.bind('remove', this.render);
  },

  render: function() {
    var element = jQuery(this.el);
    // Clear potential old entries first
    element.empty();

    // Go through the collection items
    this.collection.forEach(function(item) {

      // Instantiate a PeopleItem view for each
      var itemView = new views.Student({
        model: item
      });

      // Render the PeopleView, and append its element
      // to the table
      element.append(itemView.render().el);
    });

    return this;
  }
});