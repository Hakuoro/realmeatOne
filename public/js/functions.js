/* scroll  */
$(function() {
			  $('a[href*=#]:not([href=#])').click(function() {
			    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		
			      var target = $(this.hash);
			      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			      if (target.length) {
			        $('html,body').animate({
			          scrollTop: target.offset().top
			        }, 1000);
			        return false;
			      }
			    }
			  });
});

/* scroll mobile */

jQuery( ".footer_toggle").click(function() {
			  jQuery("#page_menu").fadeToggle();
		});
		jQuery( ".home").click(function() {
			  jQuery("#page_menu").fadeToggle();
		});
		jQuery( ".reviews2").click(function() {
			  jQuery("#page_menu").fadeToggle();
		});
		jQuery( ".getcard2").click(function() {
			  jQuery("#page_menu").fadeToggle();
		});
		jQuery( ".offline-store2").click(function() {
			  jQuery("#page_menu").fadeToggle();
		});
		jQuery( ".online-store2").click(function() {
			  jQuery("#page_menu").fadeToggle();
		});
		jQuery( ".phv2").click(function() {
			  jQuery("#page_menu").fadeToggle();
		});


/* content review scroll */




