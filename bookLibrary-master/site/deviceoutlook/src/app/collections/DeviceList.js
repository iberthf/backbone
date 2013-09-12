define(function(require) {
    var $           = require('jquery')
	  , Backbone    = require('backbone')
	  , Device		= require('models/Device');

    var DeviceList = Backbone.Collection.extend({
        model: Device,
		url: '../deviceUpdateManager/getDevicesWithUpdateFilters'
    });
	
    return DeviceList;
});