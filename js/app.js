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
				var destination; // placeholder
				var i, j, k; // counters

				// Create an array of all the destinations, including
				// duplicates by looping through each platform
				for (i = 0; i < platforms.length; i++) {
					for (j = 0; j < platforms[i].destinations.length; j++) {
						destination = platforms[i].destinations[j];
						destination = destination.replace(/#/, '');
						tmpArr.push(destination);
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
				destination = '';
				for ( destination in tmpObj ) {
					destinationsList.push(destination);
				}
				destinationsList.sort();

				app.destinations.list = destinationsList;
				app.destinations.displayDestinations();
				app.autoComplete(destinationsList);
			},
			crossReferencePlatforms: function(destination){
				var data = app.data; // local reference
				var platformsList = '';

				// loop through each platform and test if the
				// destination is found in the list of destinations
				// served by this platform. If so, create a string of
				// list items containing the platform number
				$.each(data.platforms, function(i, v) {
					var arr = this.destinations;
					for ( var j = 0; j < arr.length; j++ ) {
						if ( arr[j].search(destination) !== -1 ) {
							platformsList += '<li>Platform ' + (i+1) + '';
							if ( arr[j].match(/#$/) ) {
								platformsList += ' - <em>limited service</em></li>';
							} else {
							platformsList += '</li>';
							}
						}
					}
				});
				return platformsList;
			},
			displayDestinations: function(){
				var list = app.destinations.list;
				var destinations = '';

				for ( var i = 0; i < list.length; i++ ) {
					destinations += '<li><a href="#' + list[i] + '" class="destination">' + list[i] + '</a>';
					destinations += '<div class="entry-content is-hidden"><ul>';
					destinations += app.destinations.crossReferencePlatforms(list[i]);
					destinations += '</ul></div></li>';
				}

				$('#destinations').append(destinations);
				app.destinations.togglePlatforms();
			},
			togglePlatforms: function(){
				$('.destination').on('click', function(){
					var $this = $(this);

					if ( $this.is('.is-active') ) {
						$this.next('.entry-content').slideUp().end().removeClass('is-active');
					} else {
						$this.addClass('is-active').next('.entry-content').slideDown();
					}
					return false;
				});
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
