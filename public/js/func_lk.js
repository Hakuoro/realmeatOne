
;(function($) {
  'use strict';
  var $body = $('html, body'),
      content = $('#main').smoothState({
        // Runs when a link has been activated
        onStart: {
          duration: 250, // Duration of our animation
          render: function (url, $container) {
            // toggleAnimationClass() is a public method
            // for restarting css animations with a class
            content.toggleAnimationClass('is-exiting');
            // Scroll user to the top
            $body.animate({
              scrollTop: 0
            });
          }
        }
      }).data('smoothState');
      //.data('smoothState') makes public methods available
})(jQuery);

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

