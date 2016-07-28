global.$ = require('jquery');
global.jQuery = global.$;
var smoothScroll = require('jquery-smooth-scroll');
var bootstrapjs = require('bootstrap');
require('magnific-popup');
require('./greedy-nav');

$(document).ready(function() {
  
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Cargado imagen #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">La imagen #%curr%</a> no pudo ser cargada.',
      titleSrc: function(item) {
        return item.el.attr('title') + '<small>por Sergio Orozco</small>';
      }
    }
  });

  $('a.page-scroll').smoothScroll({
    beforeScroll: function(options){
      $(".navbar-collapse").removeClass('in');
    },
    afterScroll: function(options) {
      $(this).blur();
    },
    easing: 'swing'
  });

  $(document).on("scroll", function onScroll(event){
    var padding = 90;
    var scrollPos = $(document).scrollTop();
    $('.nav-link').each(function (elem) {
      var currLink = $(this);
      console.log(currLink.attr("href"));
      if(currLink.attr("href").charAt(0) === '#'){
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top - padding <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('.nav-link').removeClass("active");
          currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
      }
    });
  });
});
