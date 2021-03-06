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
				app.destinations.disableLetters();
				app.autoComplete(destinationsList);
				// start viewing just destinations beginning with A
				// instead of hammering the user with all the data (and
				// the performance hit of processing it) from the get go
				$('#A').trigger('click');
			},
			crossReferencePlatforms: function(destination){
				var data = app.data; // local reference
				var platformsList = '';
				// escape the brackets found in some destinations so
				// that they will be corrected matched below
				destination= destination.replace(/([\(])+(.*)+([\)])+/, '\\$1$2\\$3');

				// loop through each platform and test if the
				// destination is found in the list of destinations
				// served by this platform. If so, create a string of
				// list items containing the platform number
				$.each(data.platforms, function(i, v) {
					var arr = this.destinations;
					for ( var j = 0; j < arr.length; j++ ) {
						// match the end of the line to avoid "Barnes" matching
						// both "Barnes" and "Barnes Bridge" (for example)
						if ( arr[j].match(destination+'(#)?$') ) {
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
				var i = 0;
				var len = list.length;
				var selector = $('#results-container');

				// start with an empty container
				selector.empty();

				if ( len > 10 ) $('<div class="overlay"></div>').appendTo('body').fadeIn(250);

				(function addNext(){
					if ( i < len ) {
						selector.append(
							'<li><a href="#' + list[i] + '" class="destination">' + list[i] + '</a>' +
							'<div class="entry-content is-hidden"><ul>' +
							app.destinations.crossReferencePlatforms(list[i]) +
							'</ul></div></li>'
						);
						i++;
						setTimeout(addNext, 5);
					} else {
						$('.overlay').fadeOut(500).remove();
					}
				})();

				if ( callback && typeof(callback) === 'function' ) {
					callback.call(this);
				}
			},
			toggleContent: function(){
				$('#results-container').delegate('a', 'click', function(){
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
					var list = app.destinations.list;
					var filteredList = [];
					var letter = $(this).data('filter') || $(this).text();

					if ( $(this).attr('disabled') ) {
						return false;
					} else {
						$('#search-field').val('');
						$('.nav-alphabetical a').removeClass('is-active');
						$(this).addClass('is-active');

						// determine whether user is filtering by letter or
						// all and filter the results accordingly
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
					}
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
			},
			disableLetters: function(){
				var list = app.destinations.list;
				var alphabet = {
					'A' : false,
					'B' : false,
					'C' : false,
					'D' : false,
					'E' : false,
					'F' : false,
					'G' : false,
					'H' : false,
					'I' : false,
					'J' : false,
					'K' : false,
					'L' : false,
					'M' : false,
					'N' : false,
					'O' : false,
					'P' : false,
					'Q' : false,
					'R' : false,
					'S' : false,
					'T' : false,
					'U' : false,
					'V' : false,
					'W' : false,
					'X' : false,
					'Y' : false,
					'Z' : false
				};
				for ( var letter in alphabet ) {
					for ( var i = 0; i < list.length; i++ ) {
						if ( list[i].match('^'+letter) ) {
							alphabet[''+letter+''] = true;
							break;
						}
					}
				}
				for ( var letter in alphabet ) {
					if ( alphabet[letter] == false ) {
						$('#'+letter+'').attr('disabled', 'disabled');
					}
				}
				app.destinations.filterByLetter();
			}
		},
		platforms: {
			listDestinations: function(platformNumber){
				var list = app.data.platforms[platformNumber].destinations; // local reference
				var destinationsList = '';

				if ( list.length === 0 ) {
					destinationsList += '<li>No destinations from this platform</li>'
				}

				for ( var i = 0; i < list.length; i++ ) {
					destinationsList += '<li>' + list[i].replace(/#$/, '') + '';
					if ( list[i].match(/#$/) ) {
						destinationsList += ' - <em>limited&nbsp;service</em></li>';
					} else {
						destinationsList += '</li>';
					}
				}

				return destinationsList;
			},
			displayPlatforms: function(){
				var i = 0;
				var list = app.data.platforms;
				var len = list.length;
				var selector = $('#results-container');

				// start with an empty container
				selector.empty();

				$('<div class="overlay"></div>').appendTo('body').fadeIn(250);

				(function addNext(){
					if ( i < len ) {
						selector.append(
							'<li><a href="#platform' + (i+1) + '" class="platform">Platform ' + (i+1) + '</a>' +
							'<div class="entry-content is-hidden"><ul>' +
							app.platforms.listDestinations(i) +
							'</ul></div></li>'
						);
						i++;
						setTimeout(addNext, 5);
					} else {
						$('.overlay').fadeOut(500).remove();
					}
				})();

			},
		},
		switchView: function(){
			$('.nav-search a').on('click', function(){
				var clicked = $(this);

				if ( clicked.is('.is-active') ) {
					return false;
				}
				$('.nav-search a').removeClass('is-active');
				clicked.addClass('is-active');
				if ( clicked.is('.destinations') ) {
					// trigger click on whatever the user was previously
					// viewing in "destinations" view
					if ( $('.nav-alphabetical .is-active').length ) {
						$('.nav-alphabetical .is-active').trigger('click');
					} else {
						$('.nav-alphabetical #A').trigger('click');
					}
					$('.nav-alphabetical, .search-form').slideDown();
				} else if ( clicked.is('.platforms') ) {
					$('.nav-alphabetical, .search-form').slideUp();
					app.platforms.displayPlatforms();
				}
				return false;
			});
		},
		toggleAbout: function(){
			$('.nav-menu').on('click', function(){
				$('.about').toggleClass('is-open');
				if ( $('.about').is('.is-open') ) {
					$('#nav-menu-text').text('close');
				} else {
					$('#nav-menu-text').text('about');
				}
				return false;
			});
		},
		bindClicks: function(){
			app.destinations.toggleContent();
			app.toggleAbout();
			app.switchView();
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
				$('.nav-alphabetical a').removeClass('is-active');
				app.destinations.filterAutocomplete(item.value);
			},
			preventDefaultReturn: 2,
			mustMatch: true,
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
