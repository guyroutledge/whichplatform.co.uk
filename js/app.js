jQuery(function($){
	
	$('#search-field').autocomplete({
        "data" : [
            ['apple', 1],
            ['apricot', 2],
            ['pear', 3],
            ['prume', 4],
            ['Doyenné du Comice', 5]
        ]
    });

});