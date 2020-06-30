// jQery for page scrolling feature - requires jQuery Easing plugin
$('.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
    scrollTop: $($anchor.attr('href')).offset().top,
    }, 800, 'easeInOutExpo');
     if ($(window).width() < 1200) {
        $('.topnav').toggle(500, 'easeInOutExpo');
    }
    event.preventDefault();
});

$(document).ready(function(){
    var windowWidth;
    function recalculate() {
        windowWidth = $(window).width();
        if ( windowWidth < 1200) {
            $('.page-scroll').addClass('mobile');
            $('.topnav').css('display', 'none' );
        }
        else {
            $('.page-scroll').removeClass('mobile');
            if ($('.topnav').css('display') == 'none' ){
            $('.topnav').removeAttr( 'style' );
        }
    }
};    
recalculate();
    $(window).resize(recalculate);
});

$('.logo-scroll').on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top,
    }, 800, 'easeInOutExpo');
    windowWidth = $(window).width();
    if (( windowWidth < 1200) && $('.topnav').css('display') == 'block' ){
        $('.topnav').toggle(500, 'easeInOutExpo');
    }
    event.preventDefault();
});

$('a.mobile').click(function(){
    $('.topnav').toggle(500, 'easeInOutExpo');
});
  
$('#push').click(function(){
    $('.topnav').toggle(500, 'easeInOutExpo');
});
  
$('#accordion').accordion({
    heightStyle: 'content',
    collapsible: true,
    active     : false,
});