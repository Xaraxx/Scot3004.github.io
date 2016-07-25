global.$ = require('jquery');
global.jQuery = global.$;
var smoothScroll = require('jquery-smooth-scroll');
var bootstrapjs = require('bootstrap');
require('magnific-popup');
$(document).ready(function() {
  function checktop(){
    var navbar_main = $(".navbar-main");
    if(navbar_main.length){
      if (navbar_main.offset().top > 50) {
          $(".navbar-fixed-top").addClass("top-nav-collapse");
      } else {
          $(".navbar-fixed-top").removeClass("top-nav-collapse");
      }
    }
  }

  $(window).scroll(checktop);

  checktop();
  
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
});
