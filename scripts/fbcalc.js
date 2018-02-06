window.onload = function() {
	createCalc();
}

function createCalc() {

	$.get( "/data/firstBlood.json", function( data ) {
		calcHolder = $('.js-fbcalc');
		calcHolder.html(data);
	});

}