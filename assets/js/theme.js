/* global Pace, ScrollMagic, Linear */

(function($) {
    "use strict";

    var $document = $(document),
        $window = $(window),
        $htmlBody = $('html, body'),
        $body = $('body'),
        $navbar = $('.navbar'),
        $navbarCollapse = $('.navbar-collapse'),
        $pageScrollLink = $('.page-scroll'),
        $scrollToTop = $('.scroll-to-top'),
        $galleryGrid = $('.gallery-grid'),
        $accordionEducation = $('#accordion-education'),
        $accordionWork = $('#accordion-work'),
        navHeight = 80,
        navHeightShrink = 66;

    /** Detect mobile device */
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    /*
     * Window load
     */

    $window.on('load', function() {

        /** Bootstrap scrollspy */
        var ww = Math.max($window.width(), window.innerWidth);
        $body.scrollspy({
            target: '#navigation',
            offset: ww >= 992 ? navHeightShrink : navHeight
        });


        /** Sticky menu */
        if (isMobile.any()) {
            $navbar.addClass('is-mobile');
        }

        if (!$navbar.hasClass('is-mobile') && ww >= 992) {
            $navbar.sticky({ topSpacing: 0 });
        }


        /** Gallery - Filter */
        if ($.fn.imagesLoaded && $.fn.isotope) {
            $galleryGrid.isotope();
        }
    });


    /*
     * Document ready
     */

    $document.ready(function() {

        var ww = Math.max($window.width(), window.innerWidth);

        /*
         * Window scroll
         */

        $window.on('scroll', function() {

            if ($document.scrollTop() > navHeight) {

                /** Shrink navigation */
                $navbar.addClass('shrink');

                /** Scroll to top */
                $scrollToTop.fadeIn();
            } else {

                /** Shrink navigation */
                $navbar.removeClass('shrink');

                /** Scroll to top */
                $scrollToTop.fadeOut();
            }
        });


        /*
         * Window resize
         */

        $window.on('resize', function() {

            /** Bootstrap scrollspy */
            var dataScrollSpy = $body.data('bs.scrollspy'),
                ww = Math.max($window.width(), window.innerWidth),
                offset = ww >= 992 ? navHeightShrink : navHeight;

            dataScrollSpy._config.offset = offset;
            $body.data('bs.scrollspy', dataScrollSpy);
            $body.scrollspy('refresh');


            /** Sticky menu */
            $navbar.unstick();
            if (!$navbar.hasClass('is-mobile') && ww >= 992) {
                $navbar.sticky({ topSpacing: 0 });
            }


            /** Accordion collapse */
            if (ww < 768) {
                $accordionEducation.find('.collapse').collapse('show');
                $accordionWork.find('.collapse').collapse('show');
            } else {
                $accordionEducation.find('.collapse').not(':first').collapse('hide');
                $accordionWork.find('.collapse').not(':first').collapse('hide');
            }
        });


        /** Page scroll */
        $pageScrollLink.on('click', function(e) {
            var anchor = $(this),
                target = anchor.attr('href');
            pageScroll(target);
            e.preventDefault();
        });

        function pageScroll(target) {
            var ww = Math.max($window.width(), window.innerWidth),
                offset = ww >= 992 ? navHeightShrink : navHeight;

            $htmlBody.stop().animate({
                scrollTop: $(target).offset().top - (offset - 1)
            }, 1000, 'easeInOutExpo');

            // Automatically retract the navigation after clicking on one of the menu items.
            $navbarCollapse.collapse('hide');
        };


        /** BG Parallax */
        if (typeof ScrollMagic !== 'undefined') {
            var selector = '.home-bg-parallax';

            // Init controller
            var controller = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: 'onEnter', duration: '200%' } });

            // Build scenes
            new ScrollMagic.Scene({ triggerElement: selector })
                .setTween(selector + ' > .bg-parallax', { y: '80%', ease: Linear.easeNone })
                .addTo(controller);
        }


        /** BG Slideshow */
        if ($.fn.flexslider) {
            var $bgSlideshow = $('.bg-slideshow-wrapper');
            $bgSlideshow.flexslider({
                selector: '.slides > .bg-cover',
                easing: 'linear',
                slideshowSpeed: 3700,
                controlNav: false,
                directionNav: false,
                keyboard: false,
                pauseOnAction: true,
                touch: false
            });
        }

        /** BG Slider */
        if ($.fn.flickity) {
            var $bgSlider = $('#home').find('.carousel-custom');
            $bgSlider.flickity({
                cellSelector: '.carousel-cell',
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: true,
                draggable: false,
                autoPlay: 3700,
                imagesLoaded: true,
                pauseAutoPlayOnHover: false
            });

            var flkty = $bgSlider.data('flickity');
            $bgSlider.find('.flickity-page-dots').on('mouseleave', function() {
                flkty.playPlayer();
            });
        }


        /** Animated typing */
        if ($.fn.typed) {
            var $typedStrings = $('.typed-strings');
            $typedStrings.typed({
                strings: ['GUE Diver, R6 Gamer, Joker..'],
                typeSpeed: 50,
                loop: true,
                showCursor: false
            });

            var $typedProfile = $('.typed-profile');
            $typedProfile.typed({
                strings: ['Frontend Developer | UX Designer'],
                typeSpeed: 100,
                loop: true,
                showCursor: false
            });
        }


        /** Gallery - Magnific popup */
        if ($.fn.magnificPopup) {
            $galleryGrid.magnificPopup({
                delegate: 'a.zoom',
                type: 'image',
                mainClass: 'mfp-fade',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 2],
                    tPrev: 'Previous',
                    tNext: 'Next',
                    tCounter: '<span class="mfp-counter-curr">%curr%</span> of <span class="mfp-counter-total">%total%</span>'
                }
            });
        }


        /** Gallery - Filter */
        if ($.fn.imagesLoaded && $.fn.isotope) {
            var $gridSelectors = $('.gallery-filter').find('a');
            $gridSelectors.on('click', function(e) {
                $gridSelectors.removeClass('disabled');
                $(this).addClass('disabled');

                var selector = $(this).attr('data-filter');
                $galleryGrid.isotope({
                    filter: selector
                });
                e.preventDefault();
            });
        }


        /** Accordion collapse */
        if (ww < 768) {
            $accordionEducation.find('.collapse').collapse('show');
            $accordionWork.find('.collapse').collapse('show');
        } else {
            $accordionEducation.find('.collapse').not(':first').collapse('hide');
            $accordionWork.find('.collapse').not(':first').collapse('hide');
        }


        /** Chart - Bar */
        var $chartBar = $('.chart-bar'),
            $chartBarItem = $chartBar.find('.item-progress');

        $chartBar.one('inview', function(isInView) {
            if (isInView) {
                $chartBarItem.each(function() {
                    $(this).css('width', $(this).data('percent') + '%');
                    $(this).next().css('right', 100 - $(this).data('percent') + '%');
                });
            }
        });


        /** Chart - Circle */
        var $chartCircle = $('.chart-circle').find('.chart'),
            $chartCircleItem = $chartCircle.find('.item-progress');

        $chartCircle.one('inview', function(isInView) {
            if (isInView) {
                $chartCircleItem.each(function() {
                    $(this).css('height', $(this).data('percent') + '%');
                });
            }
        });


        /** Chart - Column */
        var $chartColumn = $('.chart-column').find('.chart'),
            $chartColumnItem = $chartColumn.find('.item-progress');

        $chartColumnItem.each(function() {
            $(this).css('height', $(this).data('percent') + '%');
        });


        /** Flexslider  - References */
        var $flexsliderReferences = $('#flexslider-references'),
            $flexPrev = $flexsliderReferences.find('a.flex-prev'),
            $flexNext = $flexsliderReferences.find('a.flex-next');

        $flexsliderReferences.flexslider({
            selector: '.slides > .item',
            manualControls: '.flex-control-nav li',
            directionNav: false,
            slideshowSpeed: 4000,
            after: function(slider) {
                if (!slider.playing) {
                    slider.play();
                }
            }
        });

        $flexPrev.on('click', function(e) {
            $flexsliderReferences.flexslider('prev');
            e.preventDefault();
        });

        $flexNext.on('click', function(e) {
            $flexsliderReferences.flexslider('next');
            e.preventDefault();
        });


        /** Counter number */
        var $timer = $('.timer');
        $timer.one('inview', function(isInView) {
            if (isInView) {
                $(this).countTo();
            }
        });


        /** Form - Custom */
        if ($.fn.select2) {
            var $selectForm = $('.select2');
            $selectForm.select2({
                containerCssClass: 'select2-container-custom',
                dropdownCssClass: 'select2-dropdown-custom',
                width: '100%'
            });
        }


        /** Form - Contact */
        var $formContact = $('#form-contact'),
            $btnFormContact = $('#btn-form-contact');

        $btnFormContact.on('click', function(e) {
            $formContact.validate();
            if ($formContact.valid()) {
                send_mail($formContact, $btnFormContact);
            }
            e.preventDefault();
        });

        // Send mail
        function send_mail($form, $btnForm) {
            var defaultMessage = $btnForm.html(),
                sendingMessage = 'Loading...',
                errorMessage = 'Error Sending!',
                okMessage = 'Email Sent!';

            $btnForm.html(sendingMessage);

            $.ajax({
                url: $form.attr('action'),
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                success: function(data) {
                    if (data === true) {
                        $btnForm.html(okMessage);
                        $form.find('input[type="text"], input[type="email"], textarea, select').val('');
                    } else {
                        $btnForm.html(errorMessage);
                    }

                    setTimeout(function() {
                        $btnForm.html(defaultMessage);
                    }, 3000);
                },
                error: function(xhr, err) {
                    $btnForm.html(errorMessage);

                    setTimeout(function() {
                        $btnForm.html(defaultMessage);
                    }, 3000);
                }
            });
        }
    });
})(jQuery);