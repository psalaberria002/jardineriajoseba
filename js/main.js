$(document).ready(function(){
		var ismobile=navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
		var headroomactive=false;

		//Set headroom for non mobile browsers
		if(!ismobile){
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
	    		//scrolling down
	    		if(top<newTop){
	    			$.scrollTo(event.target.hash, 1000);
		    	}
		    	//scrolling up
		    	else{
		    		$.scrollTo(event.target.hash, 1000, {offset:{left:0,top:(-1*$('.navbar-header').height())+1}});
		    	}
	    	}
	    	//When headroom non active
	    	else{
	    		$.scrollTo(event.target.hash, 1200, {offset:{left:0,top:(-1*$('.navbar-header').height())+1}});
	    	}
	        
	    });

	    //Add click event for navbar brand item
	    $('.navbar-brand').bind('click', function(event){
	    	event.preventDefault();
	    	$.scrollTo(event.target.hash, 1000, {offset:{left:0,top:(-1*$('.navbar-header').height())+1}});
	    });
});


//Window resize event is called many times in some browsers. This is a workaround for calling a function just once, instead of many times.
var fid; 
$(window).resize(function() 
{
    clearTimeout(fid);
    //Refresh scrollspy
    id = setTimeout(function(){$('[data-spy="scroll"]').each(function () {console.log('refresh');var $spy = $(this).scrollspy('refresh')})}, 500);
});