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
	});