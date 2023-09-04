$(function() {
    var currLang = document.documentElement.lang;
    $('#language_select select').on('change', function() {
        var lang = $(this).val();
        window.location.href = '/' + (lang === 'en' ? '' : lang);
    });
    $(".nav-button").click(function() {
        $(".nav-button,.primary-nav").toggleClass("open");
    });
    $('.wcustomhtml').css('overflow', 'visible');
});

