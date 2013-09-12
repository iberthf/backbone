define(function(require) {
    var $           = require('jquery')
      , Backbone    = require('backbone');
    
    var Device = Backbone.Model.extend({
        defaults: {
			 AccountDeviceID				: ''
			,AccountID						: ''
			,ResourceName					: ''
			,ResourceFile					: ''
			,AssetName						: ''
			,RequestedDate					: ''
			,FinalResourceFileUpdateDateGMT	: ''
			,IDReportDate					: ''
			,StillPending					: ''
			,ScheduledUpdate				: ''
			,DownloadDate					: ''
			,ManufacturingDate				: ''
			,HardwareModel					: ''
			,ESN							: ''
			,ICCID							: ''
			,DeviceIP						: ''
			,PhoneNumber					: ''
			,PhoneCarrier					: ''
		},

		parse: function( response ) {
			return response;
		}
    });
    return Device;
});

