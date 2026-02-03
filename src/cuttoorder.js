var texturedURL = ['chevron', 'cubed', 'mesh', 'relic', 'scales', 'swirl', 'tulle'];
var thePrice = $('#cto-price').text();
var overlocking = 35;
var fabricTrim = 155; // for Timbavati
var addDiscount = false;

var markUp = 1.8;
for (var i = 0; i < texturedURL.length; i++) {
    if (window.location.href.indexOf(texturedURL[i]) > -1) {
        markUp = 2;
        break;
    }
}

var chooseSize;
var theRange;
var varWidth;
var varLength;

var activeColour;
var productName;

$(':input#chooseSize').prop('selectedIndex',2); // default to 160 x 240

$('#theWidth').text('160');
$('#theLength').text('240');
$('#inputWidth').val(160);
$('#inputLength').val(240);

$(function () {

	$(':input#chooseSize').change(function () {
		chooseSize = $(this).val();
		if (chooseSize == '80 x 300 cm') {
			$('#inputWidth').val(80);
			$('#inputLength').val(300);
			varWidth = 80;
			varLength = 300;
		} else if (chooseSize == '160 x 240 cm') {
			$('#inputWidth').val(160);
			$('#inputLength').val(240);
			varWidth = 160;
			varLength = 240;
		} else if (chooseSize == '200 x 300 cm') {
			$('#inputWidth').val(200);
			$('#inputLength').val(300);
			varWidth = 200;
			varLength = 300;
		} else if (chooseSize == '240 x 340 cm') {
			$('#inputWidth').val(240);
			$('#inputLength').val(340);
			varWidth = 240;
			varLength = 340;
		} else if (chooseSize == '300 x 400 cm') {
			$('#inputWidth').val(300);
			$('#inputLength').val(400);
			varWidth = 300;
			varLength = 400;
		}

		$('#theWidth').text(varWidth);
		$('#theLength').text(varLength);

		calculatePrice();
	});

	$("#inputSwatchWrapper .w-dyn-item").addClass("hide");

	theRange = $('#inputRange').val();
	varWidth = $('#inputWidth').val();
	varLength = $('#inputLength').val();

	// Timbavati
	if (theRange === 'Timbavati') {
		$('#cto-note').html("Delivered to your door with a 60mm fabric trim edge.<br>No installation required.");
	}
	
	// Sensology Lush - cannot be overlocked, so remove overlocked edge text
	if (theRange === 'Sensology Lush') {
		$('#cto-note').html("Delivered to your door.<br>No installation required.");
	}

	$("select#inputColour").change(function () {

		activeColour = 		$(this).children("option:selected").text();
		activeColourName = 	$(this).children("option:selected").text();

		$("#theColour").text(activeColourName);

		activeColourClean = activeColour.toLowerCase().replace(/\s/g, '-');

		$(".inputswatch").parent().addClass('hide');
		$(".inputswatch[src*='" + activeColourClean + "']").parent().removeClass('hide');

		productName = theRange + " " + activeColour;

		$("#productName").text(productName);

	});

	function slideActiveColour() {

		activeColour = $(".room-render-hero .w-slide:not([aria-hidden]) .colour-name").text();

		$("#inputColour option").filter(function () {
			return $(this).text() == activeColour;
		}).prop('selected', true);

		$("#theColour").text(activeColour);

		activeColourClean = activeColour.toLowerCase().replace(/\s/g, '-');

		$(".inputswatch").parent().addClass('hide');
		$(".inputswatch[src*='" + activeColourClean + "']").parent().removeClass('hide');

		productName = theRange + " " + activeColour;

		$("#productName").text(productName);
	}

	$(".w-slider").click(function () {
		slideActiveColour();
	});

	function calculatePrice() {

		var mWidth = varWidth / 100;
		var mLength = varLength / 100;

		var shortSide = mWidth;
		var longSide = mLength;

		if (shortSide > longSide) {
			shortSide = mLength;
			longSide = mWidth;
		}

		if (shortSide <= 2 && longSide <= 2) {
			mWidth = longSide;
			mLength = shortSide;
		} else if (shortSide > 2 && shortSide <= 4 && longSide > 2 && longSide <= 4) {
			mWidth = longSide;
			mLength = shortSide;
		} else if (longSide >= 3.5 && longSide <= 4) {
			mWidth = longSide;
			mLength = shortSide;
		} else {
			mWidth = shortSide;
			mLength = longSide;
		};

        // Textured exception

        for (var i = 0; i < texturedURL.length; i++) {
            if (window.location.href.indexOf(texturedURL[i]) > -1) {
                mWidth = shortSide;
                mLength = longSide;
				
                break;
            }
        }

		if (mWidth <= 2) {
			var required_width = 2;
		} else {
			var required_width = 4;
		};

		required_length = mLength + 0.2;

		var area_m2 = mWidth * required_length;
		var required_area = required_width * required_length;

        // New Shipping

        if (shortSide <= 1.2) {
            shippingCost = 326.09;
        } else if (shortSide <= 1.6) {  
            shippingCost = 434.78;
        } else if (shortSide <= 2) {
            shippingCost = 543.48;
        } else if (shortSide <= 3) {
            shippingCost = 652.17;
        } else {
            shippingCost = 817.39;
        }

		var cutCost = required_area * thePrice;
		var carpetCost = area_m2 * thePrice * markUp;
		let perimeterLength = (shortSide * 2) + (longSide * 2);
		let edgingCost = theRange === 'Timbavati' ? perimeterLength * fabricTrim : perimeterLength * overlocking;
		var handelingCost = 300;

		var total = cutCost + carpetCost + edgingCost + handelingCost + shippingCost;
		var vatTotal = total * 1.15;

		// Calculate final price

		var vatRound = Math.ceil(vatTotal);
		var vatComma = vatRound.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		$("#purchasePrice").text(vatComma);
	}

	$(':input[type="number"]').change(function () {

		$(':input#chooseSize').prop('selectedIndex',0);

		varWidth = $('#inputWidth').val();
		varLength = $('#inputLength').val();

		if (varWidth > 400) {
			$('#inputWidth').val(400);
			varWidth = 400;
			alert("Width must be between 80cm and 400cm");
		};
		if (varLength > 1000) {
			$('#inputLength').val(1000);
			varLength = 1000;
			alert("Length must be between 100cm and 1000cm");
		};
		if (varWidth < 80) {
			$('#inputWidth').val(80);
			varWidth = 80;
			alert("Width must be between 80cm and 400cm");
		};
		if (varLength < 100) {
			$('#inputLength').val(100);
			varLength = 100;
			alert("Length must be between 100cm and 1000cm");
		};

		$('#theWidth').text(varWidth);
		$('#theLength').text(varLength);

		calculatePrice();
	});

	window.addEventListener('load', function () {
		slideActiveColour();
	});

	calculatePrice();
});

// set colour to default esp for textured collection
setTimeout(function () {
	$("select#inputColour").change();
}, 2000);