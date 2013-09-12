define( function(require) {
	var $           = require('jquery')
      , Backbone    = require('backbone')
	  , DeviceList	= require('collections/DeviceList')
	  , DeviceView	= require('views/DeviceView');
	
	var DeviceListView = Backbone.View.extend({
		el: '#devices',

		initialize: function( ) {
			this.collection = new DeviceList();
			this.collection.fetch({reset: true, type: 'post', data: {AccountId:1, PageNumber:1, PageCount:10}});
			this.render();
			
			this.listenTo( this.collection, 'reset', this.render );
		},

		// render library by rendering each book in its collection
		render: function() {
			this.collection.each(function( item ) {
				this.renderDevice( item );
			}, this );
		},

		// render a book by creating a BookView and appending the
		// element it renders to the library's element
		renderDevice: function( item ) {
			var deviceView = new DeviceView({
				model: item
			});
			this.$el.append( deviceView.render().el );
		}
	});
	
    return DeviceListView;
});