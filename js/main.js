var ismobile=navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
//Snowfall
if(!ismobile && config.enableSnowfall){
	$.getScript("js/vendor/jquery.snow.min.js", function(){
		$.fn.snow({ minSize: 5, maxSize: 50, newOn: 600, flakeColor: '#ffffff' });
	});
}

$(document).ready(function(){

		var headroomactive=false;

		//Decide if headroom needs to be enabled or not
		var enableHeadroom = (config.enableHeadroomDesktop && config.enableHeadroomMobile) || (config.enableHeadroomMobile && ismobile)  || (config.enableHeadroomDesktop && !ismobile);

		//Enable Headroom
		if(enableHeadroom){
			$.getScript("js/vendor/headroom.min.js", function(){
				$.getScript("js/vendor/jQuery.headroom.js", function(){
					$(".navbar-fixed-top").headroom({
						"tolerance": 5,
						"offset": 205,
						"classes": {
						"initial": "animated",
						"pinned": "swingInX",
						"unpinned": "swingOutX"
						}
						});
						headroomactive=true;
					});
			});
		}
		
		
		//Add click event for nav bar items
	    $('.navbar-collapse').bind('click', 'ul li a', function(event) {
	    	event.preventDefault();
	 		//When the collape is open, the class 'in' is set 
	    	if($(this).hasClass('in')){
	    		//Hide collapse when item selected
	    	    $(".navbar-collapse").collapse('hide');
	    	}

	    	//When headroom active
	    	if(headroomactive){
	    		var top = $(document).scrollTop();
	    		var newTop = $(event.target.hash).offset().top;
	    		console.log(top);
	    		console.log(newTop);
	    		newTop-=$('.navbar-header').height();
	    		//scrolling down
	    		if(top<newTop && (newTop-top)>1){
	    			console.log('down');
	    			$.scrollTo(event.target.hash, 1000);
		    	}
		    	//scrolling up
		    	else if (top>newTop && (top-newTop)>1){
		    		console.log('up');
		    		$.scrollTo(event.target.hash, 1000, {offset:{left:0,top:(-1*$('.navbar-header').height())}});
		    	}

	    	}
	    	//When headroom non active
	    	else{
	    		$.scrollTo(event.target.hash, 1000, {offset:{left:0,top:(-1*$('.navbar-header').height())}});
	    	}
	        
	    });

	    //Add click event for navbar brand item
	    $('.navbar-brand').bind('click', function(event){
	    	event.preventDefault();
	    	var top = $(document).scrollTop();
	    	if(top!==0){
	    		$.scrollTo(event.target.hash, 1000, {offset:{left:0,top:(-1*$('.navbar-header').height())}});
	    	}
	    });
});


//Window resize event is called many times in some browsers. This is a workaround for calling a function just once, instead of many times.
var fid; 
$(window).resize(function() 
{
    clearTimeout(fid);
    //Refresh scrollspy
    fid = setTimeout(function(){$('[data-spy="scroll"]').each(function () {console.log('refresh');var $spy = $(this).scrollspy('refresh')})}, 500);
});