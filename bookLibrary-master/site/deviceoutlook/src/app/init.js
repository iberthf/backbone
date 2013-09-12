//require(['jquery', 'views/AppView'], function($, AppView){
//require(['jquery', 'views/LibraryView'], function($, LibraryView){
require(['jquery', 'views/AppView', 'views/DeviceListView' ], function($, AppView, DeviceListView){
	$(function() {
		require(AppView);
		new DeviceListView();
	});
});