require.config({
	baseUrl: 'deviceoutlook'
	, paths: {
		  jquery        : '../vendor/jquery/1.9.1/jquery'
		, jqueryui      : '../vendor/jquery/plugins/jqueryui/1.10.3/jquery-ui'
		, layout        : '../vendor/jquery/plugins/jquery.layout/1.3.0/jquery.layout'
		, jstree        : '../vendor/jquery/plugins/jquery.jstree/1.0-rc3/jquery.jstree'
		, dataTables    : '../vendor/jquery/plugins/jquery.dataTables/1.9.4/jquery.dataTables'
		, ZeroClipboard : '../vendor/jquery/plugins/ZeroClipboard/1.0.4/ZeroClipboard'
		, TableTools    : '../vendor/jquery/plugins/TableTools/2.1.5/TableTools'
		, slimscroll    : '../vendor/jquery/plugins/jquery.slimscroll/1.3.0/jquery.slimscroll'
        , multipleselect: '../vendor/jquery/plugins/jquery.multiple.select/1.0.4/jquery.multiple.select'
        , contextMenu   : '../vendor/jquery/plugins/jquery.contextMenu/jquery.contextMenu'
		, handlebars    : '../vendor/handlebars/1.0.0/handlebars'
		, text          : '../vendor/text/2.0.1/text'
		, backbone      : '../vendor/backbone/1.0.0/backbone'
		, underscore    : '../vendor/underscore/1.5.1/underscore'
		, templates     : '../src/app/templates'
		, init			: '../src/app/init'
		, views			: '../src/app/views'
		, collections	: '../src/app/collections'
		, models		: '../src/app/models'
	}
	, shim: {
		'handlebars' : {
			exports: 'Handlebars'
		},
        'underscore' : { 
			exports: '_'
		},
		'backbone' : {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		'jQuery' : { 
			exports: '$'
		},
        'slimscroll' : { 
			deps: ['jquery'],
            exports: 'slimScroll'
		},
        'multipleselect' : { 
			deps: ['jquery'],
            exports: 'multipleSelect' 
		},
        'contextMenu' : {
			deps: ['jquery'],
            exports: 'contextMenu' 
		},
        'jstree' : {
			deps: ['jquery'],
            exports: 'jstree'
		},
        'layout' : { 
			deps: ['jquery'],
			exports: 'layout' 
		},
        'TableTools' : { 
			deps: ['jquery', 'dataTables'] 
		}
	}
});

define(function(require){
	require('init');
});