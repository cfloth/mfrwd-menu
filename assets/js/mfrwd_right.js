$(document).ready(function() {
  	$('.btn-menu').click(function() {
  	    if (Modernizr.csstransitions) {
            if ($('.page').hasClass('page-open')) {
                $('.page').removeClass('page-open');
                $('.page-shadow').removeClass('page-shadow-open');
            }else{
                $('.page').addClass('page-open');
                $('.page-shadow').addClass('page-shadow-open');
            }
        }else{
            if ($('.page').css('left') == "0px") {
                $('.page').animate({left:'-230px'}, 500);
            }else{
                $('.page').animate({left:'0px'}, 500);
            }
        }
  	});

    if (Modernizr.touch) {
        //"Hide the address bar in a fullscreen iPhone or Android web app"
        //original Gist by nateps (https://gist.github.com/1172490)
        // Hide the address bar!
        var page = document.getElementById('page'),
        navigation = document.getElementById('navigation'),
        ua = navigator.userAgent,
        iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
        ipad = ~ua.indexOf('iPad'),
        ios = iphone || ipad,
        // Detect if this is running as a fullscreen app from the homescreen
        fullscreen = window.navigator.standalone,
        android = ~ua.indexOf('Android'),
        lastWidth = 0;
        
        if (android) {
            // Android's browser adds the scroll position to the innerHeight
            // Thus, once we are scrolled, the
            // page height value needs to be corrected in case the page is loaded
            // when already scrolled down. The pageYOffset is of no use, since it always
            // returns 0 while the address bar is displayed.
            window.onscroll = function() {
                page.style.height = window.innerHeight + 'px'
                navigation.style.height = window.innerHeight + 'px'
            }
        }
        var setupScroll = window.onload = function() {
            // Start out by adding the height of the location bar to the width, so that
            // we can scroll past it
            if (ios) {
                // iOS reliably returns the innerWindow size for documentElement.clientHeight
                // but window.innerHeight is sometimes the wrong value after rotating
                // the orientation
                var height = document.documentElement.clientHeight;
                // Only add extra padding to the height on iphone / ipod, since the ipad
                // browser doesn't scroll off the location bar.
                if (iphone && !fullscreen) height += 60;
                page.style.height = height + 'px';
                navigation.style.height = window.innerHeight + 'px'
            } else if (android) {
                // The stock Android browser has a location bar height of 56 pixels, but
                // this very likely could be broken in other Android browsers.
                page.style.height = (window.innerHeight + 56) + 'px'
                navigation.style.height = window.innerHeight + 'px'
            }
            // Scroll after a timeout, since iOS will scroll to the top of the page
            // after it fires the onload event
            setTimeout(scrollTo, 0, 0, 1);
        };
        (window.onresize = function() {
            var pageWidth = page.offsetWidth;
            // Android doesn't support orientation change, so check for when the width
            // changes to figure out when the orientation changes
            if (lastWidth == pageWidth) return;
            lastWidth = pageWidth;
            setupScroll();
        })();
    }
});
