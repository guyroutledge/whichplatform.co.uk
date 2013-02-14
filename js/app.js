jQuery(function($){

	var app = {
		data: {},
		getData: function(){
			$.ajax({
				url: 'js/data.json',
				data: null,
				success: function(data, textStatus, jqXHR){
					app.data = data;
					app.destinations.buildList();
				},
				dataType: 'json'
			});
		},
		destinations: {
			list: {},
			buildList: function(){
				var data = app.data; // cache shorter variable name
				var platforms = data.platforms;
				var destinationsList = []; // an array that will eventually hold a de-duped list of all destinations
				var tmpArr = []; // a temp array to hold all the destinations
				var tmpObj = {}; // a temp object to produce a de-duped list of destinations
				var destination; // placeholder for building destinationsList
				var i, j, k; // counters

				// Create an array of all the destinations, including
				// duplicates by looping through each platform
				for (i = 0; i < platforms.length; i++) {
					for (j = 0; j < platforms[i].destinations.length; j++) {
						tmpArr.push(platforms[i].destinations[j]);
					}
				}
				// Add each destination from tmpArr as a key to tmpObj
				// as you cannot have more than one property with the
				// same key, the destinations are deduped.
				for (k = 0; k < tmpArr.length; k++) {
					tmpObj[tmpArr[k]] = true;
				}
				// Turn tmpObj back into an array of destinations to
				// pass as local data to jquery.autocomplete
				for ( destination in tmpObj ) {
					destinationsList.push(destination);
				}
				destinationsList.sort();

				app.destinations.list = destinationsList;
				app.destinations.displayDestinations();
				app.autoComplete(destinationsList);
			},
			displayDestinations: function(){
				var list = app.destinations.list;
				for ( var i = 0; i < list.length; i++ ) {
					$('#destinations').append('<li><a href="#">' + list[i] + '</a></li>');
				}
			}
		},
		autoComplete: function(data){
			$('#search-field').autocomplete({
				"data" : data
			});
		},
		init: function(){
			app.getData();
		}
	};
	// Kick things off
	app.init();

});
