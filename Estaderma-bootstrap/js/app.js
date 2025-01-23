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

        // favorite btn
        if ($target.is('.favorite-btn')) {
            $target.toggleClass('active');
            setTimeout(() => {
                if ($target.hasClass('active')) {
                    Fancybox.show([{ src: "#wishlist", type: "inline" }]);
                } else {
                    Fancybox.show([{ src: "#wishlist-remove", type: "inline" }]);
                }
            }, 300)
        }

        // open header cart
        if ($target.closest('.header__cart-btn').length) {
            if ($("body").hasClass("_touch") && !$('.header__cart-view').hasClass('header__cart-empty')) {
                e.preventDefault();
                $(".header__cart-view").toggleClass("active");
            }
        } else if (!$target.closest('.header__cart-view.active').length) {
            $(".header__cart-view").removeClass("active");
        }


        // header cart - remove from cart
        if ($target.is('.header__cart-remove')) {
            $target.closest('.header__cart-item').remove();
            updateCartCount();
        }

        // open mobile menu
        if ($target.closest('.header__menu-toggler').length) {
            $target.closest('.header__menu-toggler').toggleClass('active');
            $('.menu').toggleClass('open-menu ');
        }

        if ($target.hasClass('menu')) {
            $('.header__menu-toggler').removeClass('active');
            $('.menu').removeClass('open-menu ');
        }

        // submenu touch devices
        if ($target.is('.menu__arrow')) {
            $target.toggleClass('active')
            $target.next().slideToggle()
        }


    });


    function updateCartCount() {
        const itemCount = $(".header__cart-item").length;
        const $cartCountBadge = $(".header__cart-btn span");

        if (itemCount > 0) {
            $cartCountBadge.text(itemCount);
        } else {
            $cartCountBadge.remove();
            if ($(".header__cart-item").length === 0) {
                $('.header__cart-view').addClass('header__cart-empty');
            }
        }
    }

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
                spaceBetween: 20,
                slidesPerView: 1,
                breakpoints: {
                    767.98: {
                        slidesPerView: isLargeSlider ? 3 : 2,
                        spaceBetween: 20,
                    },
                    1199.98: {
                        spaceBetween: 30,
                        slidesPerView: isLargeSlider ? 4 : 2,
                    },
                    1499.98: {
                        spaceBetween: 40,
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


    // range sliders


    $('.range-slider').each(function () {
        const $slider = $(this);
        const min = parseInt($slider.data('min'), 10);
        const max = parseInt($slider.data('max'), 10);
        const $track = $slider.find('.range-slider__track');
        const $output = $slider.find('.range-slider__output output');


        noUiSlider.create($track[0], {
            start: [min, max],
            connect: true,
            range: {
                min: min,
                max: max,
            },
            format: {
                to: function (value) {
                    return `$${Math.round(value).toLocaleString()}`;
                },
                from: function (value) {
                    return parseFloat(value.replace(/^\$/, '').replace(/,/g, ''));
                }
            },
        });


        $track[0].noUiSlider.on('update', function (values) {
            $output.text(`${values[0]} — ${values[1]}`);
        });
    });



});
