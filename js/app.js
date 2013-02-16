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
				app.destinations.displayDestinations(destinationsList);
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
			displayDestinations: function(list, callback){
				var destinations = '';

				for ( var i = 0; i < list.length; i++ ) {
					destinations += '<li><a href="#' + list[i] + '" class="destination">' + list[i] + '</a>';
					destinations += '<div class="entry-content is-hidden"><ul>';
					destinations += app.destinations.crossReferencePlatforms(list[i]);
					destinations += '</ul></div></li>';
				}

				$('#destinations').empty().append(destinations);
				if ( callback ) {
					callback.call(this);
				}
			},
			togglePlatforms: function(){
				$('#destinations').delegate('a', 'click', function(){
					var $this = $(this);

					if ( $this.is('.is-active') ) {
						$this.next('.entry-content').slideUp().end().removeClass('is-active');
					} else {
						$this.addClass('is-active').next('.entry-content').slideDown();
					}
					return false;
				});
			},
			filterByLetter: function(){
				$('.nav-alphabetical a').on('click', function(){
					// determine whether user is filtering by letter or
					// all and filter the results accordingly

					var list = app.destinations.list;
					var filteredList = [];
					var letter = $(this).data('filter') || $(this).text();

					if ( letter !== -1 ) {
						letter = letter.toUpperCase();
						for ( var i = 0; i < list.length; i++ ) {
							if ( list[i].match('^'+letter) ) {
								filteredList.push(list[i]);
							}
						}
						app.destinations.displayDestinations(filteredList);
					} else {
						app.destinations.displayDestinations(list);
					}
					return false;
				});
			},
			filterAutocomplete: function(item){
				var list = app.destinations.list;
				var filteredList = [];
				for ( var i = 0; i < list.length; i++ ) {
					if ( list[i].match(item) ) {
						filteredList.push(list[i]);
					}
				}
				app.destinations.displayDestinations(filteredList, function(){
					$('.destination').first().trigger('click');
				});
			}
		},
		bindClicks: function(){
				app.destinations.filterByLetter();
				app.destinations.togglePlatforms();
		},
		autoComplete: function(data){
			$('#search-field').focus(function(){
				$(this).parent().addClass('is-focus');
			}).blur(function(){
				if ( $(this).val() === '' ) {
					$(this).parent().removeClass('is-focus');
				}
			}).autocomplete({
				"data" : data,
			onItemSelect: function(item) {
				app.destinations.filterAutocomplete(item.value);
			},
			mustMatch: false,
			maxItemsToShow: 5,
			selectFirst: false,
			autoFill: false,
			selectOnly: true,
			});
		},
		init: function(){
			app.getData();
			app.bindClicks();
		}
	};
	// Kick things off
	app.init();

});
