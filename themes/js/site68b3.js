// THEME_FOLDER
/**
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
 */
(function() {
  if (!window.console) {
	window.console = {};
  }
  // union of Chrome, FF, IE, and Safari console methods
  var m = [
	"log", "info", "warn", "error", "debug", "trace", "dir", "group",
	"groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
	"dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
  ];
  // define undefined methods as noops to prevent errors
  for (var i = 0; i < m.length; i++) {
	if (!window.console[m[i]]) {
	  window.console[m[i]] = function() {};
	}    
  } 
})();



jQuery('.ilightbox').iLightBox();

svgeezy.init('false', 'png');



jQuery(document).ready(function($) {

	$("#show-more-counties").click(function(){
		$(this).hide();
		$("#more-counties").show();
	})

	if(typeof(region_page) != 'undefined'){

		var scope = angular.element($("#angular-ctrl")).scope();
		scope.$apply(function(){
				scope.grab($.param(base_query));
		});

		$("#query-filters input").change(function(){
			query = base_query;
			delete query.HUDSON_location_type;
			delete query.HUDSON_property_type;
			$("#loading").slideDown();
			$("input").each(function(){
				if($(this).is(":checked")){
					key = $(this).attr("data-type");
					if(key in query){
						query[key].push($(this).val());
					}else{
						query[key] = [$(this).val()];
					}
				}
			});
			if(!("HUDSON_location_type" in query)){
				// console.log("No location type, so including all locations")
				query.HUDSON_location_type = ["rural","urban","coastal"];
			}
			if(!("HUDSON_property_type" in query)){
				// console.log("No location type, so including all locations")
				query.HUDSON_property_type = ["pub","bandb","hotel","dining","Restaurant", "Self-catering"];
			}
			// console.log(query);
			// console.log($.param(query));
			var scope = angular.element($("#angular-ctrl")).scope();
			scope.showcount = 8;
			scope.$apply(function(){
				$("#no-properties-warning").show();
				scope.grab($.param(query));
			});
		});
	}

	counties_backup = $("#county-select").html();

	jq_counties = {};
	$("#county-select option").each(function(){
		if(typeof($(this).attr("data-parent")) != "undefined"){
			key = "region"+$(this).attr("data-parent");
			if(key in jq_counties){
				jq_counties[key].push($(this));
			}else{
				jq_counties[key] = [$(this)];
			}
		}
	});

	function add_counties(parent_region){
		check_region = "region" + parent_region;
		var scope = angular.element($("#angular-ctrl")).scope();
		scope.$apply(function(){
			scope.county = '';
		});
		if(check_region in jq_counties){
			$("#county-select").html("<option value=''>All counties</option>")			
			$.each(jq_counties[check_region], function( index, value ) {
				$("#county-select").append(value);
			});
		}else{
			$("#county-select").html(counties_backup);
		}
		
		$("#county-select").trigger('update');

	}

	$("#region-select").change(function(){
		add_counties($(this).find(":selected").attr('data-id'));
		$("#county-select").trigger('update');
	});

	$(document).on("click", "#load-next", function(){
		base_query.offset = parseInt(base_query.offset)+ 1;
		scope.$apply(function(){
			scope.grab($.param(base_query));
		});
	});


	if(typeof(map_page) != "undefined"){
		
		var map;
		var markers_data = [];
		var map_markers = [];

		if(typeof(map_zoom_level) == 'undefined'){
			map_zoom_level = 10;
		}

		function rad(x) {return x*Math.PI/180;}
		function find_closest_marker( lat, lng ) {
			var R = 6371; // radius of earth in km
			var distances = [];
			var closest = -1;
			console.log("map_markers.length = " + map_markers.length);
			for( i=0;i<map_markers.length; i++ ) {
				var mlat = map_markers[i].position.lat();
				var mlng = map_markers[i].position.lng();
				var dLat  = rad(mlat - lat);
				var dLong = rad(mlng - lng);
				var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
					Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
				var d = R * c;
				distances[i] = d;
				if ( closest == -1 || d < distances[closest] ) {
					closest = i;
				}
			}
			
			google.maps.event.trigger(map_markers[closest], 'click');
		}

		var mapOptions = {
			center: new google.maps.LatLng(map_lat, map_lng),
			zoom: map_zoom_level
		};

		var flag = {
			url: THEME_FOLDER + '/img/map-marker.png',
			size: new google.maps.Size(31, 49),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(1, 48)
		};

		var flag_on = {
			url: THEME_FOLDER + '/img/map-marker-on.png',
			size: new google.maps.Size(31, 49),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(1, 48)
		};

		function initialize() {


			map = new google.maps.Map(document.getElementById("map-canvas"),
				mapOptions);
			


			$.ajax({
				dataType: "json",
				url: JSON_URL,
				success: function(data){
					markers_data = data;
					// console.log("Returned " + markers_data.length + " properties");
					for(i = 0; i < markers_data.length; i ++){
						current_marker = markers_data[i];
						//console.log(current_marker);
						if(current_marker.lat == null){
							console.log("Null latitude: " + current_marker.title);
							geocoder = new google.maps.Geocoder();
							//In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
							geocoder.geocode( { 'address': current_marker.address}, function(results, status) {
								if (status == google.maps.GeocoderStatus.OK) {
									current_marker.lat = results[0].geometry.location.e;
									current_marker.long = results[0].geometry.location.d;
									console.log(current_marker);
								} else {
									console.log("error reading " + current_marker.title);
								}
								console.log("Current property: " + current_marker);
							});
						}

						var marker_latlng = new google.maps.LatLng(current_marker.lat,current_marker.long);
						var marker = new google.maps.Marker({
							position: marker_latlng,
							info: {
								id: current_marker.id,
								title: current_marker.title,
								permalink: current_marker.permalink,
								excerpt: current_marker.excerpt,
								location_type: current_marker.location_type,
								property_type: current_marker.property_type,
								price_rating: current_marker.price,
								walking_rating: current_marker.walking,
								region_select: current_marker.region_select,
								eat: current_marker.eat,
								sleep: current_marker.sleep,
							},
							map: map,
							icon: flag
						});

						map_markers.push(marker);

						google.maps.event.addListener(marker, 'click', function() {

							console.log(this.position)



							for (var i = 0; i < map_markers.length; i++) {
								map_markers[i].setIcon(flag);
							};
							$('#hudson-map-title').html(this.info.title);
							$('#hudson-map-sleeps').text(this.info.sleeps);
							$('#hudson-map-excerpt').html(this.info.excerpt);
							$('#hudson-map-link').attr('href',this.info.permalink);
							
							this.setIcon(flag_on);

							if(this.info.eat == true){
								$('#hudson-map-eats').html("&#10003");
							}else{
								$('#hudson-map-eats').html("&#x2717;");
							}

							if(this.info.sleep == true){
								$('#hudson-map-sleeps').html("&#10003");
							}else{
								$('#hudson-map-sleeps').html("&#x2717;");
							}

							var location = this.info.location_type[0].toLowerCase();
							$("#location-text").text(location);
							location = location.trim();
							
							// var scope = angular.element($("#angular-ctrl")).scope();
							// scope.$apply(function(){
							// 	scope.region = this.info.region_select;
							// });
							
							$('#hudson-map-location img').attr('src', THEME_FOLDER + "/img/category-"+ location + ".svg");

							var property;
							if(this.info.property_type.length > 0 ){
								property = this.info.property_type[0].toLowerCase();
							}else{
								property = "bb";
								console.log("Unset property type on " + current_marker.title)
							}
							
							property = property.trim();
							
							if(property == "selfcatering"){
								$("#property-text").text("Self-catering");
							}else{
								$("#property-text").text(property);
							}
							

							if(property == "b&b"){
								property = "bb";
							}
							$('#hudson-map-property img').attr('src', THEME_FOLDER + "/img/property-"+ property + ".svg");
							
							$('#hudson-map-price').html('');
							price_src = THEME_FOLDER + "/img/price-rating.svg";
							
							for(var i = 0; i < this.info.price_rating; i++){
								$("#hudson-map-price").append("<img src='"+price_src+"' class='price'/> ")
							}
							
							$('#hudson-map-walking').html('');
							walking_src = THEME_FOLDER + "/img/walking-rating.svg";
							
							for(var i = 0; i < this.info.walking_rating; i++){
								$("#hudson-map-walking").append("<img src='"+walking_src+"' class='price'/> ")
							}

							map.panTo(this.position);
						});

						if(current_property_id == marker.info.id){
							google.maps.event.trigger(marker, 'click');
						}
						
					}
					if(typeof(current_property_id) == 'undefined' || current_property_id == false){
						find_closest_marker(map_lat, map_lng);
					}else{
						console.log(current_property_id);
					}
				}
			});

			

		}
		google.maps.event.addDomListener(window, 'load', initialize);

	}

	console.log($('#hudson-map-location').html());
	
	$(".video, article").fitVids();

	var el = $('input[type=text], input[type=email], textarea');
	el.focus(function(e) {
		if (e.target.value == e.target.defaultValue)
			e.target.value = '';
	});
	el.blur(function(e) {
		if (e.target.value == '')
			e.target.value = e.target.defaultValue;
	});

	var pull        = $('#pull');
				menu        = $('nav ul');
				menuHeight  = menu.height();

			$(pull).on('click', function(e) {
				e.preventDefault();
				menu.slideToggle();
			});

			$(window).resize(function(){
				var w = $(window).width();
				if(w > 320 && menu.is(':hidden')) {
					menu.removeAttr('style');
				}
			});

	$('#archives-2 select').attr('id', 'sidebar-select');

	$('#region-select').customSelect();
	$('#county-select').customSelect();
	$('#third-select').customSelect({customClass:'rating-select'});
	$('#sidebar-select').customSelect();
	$('.wpcf7-select').customSelect(); 

	$('.crsl-items').carousel({visible: 3, itemMinWidth: 200, itemMargin: 19 });

	$('.button-row button').click(function(){
		$(this).toggleClass("active");
	});

	$('#property-slider').flexslider({
		controlNav: true,
		controlsContainer: ".featured-property-nav"
	});

	 $('#primary-slider, .flexslider').flexslider();

	 
	 $('ul.sub-menu').hover(function(){
		$('.menu-item-150:not(.current_page_item)').toggleClass('current-menu-item');
	 });

	 $(window).resize(function() { 
		width = $(window).width();
		margin = width < 960 ? ((width - 960) / 2) : 0;
		width = width < 960 ? 960 : width;
		$('#primary-slider img, .attachment-region-page-feature, .single-region img').width(width).css('margin-left', margin);
	});


	var margin = 0, width = $(window).width();
	margin = width < 960 ? ((width - 960) / 2) : 0;
	width = width < 960 ? 960 : width;
	$('#primary-slider img, .attachment-region-page-feature, .single-region img').width(width).css('margin-left', margin);

	$('#social-share').share({
		flyout: 'top right',
		text_font: 'false',
		background: '#ffffff',
		color: '#767b77',
	})

	$("img.price").width("11px");

});

