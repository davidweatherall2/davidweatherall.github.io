

window.onload = function() {
	createCalc();
}

function createCalc() {



	$.get( "/data/firstBlood.json", function( data ) {
		
		calcHolder = $('.js-fbcalc');

		options = "<div class='each'><select class='js-select'>"

		for (var i = 0; i < data.length; i++) {
			option = "<option data-per=" + data[i]['fbPer'] + " data-sample=" + data[i]['sampleSize'] + ">" + data[i]['champName'] + "</option>"
			options += option
		}

		options += "</select><div class='result'></div></div>";

		i = 0;


		structure = "<div class='half'>"

		while(i < 5) {
			structure += options
			i++;
		}

		structure += "</div>"

		structure += "<div class='half'>"

		i = 0;

		while(i < 5) {
			structure += options
			i++;
		}

		structure += "</div>"

		calcHolder.html(structure);


		$('.js-select').change(function() {
			per = $(this).find(':selected').data('per');
			sample = $(this).find(':selected').data('sample');

			text = "FB: " + per + "% - Sample size: " + sample

			$(this).parent().find('.result').html(text);

		});
	});

}