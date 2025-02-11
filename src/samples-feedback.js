$("#next-1").css("opacity", "0");
$("#next-2").css("opacity", "0");

$(':radio[name="RatePartner"]').change(function() {
	
	RatePartner = $('input[name="RatePartner"]:checked').val();
	
	if(RatePartner){
		$("#RatePartner .star-solid").css("display", "none");
		$(this).parent().find(".star-wrapper").find(".star-solid").css("display", "inline-block");
		$("#next-1").css("opacity", "1");
	}
	
});
	
$(':radio[name="RateBelgotex"]').change(function() {
	
	RateBelgotex = $('input[name="RateBelgotex"]:checked').val();
	
	if(RateBelgotex){
		$("#RateBelgotex .star-solid").css("display", "none");
		$(this).parent().find(".star-wrapper").find(".star-solid").css("display", "inline-block");
		$("#next-2").css("opacity", "1");
	}
			
});