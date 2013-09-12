define( function(require) {
    var $           = require('jquery')
      , Backbone    = require('backbone')
	  , _		    = require('underscore')
	  , Handlebars  = require('handlebars')
	  , DeviceTpl     = require('text!templates/Device.tpl');
	
	var DeviceView = Backbone.View.extend({
		tagName: 'div',
		className: 'deviceContainer',

		render: function() {
//			console.log("this.model.toJSON():"+this.model.toJSON().title);
			
			var template = Handlebars.compile( DeviceTpl );
			this.$el.html( template(this.model.toJSON()) );
			return this;
		}
	});
	
    return DeviceView;
});