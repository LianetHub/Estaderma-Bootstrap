"use strict";

// Initialize Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
    });
}

//  DOMContentLoaded
$(function () {

    // Detect user OS
    const isMobile = {
        Android: function () { return /Android/i.test(navigator.userAgent); },
        BlackBerry: function () { return /BlackBerry/i.test(navigator.userAgent); },
        iOS: function () { return /iPhone|iPad|iPod/i.test(navigator.userAgent); },
        Opera: function () { return /Opera Mini/i.test(navigator.userAgent); },
        Windows: function () { return /IEMobile/i.test(navigator.userAgent); },
        any: function () {
            return this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows();
        },
    };

    function getNavigator() {
        if (isMobile.any() || $(window).width() < 992) {
            $("body").removeClass("_pc").addClass("_touch");
        } else {
            $("body").removeClass("_touch").addClass("_pc");
        }
    }

    getNavigator();

    $(window).on("resize", function () {
        getNavigator();
    });

    // Detect support for WebP
    function testWebP(callback) {
        const webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    testWebP(function (support) {
        $("body").addClass(support ? 'webp' : 'no-webp');
    });

    // Event handlers
    $(document).on("click", function (e) {
        const $target = $(e.target);
        // Add your event logic here

        // favorite btn
        if ($target.is('.favorite-btn')) {
            $target.toggleClass('active')
        }
    });

    // sliders 
    if ($('.products__slider').length > 0) {
        $('.products__slider').each((i, slider) => {
            const sliderPagination = $(slider).find('.products__pagination')[0]
            const isLargeSlider = $(slider).hasClass('products__slider-lg');

            new Swiper(slider, {
                pagination: {
                    el: sliderPagination,
                    clickable: true
                },
                loop: true,
                spaceBetween: 40,
                slidesPerView: 1,
                breakpoints: {
                    767.98: {
                        slidesPerView: isLargeSlider ? 3 : 2,
                    },
                    1199.98: {
                        slidesPerView: isLargeSlider ? 4 : 2,
                    },
                    1499.98: {
                        slidesPerView: isLargeSlider ? 5 : 3,
                    },
                }
            })

        })
    }

    if ($('.footer__slider').length > 0) {
        new Swiper('.footer__slider', {
            slidesPerView: 2,
            breakpoints: {
                575.98: {
                    slidesPerView: 3
                },
                991.98: {
                    slidesPerView: 4
                },
                1199.98: {
                    slidesPerView: 5
                },
                1499.98: {
                    slidesPerView: 6
                },
            }
        })
    }

});
