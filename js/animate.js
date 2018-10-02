$("#Headphone").mouseover(function() {
    TweenMax.to("#Headphone *", 0.5, {stroke:"red", ease: Power4.easeInOut});
    TweenMax.to("#Web_Designer #Board", 0.5, {x:-1000, y:0, scale:3,  ease: Power4.easeInOut});
    TweenMax.to("#DeskTop ", 0.5, {opacity:0,  ease: Power4.easeInOut});
    TweenMax.to("#sunT .test", 0.5, {fill:"red", ease: Power4.easeInOut});
});

$("#Headphone").mouseout(function() {
    TweenMax.to("#BTC .cls-8", 0.5, {stroke:"red", ease: Power4.easeInOut});
    TweenMax.to("#Web_Designer #Board", 0.5, {x:0, y:0, scale:1,  ease: Power4.easeInOut});
    TweenMax.to("#DeskTop ", 0.5, {opacity:1,  ease: Power4.easeInOut});
    TweenMax.to("#sunT .test", 0.5, {fill:"red", ease: Power4.easeInOut});
});

$('#accordion').accordion({
    heightStyle: 'content',
    collapsible: true,
    active     : false,

});