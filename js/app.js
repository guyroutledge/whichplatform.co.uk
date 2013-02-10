jQuery(function($){

	var app = {
		data: {},
		getData: function(){
			$.ajax({
				url: 'js/data.json',
				data: null,
				success: function(data, textStatus, jqXHR){
					app.data = data;
				},
				dataType: 'json'
			});
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
