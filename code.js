$(function() {

    function langCodeIdx(url) {
        return url.substring(0, url.length - 1).lastIndexOf('/');
    }

    function isLangCode(langCode) {
        return (langCode == 'en' || langCode == 'de' || langCode == 'id' || langCode == 'zh' || langCode == 'pl' || langCode == 'ru' || langCode == 'pt' || langCode == 'es' || langCode == 'fr');
    }

    function langFromUrl(url) {
        var langs = ['en', 'de', 'id', 'zh', 'pl', 'ru', 'pt', 'es', 'fr'],
            parser = document.createElement('a');

        parser.href = url;
        langCode = parser.pathname.substring(1, 3);

        return isLangCode(langCode) ? langCode : 'en';
    }

    var currLang = langFromUrl(window.location.href);

    // console.log(currLang);

    $('#language_select select').val(currLang);

    $('#language_select select').on('change', function() {

        var url = window.location.href,
            parser = document.createElement('a'),
            lang = $('#language_select select option:selected').val(),
            lastIdx = langCodeIdx(url),
            codeInUrl = url.substring(lastIdx + 1, lastIdx + 3),
            langOffset = isLangCode(codeInUrl) ? 3 : 0,
            newUrl2 = url.substring(0, lastIdx + 1) + (lang == 'en' ? '' : (lang + '-')) + url.substring(lastIdx + 1 + langOffset);

        parser.href = window.location.href;
        parser.pathname = '/' + lang + parser.pathname.substring(3);

        window.location.href = parser.href;
    });

    $(".nav-button").click(function() {
        $(".nav-button,.primary-nav").toggleClass("open");
    });


    ! function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            p = /^http:/.test(d.location) ? 'http' : 'https';
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + "://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, "script", "twitter-wjs");

    $('.wcustomhtml').css('overflow', 'visible');

    function getDailyReport() {

        $.get('//js.betonmarkets.com/javascript.php', {
                prefix: 'bPzDzniJKAJHH6eEtUVc2GNd7ZgqdRLk',
                media: '26',
                campaign: '1',
                mode: 'txt'
            },
            function(xml) {
                var content = '';
                var recent = '';

                $(xml).find('item').each(function(idx) {

                    var title = $(this).find('title').text().replace(/regentmarkets\d.*$/, ''),
                        pubDate = $(this).find('pubDate').text().replace(/\+0000$/, 'GMT');

                    var post = $(this).find('content\\:encoded').text();
                    if (!post) {
                        post = $(this).find('encoded').text();
                    }
                    post = post.replace(']]&gt;', '')
                        .replace(']]>', '')
                        .replace(/>(.*?)</, '');

                    post = post.substr(post.indexOf('<div>') + 5, post.lastIndexOf('</div>') - 6);

                    $('.report-list').append($('<option>', {
                        value: idx,
                        text: title
                    }));

                    $('<div id="report-' + idx + '" class="single-report">')
                        .append('<h1>' + title + '</h1>')
                        .append('<h2>' + pubDate + '</h2>')
                        .append('<h3>' + post + '</h3>')
                        .toggle(idx == 0)
                        .appendTo('.daily-report');
                });
            },
            'xml'
        );
    }

    if ($('.daily-report').length) {
        getDailyReport();
    }

    $('.report-list').on('change', function(ev) {
        $('.single-report').hide();
        $('#report-' + $('.report-list').val()).show();

    });

    $('div[data-role=youtube-playlist]').each(function(el) {

        var $playlist = this,
            listId = $(this).attr('data-list-id'),
            playlistUrl = 'https://gdata.youtube.com/feeds/api/playlists/' + listId + '?v=2&max-re‌​sults=50&alt=json&orderby=published';

        $.getJSON(playlistUrl, function(data) {
            var listHtml = "";
            $.each(data.feed.entry, function(i, item) {
                var title = item.title.$t,
                    feedURL = item.link[1].href,
                    fragments = feedURL.split("/"),
                    videoID = fragments[fragments.length - 2],
                    thumbUrl = "http://img.youtube.com/vi/" + videoID + "/default.jpg";
                thumbHtml = '<a class="video-thumb" data-video-id="' + videoID + '" title="' + title + '">' +
                    '<img src="' + thumbUrl + '">' +
                    '<h3>' + title + '</h3>' +
                    '</a>'
                listHtml += thumbHtml;
            });
            $(listHtml).appendTo($playlist);
        });
    });

    $('div[data-role=youtube-playlist]').on('click', '.video-thumb', function() {
        var videoId = $(this).attr('data-video-id');
        $('.video-container iframe').attr('src', '//www.youtube.com/embed/' + videoId + '?autoplay=1');
        $('html, body').animate({
            scrollTop: $(".video-container").offset().top
        }, 300);
    });
});
