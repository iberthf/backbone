var doScriptFlag = true;
var deviceoutlookLayout = null;
var doContentLayout = null;
var contentTabs = null;
var mainContainerTabs = null;

var row = null;
var dataRow = null;

define(function(require){
	var $					= require('jquery')
		, jqueryui			= require('jqueryui')
		, layout			= require('layout')
		, jstree			= require('jstree')
		, dataTables		= require('dataTables')
		, ZeroClipboard		= require('ZeroClipboard')
		, TableTools		= require('TableTools')
		, slimscroll		= require('slimscroll')
		, multipleselect	= require('multipleselect')
		, contextMenu		= require('contextMenu')
		, Handlebars		= require('handlebars')
		, headerTpl			= require('text!templates/header.tpl')
		, tabMenuContentTpl	= require('text!templates/tabMenuContent.tpl')
		, tabMenuItemTpl	= require('text!templates/tabMenuItem.tpl')
		, doContentTpl		= require('text!templates/deviceoutlookContent.tpl')
		, footerTpl			= require('text!templates/footer.tpl');
	
	(function($) {
		var compiled = {};
		$.fn.handlebars = function(template, data) {
			if (template instanceof jQuery) {
				template = $(template).html();
			}

			compiled[template] = Handlebars.compile(template);
			this.html(compiled[template](data));
		};
	})(jQuery);
	
	var a = {};
	
	var data = {
		items: [
			  { "url": "dashboard_container", "name": "Dashboard" }
			, { "url": "deviceoutlook_container", "name": "Device Management" }
			, { "url": "accountmanagement_container", "name": "Account Management" }
		]
	};
	
	var logo = {
		logo: { 
			  "name": "calamp"
			, "src": "src/css/img/do_logo.png" 
		}
	};
	
	$('#header_container').handlebars(headerTpl, logo);
	
	$('#tabMenu').handlebars(tabMenuItemTpl, data);
//	$('#tabContent').handlebars(tabMenuContentTpl, data);
	
	$('#deviceoutlook_container').handlebars(doContentTpl, a);
	
	var footerData = {
		  "build-date": "2013"
		, "version": "1.0"
		, options: [
			  { "class": "dash_link", "href": "javascript:;", "name": "Dashboard", "separator": "<span>|</span>" }
			, { "class": "sched_link", "href": "javascript:;", "name": "Scheduled Actions", "separator": "<span>|</span>" }
			, { "class": "notif_link", "href": "javascript:;", "name": "Notifications", "separator": "<span>|</span>" }
			, { "class": "acc_link", "href": "javascript:;", "name": "My Account", "separator": "<span>|</span>" }
			, { "class": "privacy_link", "href": "javascript:;", "name": "Privacy", "separator": "<span>|</span>" }
			, { "class": "tandc_link", "href": "javascript:;", "name": "Terms and Conditions" }
		]
		, support: { "href": "javascript:;", "name": "NeedSupport ?" }
	};
	
	$('#footer_wrap').handlebars(footerTpl, footerData);
	
	mainContainerTabs = $( "#main_container" ).tabs({
		active: 0
		, heightStyle: "fill"
		, activate: function( event, ui ) {
			//todo: we need to add specific script for every main tab
			if(doScriptFlag) {
				doScriptFlag = false;
				initDeviceOutlookScript();
			}
		}
	});

	// implementing close button action
	mainContainerTabs.delegate( "span.ui-icon-close", "click", function() {
		var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
		$( "#" + panelId ).remove();
		$("#content_tabs").tabs( "refresh" );
		$("#content_tabs").tabs( "option", "active", ($('#content_tabs >ul >li').size()-1) );
	});
	
});

function initDeviceOutlookScript(){
	//Setup layouts and tabs
	deviceoutlookLayout = $('#deviceoutlook_container').layout({
		west__paneSelector  : "#deviceoutlook_sidebar"
		, center__paneSelector: "#deviceoutlook_content"
		, applyDefaultStyles  : true
	});

	contentTabs = $("#content_tabs").tabs({ active: 0
		, heightStyle: "fill"
	});

	doContentLayout = $('#devices_content').layout({
		center__paneSelector: "#content"
		, south__paneSelector : "#map"
		, applyDefaultStyles  : true
		, south__size: 200
	});

	do_tree();
	do_toolbar();
	do_datatable();
	do_scrollbars();
	do_contextMenu();
}

function do_toolbar(){
	$('#scroll_content').append('<div id="content_toolbar">'
			+    '<button id="toogleSidebar">Accounts</button>'
			+    '<button id="toogleMap">Map</button>'
			+    '<button id="menuAction" class="menu_action">Action</button>'
			+'</div>');

	$('#toogleSidebar').bind('click', function(){
		deviceoutlookLayout.toggle('west');
	});

	$('#toogleMap').bind('click', function(){
		doContentLayout.toggle('south');
	});
}

function do_scrollbars(){
	$('#scroll_content').slimScroll({
		height: '100%'
	});
}

function addTab(tabName, tabId, tabContent) {
	if($("#"+tabId).length === 0) {
		var li = "<li><a href='#"+tabId+"'>"+tabName+"</a><span style='float: right;' class='ui-icon ui-icon-close' role='presentation'>"+tabName+"</span></li>";
		contentTabs.find(".ui-tabs-nav").append(li);
		contentTabs.append("<div id='" + tabId + "'><p>" + tabContent + "</p></div>");
		contentTabs.tabs("refresh");
		$('#content_tabs a[href="#'+tabId+'"]').click();
	} else {
		$('#content_tabs a[href="#'+tabId+'"]').click();
	}
}

function do_tree(){
	var ExampleData = {};

	ExampleData.example_data
			= [ { "data" : "TopLevel Account 1"
		, "children" : [ [ { "data" : "SubLevel Account 1.1"
			, "children" : [ "data 1.1.1", "data 1.1.2" ]
		}
			, { "data" : "SubLevel Account 1.2"
				, "children" : [ "data 1.2.1", "data 1.2.2" ]
			}
		]
			, [ { "data" : "SubLevel Account 2.1"
				, "children" : [ "data 2.1.1", "data 2.1.2" ]
			}
				, { "data" : "SubLevel Account 2.2"
					, "children" : [ "data 2.2.1", "data 2.2.2" ]
				}
			]
		]
	}
		, { "data" : "TopLevel Account 2"
			, "children" : [ [ { "data" : "SubLevel Account 1.1"
				, "children" : [ "data 1.1.1", "data 1.1.2" ]
			}
				, { "data" : "SubLevel Account 1.2"
					, "children" : [ "data 1.2.1", "data 1.2.2" ]
				}
			]
				, [ { "data" : "SubLevel Account 2.1"
					, "children" : [ "data 2.1.1", "data 2.1.2" ]
				}
					, { "data" : "SubLevel Account 2.2"
						, "children" : [ "data 2.2.1", "data 2.2.2" ]
					}
				]
			]
		}
		, { "data" : "TopLevel Account 3"
			, "children" : [ [ { "data" : "SubLevel Account 1.1"
				, "children" : [ "data 1.1.1", "data 1.1.2" ]
			}
				, { "data" : "SubLevel Account 1.2"
					, "children" : [ "data 1.2.1", "data 1.2.2" ]
				}
			]
				, [ { "data" : "SubLevel Account 2.1"
					, "children" : [ "data 2.1.1", "data 2.1.2" ]
				}
					, { "data" : "SubLevel Account 2.2"
						, "children" : [ "data 2.2.1", "data 2.2.2" ]
					}
				]
			]
		}
	];

	var searchPanelTree
			= '<div id="searchPanelTree">'
			+       '<input id="inputTreeSearchText" type="text"/>'
			+       '<button id="searchButton">Search</button>'
			+ '</div>';
	$('#deviceoutlook_sidebar').append(searchPanelTree,'<div id="tree1"></div>');

	$("#tree1").jstree({ "plugins" : ["themes", "json_data", "ui", "search"]
		, "core" : {}
		, "json_data": {"data": ExampleData.example_data}
		, "themes" : { "theme" : "default"
			, "dots" : true
			, "icons" : true
			, "url": "src/css/jstree.css"
		}
		, "search" : { "case_insensitive" : true}
	});

	$('#searchButton').bind('click', function(){
		var searchInput = $('#inputTreeSearchText').val();
		$("#tree1").jstree("search", searchInput);
	});
}

function do_datatable(){
	//Add support for Multiple Filter fields
	$.fn.dataTableExt.afnFiltering.push(
			function( oSettings, aData, iDataIndex ) {
				var i=0;

				// retrieve values from the page (input and select options)
				var input = $('#search_input').val();
				var items = new Array();

				$(".table_columns option:selected").each(function () {
					items[i++] = $(this).val();
				});

				/*
				 * doesItHave is a function that verify if value is part of lData[iCols[i]]
				 * */
				var doesItHave = function(value, iCols, lData){
					var result = false;

					for(var j=0; j<iCols.length; j++){
						var str = lData[iCols[j]] + "";
						if (str.toUpperCase().indexOf(value.toUpperCase()) != -1){
							result = true;
							break;
						}
					}

					return result;
				};

				//logic for matching item columns
				if (input === "" || input === undefined){
					return true;
				} else if(items.length === 0){
					return false;
				} else if(doesItHave(input, items, aData)){
					return true;
				}

				return false;
			}
	);

	var aDataSet = [
		['1','Trident','Internet Explorer 4.0','Win 95+','4','X'],
		['2','Trident','Internet Explorer 5.0','Win 95+','5','C'],
		['3','Trident','Internet Explorer 5.5','Win 95+','5.5','A'],
		['4','Trident','Internet Explorer 6','Win 98+','6','A'],
		['5','Trident','Internet Explorer 7','Win XP SP2+','7','A'],
		['6','Trident','AOL browser (AOL desktop)','Win XP','6','A'],
		['7','Gecko','Firefox 1.0','Win 98+ / OSX.2+','1.7','A'],
		['8','Gecko','Firefox 1.5','Win 98+ / OSX.2+','1.8','A'],
		['9','Gecko','Firefox 2.0','Win 98+ / OSX.2+','1.8','A'],
		['10','Gecko','Firefox 3.0','Win 2k+ / OSX.3+','1.9','A'],
		['11','Gecko','Camino 1.0','OSX.2+','1.8','A'],
		['12','Gecko','Camino 1.5','OSX.3+','1.8','A'],
		['13','Gecko','Netscape 7.2','Win 95+ / Mac OS 8.6-9.2','1.7','A'],
		['14','Gecko','Netscape Browser 8','Win 98SE+','1.7','A'],
		['15','Gecko','Netscape Navigator 9','Win 98+ / OSX.2+','1.8','A'],
		['16','Gecko','Mozilla 1.0','Win 95+ / OSX.1+',1,'A'],
		['17','Gecko','Mozilla 1.1','Win 95+ / OSX.1+',1.1,'A'],
		['18','Gecko','Mozilla 1.2','Win 95+ / OSX.1+',1.2,'A'],
		['19','Gecko','Mozilla 1.3','Win 95+ / OSX.1+',1.3,'A'],
		['20','Gecko','Mozilla 1.4','Win 95+ / OSX.1+',1.4,'A'],
		['21','Gecko','Mozilla 1.5','Win 95+ / OSX.1+',1.5,'A'],
		['22','Gecko','Mozilla 1.6','Win 95+ / OSX.1+',1.6,'A'],
		['23','Gecko','Mozilla 1.7','Win 98+ / OSX.1+',1.7,'A'],
		['24','Gecko','Mozilla 1.8','Win 98+ / OSX.1+',1.8,'A'],
		['25','Gecko','Seamonkey 1.1','Win 98+ / OSX.2+','1.8','A'],
		['26','Gecko','Epiphany 2.20','Gnome','1.8','A'],
		['27','Webkit','Safari 1.2','OSX.3','125.5','A'],
		['28','Webkit','Safari 1.3','OSX.3','312.8','A'],
		['29','Webkit','Safari 2.0','OSX.4+','419.3','A'],
		['30','Webkit','Safari 3.0','OSX.4+','522.1','A'],
		['31','Webkit','OmniWeb 5.5','OSX.4+','420','A'],
		['32','Webkit','iPod Touch / iPhone','iPod','420.1','A'],
		['33','Webkit','S60','S60','413','A'],
		['34','Presto','Opera 7.0','Win 95+ / OSX.1+','-','A'],
		['35','Presto','Opera 7.5','Win 95+ / OSX.2+','-','A'],
		['36','Presto','Opera 8.0','Win 95+ / OSX.2+','-','A'],
		['37','Presto','Opera 8.5','Win 95+ / OSX.2+','-','A'],
		['38','Presto','Opera 9.0','Win 95+ / OSX.3+','-','A'],
		['39','Presto','Opera 9.2','Win 88+ / OSX.3+','-','A'],
		['40','Presto','Opera 9.5','Win 88+ / OSX.3+','-','A'],
		['41','Presto','Opera for Wii','Wii','-','A'],
		['42','Presto','Nokia N800','N800','-','A'],
		['43','Presto','Nintendo DS browser','Nintendo DS','8.5','C/A<sup>1</sup>'],
		['44','KHTML','Konqureror 3.1','KDE 3.1','3.1','C'],
		['45','KHTML','Konqureror 3.3','KDE 3.3','3.3','A'],
		['46','KHTML','Konqureror 3.5','KDE 3.5','3.5','A'],
		['47','Tasman','Internet Explorer 4.5','Mac OS 8-9','-','X'],
		['48','Tasman','Internet Explorer 5.1','Mac OS 7.6-9','1','C'],
		['49','Tasman','Internet Explorer 5.2','Mac OS 8-X','1','C'],
		['50','Misc','NetFront 3.1','Embedded devices','-','C'],
		['51','Misc','NetFront 3.4','Embedded devices','-','A'],
		['52','Misc','Dillo 0.8','Embedded devices','-','X'],
		['53','Misc','Links','Text only','-','X'],
		['54','Misc','Lynx','Text only','-','X'],
		['55','Misc','IE Mobile','Windows Mobile 6','-','C'],
		['56','Misc','PSP browser','PSP','-','C'],
		['57','Other browsers','All others','-','-','U']
	];

	$('#scroll_content').append('<div id="divTable"></div>');
	$('#divTable').append('<table cellpadding="0" cellspacing="0" border="0" class="display" id="eDataTable"></table>');
	oTable = $('#eDataTable').dataTable({ "sDom": '<"tools"lT> rtip'
		, "oTableTools": { "sRowSelect": "multi"
			, "aButtons": [  ]
		}
		, "aaData": aDataSet
		, "aoColumns": [ { "sTitle": "Id", "bVisible": false }
			, { "sTitle": "Engine" }
			, { "sTitle": "Browser" }
			, { "sTitle": "Platform" }
			, { "sTitle": "Version", "sClass": "center" }
			, { "sTitle": "Grade", "sClass": "center" }
		]
	});

	//Add search panel
	var search_panel = '<div id="search_panel">'
			+       '<input id="search_input" type="text" value=""/>'
			+       '<select class="table_columns" multiple="multiple" style="width:350px;" data-placeholder="Select Your Options">'
			+             '<option value="1">Engine</option>'
			+             '<option value="2" selected>Browser</option>'
			+             '<option value="3">Platform</option>'
			+             '<option value="4">Version</option>'
			+             '<option value="5">Grade</option>'
			+       '</select>'
			+ '</div>';
	$('#content_toolbar').append(search_panel);
	$('#search_input').keyup(function(){
		oTable.fnDraw();
	});

	$(".table_columns").multipleSelect({iconized: true, width: 200});

	//add highlight to datatable
	oTable.$('td').hover(
			function() {
				$(oTable.$('tr')).addClass('highlighted');
			} , function() {
				oTable.$('td.highlighted').removeClass('highlighted');
			}
	);

	//add right click to datatable
	oTable.$('tr').hover(function() {
		row = this;
		dataRow = oTable.fnGetData( this );
		$(oTable.$('tr')).addClass('right_click');
	});

	//add double click to datatable
	oTable.on("dblclick", "tr", function() {
		var iPos = oTable.fnGetPosition( this );
		var aData = oTable.fnGetData( iPos );
		addTab('Details-'+aData[1], aData[1]+aData[0] ,'aData='+aData);
	});
}

function do_contextMenu(){
	$.contextMenu({
		selector: '.right_click'
		, items: {
			"details": {
				name: "Show details" 
				, callback: function(key, options) {
					var oTable = TableTools.fnGetInstance( 'eDataTable' );
					var selectedData = oTable.fnGetSelectedData();

					if(selectedData.length !== 0) {
						jQuery.each( selectedData, function( key, value ) {
							addTab('Details-'+value[1], value[1]+value[0] ,'aData='+value);
						});
					} else {
						addTab('Details-'+dataRow[1], dataRow[1]+dataRow[0] ,'aData='+dataRow);
					}
				}
			}
			, "history": {name: "Show history"}
			, "sep1": "---------"
			, "select": {
				name: "Select"
				, callback: function(key, options) {
					var oTable = TableTools.fnGetInstance( 'eDataTable' );
					if (!oTable.fnIsSelected(row)) {
						row.click();
					}
				}
			}
			, "unselect": {
				name: "Unselect"
				, callback: function(key, options) {
					var oTable = TableTools.fnGetInstance( 'eDataTable' );
					if (oTable.fnIsSelected(row)) {
						row.click();
					}
				}
			}
			,	 "sep2": "---------"
			, "configure": {name: "Configure"}
			, "sep3": "---------"
			, "sendsms": {name: "Send SMS"}
			, "sendcommand": {name: "Send Command"}
		}
	});

	$('#menuAction').on('click', function(e) {
		e.preventDefault();
		$('.menu_action').contextMenu();
	});

	var menuAction = $.contextMenu({
		selector: '.menu_action'
		, trigger: 'none'
		, callback: function(key, options) {
			var m = "clicked: " + key;
			window.console && console.log(m) || alert(m); 
		}
		, items: {
			"details": {
				name: "Show details" 
//							, icon: "edit"
				, callback: function(key, options) {
					var oTable = TableTools.fnGetInstance( 'eDataTable' );
					var selectedData = oTable.fnGetSelectedData();

					if(selectedData.length !== 0) {
						jQuery.each( selectedData, function( key, value ) {
							addTab('Details-'+value[1], value[1]+value[0] ,'aData='+value);
						});
					}
				}
			}
			, "history": {name: "Show history"}
			, "sep1": "---------"
			, "select": {
				name: "Select all"
				, callback: function(key, options) {
					var oTable = TableTools.fnGetInstance( 'eDataTable' );
					oTable.fnSelectAll(true);
				}
			}
			, "unselect": {
				name: "Unselect all"
				, callback: function(key, options) {
					var oTable = TableTools.fnGetInstance( 'eDataTable' );
					oTable.fnSelectNone(true);
				}
			}
			, "export": {name: "Export"}
			, "sep2": "---------"
			, "configure": {name: "Configure"}
			, "sep3": "---------"
			, "sendsms": {name: "Send SMS"}
			, "sendcommand": {name: "Send command"}
			, "sep4": "---------"
			, "sdownload": {name: "Schedule download"}
			, "downloadstatus": {name: "Check download status"}
		}
		, determinePosition: function($menu) {
			$menu.css('display', 'block').position({
				my: "left top",
				at: "left bottom",
				of: this,
				offset: "0 5",
				collision: "fit"
			}).css('display', 'none');
		}
	});
}


//var AppView = BaseView.extend({
//	render : function() {
//		this.html("HELLO WORLD!!!");
//		$('#main_container').html('HELLO WORLD!');
//		return this;
//	}
//});