
var models = {};

models.Student = Backbone.Model.extend({
    Id: 0,
    Name: "",
    Age: 0,
    urlRoot: "http://localhost:61899/api/students",
    IdAttribute: "Id"
});

models.Students = Backbone.Collection.extend({
    model: models.Student,
    url: "http://localhost:61899/api/students",
});




var views = {};

views.Student = Backbone.View.extend({

    tagName: 'li',

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
      jQuery(this.el).append(jQuery('<b>Name: </b><span>' + this.model.get('Name') + '</span>'));
      jQuery(this.el).append(jQuery('<b>Age: </b><span>' + this.model.get('Age') + '</span>'));
  
      return this;
    }
});

views.Students = Backbone.View.extend({

    collection: null,

    el: 'ul.studentsList',

    initialize: function(data) {

        this.collection = data.collection;
        console.log(this.collection);
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

        this.collection.forEach(function(item) {
    
            var itemView = new views.Student({
                model: item
            });
  
            var liHtml = itemView.render().el;

            element.append(liHtml);
            console.log(element);
            console.log(liHtml);
        });

        return this;
      }
});



var Router = Backbone.Router.extend({
    routes: {
      '': 'index'  // At first we display the index route
    },

    index: function() {  
        var collection = new models.Students();

        collection.fetch({
            success: function(data){
                console.log("cool!");
                console.log(data);
                var view = new views.Students({collection: data});
                //view.render();
                console.log(view.render().el);
            },
            error: function(error){
                alert(error);
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



