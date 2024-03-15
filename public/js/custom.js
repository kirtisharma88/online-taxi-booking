"use strict";


// revolution slider
function revolutionSliderActiver () {
	if ($('.rev_slider_wrapper #slider1').length) {
		$("#slider1").revolution({
			sliderType:"standard",
			sliderLayout:"auto",
			delay:5000,
			navigation: {
				arrows:{enable:true} 
			}, 
			gridwidth:1170,
			gridheight:750 
		});
	};
}
// select input
function selectInput () {
	if ($('.select-input').length) {
		$('.select-input').selectmenu();
	};
}

function priceRanger () {
	if ($('.price-ranger').length) {
		$( '.price-ranger #slider-range' ).slider({
			range: true,
			min: 100,
			max: 10000,
			values: [ 3000, 7000 ],
			slide: function( event, ui ) {
				$( '.price-ranger .ranger-min-max-block .min' ).text( ui.values[ 0 ] );
				$( '.price-ranger .ranger-min-max-block .max' ).text( ui.values[ 1 ] );
			}
		});
	    $( '.price-ranger .ranger-min-max-block .min' ).text( $( '.price-ranger #slider-range' ).slider( 'values', 0 ) );
		$( '.price-ranger .ranger-min-max-block .max' ).text( $( '.price-ranger #slider-range' ).slider( 'values', 1 ) );		    
	};
}
function mixGallery () {
	if ($('.mix-it-gallery').length) {
		$('.mix-it-gallery').mixItUp();
	};
}


function testimonialsCarosule () {
	if ($('.testimonials-carousel .owl-carousel').length) {
		$('.testimonials-carousel .owl-carousel').owlCarousel({
		    loop: true,
		    margin: 30,
		    nav: false,
		    dots: true,
		    autoplay: true,
		    autoplayHoverPause: true,
		    responsive: {
		        0:{
		            items:1
		        },
		        480:{
		            items:1
		        },
		        600:{
		            items:2
		        },
		        1000:{
		            items:2
		        },
		        1170:{
		            items:3
		        }
		    }
		});
	}
}




function clientCarousel () {
	if ($('.client-carousel').length) {
		$('.client-carousel .owl-carousel').owlCarousel({
		    loop: true,
		    margin: 0,
		    nav: true,
		    dots: false,
		    autoplay:true,
		    navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
		    autoplayTimeout:3000,
		    autoplayHoverPause:true,
		    responsive: {
		        0:{
		            items:1
		        },
		        480:{
		            items:2
		        },
		        600:{
		            items:3
		        },
		        1000:{
		            items:6
		        }
		    }
		});
	};
}


function accrodion () {
	if ($('.accrodion-grp').length) {
		
		$('.accrodion-grp').each(function () {
			var accrodionName = $(this).data('grp-name');
			var Self = $(this);
			Self.addClass(accrodionName);
			Self.find('.accrodion .accrodion-content').hide();
			Self.find('.accrodion.active').find('.accrodion-content').show();
			Self.find('.accrodion').each(function() {
				var SelfAccrodion = $(this);
				SelfAccrodion.find('.accrodion-title').on('click', function () {
					var SelfAccrodionTitle = $(this);
					if (SelfAccrodionTitle.parent().hasClass('active') === false ) {					
						$('.accrodion-grp.'+accrodionName).find('.accrodion').removeClass('active');
						$('.accrodion-grp.'+accrodionName).find('.accrodion').find('.accrodion-content').slideUp();
						SelfAccrodionTitle.parent().addClass('active');					
						SelfAccrodionTitle.parent().find('.accrodion-content').slideDown();	
					};
				});
			});
		});
		
	};
}

//Contact Form Validation
function contactFormValidation () {
	if($('.contact-form').length){
		$('.contact-form').validate({ // initialize the plugin
			rules: {
				name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true
				},
				message: {
					required: true
				},
				subject: {
					required: true
				}
			},
			submitHandler: function (form) { 
				// sending value with ajax request
				var form = $(form);
				$.post(form.attr('action'), form.serialize(), function (response) {
					form.parent('div').append(response);
					form.find('input[type="text"]').val('');
					form.find('input[type="email"]').val('');
					form.find('textarea').val('');
				});
				return false;
			}
		});
	}
}


// gallery fancybox activator 
function GalleryFancyboxActivator () {
  var galleryFcb = $('.fancybox');
  if(galleryFcb.length){
    galleryFcb.fancybox({
      openEffect  : 'elastic',
      closeEffect : 'elastic',
      helpers : {
        media : {}
      }
    });
  }
}

function galleryCarousel () {
	if ($('.gallery-wrapper .owl-carousel').length) {
		var navCondition = $('.gallery-wrapper .owl-carousel').data('carousel-nav');
		$('.gallery-wrapper .owl-carousel').owlCarousel({
		    loop: true,
		    margin: 7,
		    nav: navCondition,
		    dots: false,
		    autoplay:true,
		    navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
		    autoplayTimeout:3000,
		    autoplayHoverPause:true,
		    responsive: {
		        0:{
		            items:1
		        },
		        480:{
		            items:2
		        },
		        600:{
		            items:3
		        },
		        1000:{
		            items:4
		        }
		    }			
		});
	};
}




function singleCarCarousel () {
	if ($('.single-car-carousel-content-box').length && $('.single-car-carousel-thumbnail-box').length) {

		var $sync1 = $(".single-car-carousel-content-box"),
			$sync2 = $(".single-car-carousel-thumbnail-box"),
			flag = false,
			duration = 1000;

			$sync1
				.owlCarousel({
					items: 1,
					margin: 0,
					nav: false,
					dots: false
				})
				.on('changed.owl.carousel', function (e) {
					if (!flag) {
						flag = true;
						$sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
						flag = false;
					}
				});

			$sync2
				.owlCarousel({
					margin: 10,
					items: 6,
					nav: false,
					dots: false,
					center: false,
					responsive: {
				        0:{
				            items:2,
				            autoWidth: false
				        },
				        480:{
				            items:3,
				            center: false,
				            autoWidth: false
				        },
				        600:{
				            items:3,
				            autoWidth: false
				        },
				        1000:{
				            items:3,
				            autoWidth: false
				        }
				    },
				})
				.on('click', '.owl-item', function () {
					$sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);

				})
				.on('changed.owl.carousel', function (e) {
					if (!flag) {
						flag = true;		
						$sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
						flag = false;
					}
				});

	};
}

function videoFancybox () {
	if ($("a.video-fancybox").length) {
		$("a.video-fancybox").click(function() {
		    $.fancybox({
		            'padding'       : 0,
		            'autoScale'     : false,
		            'transitionIn'  : 'none',
		            'transitionOut' : 'none',
		            'title'         : this.title,
		            'width'         : 680,
		            'height'        : 495,
		            'href'          : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
		            'type'          : 'swf',
		            openEffect      : 'elastic',
				    closeEffect     : 'elastic',
				    helpers         : {
				    	media : {}
				    },
		            'swf'           : {
		            	'wmode'             : 'transparent',
		                'allowfullscreen'   : 'true'
		            }
		        });

		    return false;
		});
	};
}


function whatWeOfferSlide () {
	if($('.what-we-offer .slide-box .owl-carousel').length) {
		$('.what-we-offer .slide-box .owl-carousel').owlCarousel({
			items: 1,
			margin: 0,
			nav: true,
		    navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],			
			dots: false,
			autoplay:true,
			autoplayTimeout:3000,
			autoplayHoverPause:true
		});
	}
}


function datePicker () {
	if ($('.date-picker').length) {
		$('.date-picker').datepicker();
	};
}
function mobileNavToggler () {
	if ($('.mainmenu-holder').length) {
		$('.mainmenu-holder .nav-footer .menu-expander a').on('click', function () {
			$('.mainmenu-holder .nav-header').toggleClass('closed opened');
			return false;
		});
		$('.mainmenu-holder .nav-header .navigation li.dropdown').children('a').append(function () {
			return '<button class="dropdown-expander"><i class="fa fa-bars"></i></button>';    			
		});
		$('.mainmenu-holder .nav-header .navigation .dropdown-expander').on('click', function () {
			var Self = $(this);
			Self.parent().parent().children('.submenu').toggleClass('closed opened');
			return false;
		});

	}
}

function stickyHeader () {
  if ($('.stricky').length) {
    var strickyScrollPos = $('.stricky').next().offset().top;
    if($(window).scrollTop() > strickyScrollPos) {
      $('.stricky').addClass('stricky-fixed');
    }
    else if($(this).scrollTop() <= strickyScrollPos) {
      $('.stricky').removeClass('stricky-fixed');
    }
  };
}


// Dom Ready Function
jQuery(document).on('ready', function () {
	(function ($) {
		// add your functions
		revolutionSliderActiver();
		selectInput();
		priceRanger();
		testimonialsCarosule();
		mixGallery();
		clientCarousel();
		gMap();
		accrodion();
		contactFormValidation();
		GalleryFancyboxActivator();
		galleryCarousel();
		singleCarCarousel();
		videoFancybox();
		whatWeOfferSlide();
		mobileNavToggler();
		datePicker();
	})(jQuery);
});
// window on load functino
jQuery(window).on('load', function () {
	(function ($) {
		// add your functions

	})(jQuery);
});
// window on scroll functino
jQuery(window).on('scroll', function () {
	(function ($) {
		// add your functions
		stickyHeader();
	})(jQuery);
});