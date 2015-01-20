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

    var currLang = document.documentElement.lang; //langFromUrl(window.location.href);

    $('#language_select select').on('change', function() {

        var lang = $(this).val();

        window.location.href = '/' + (lang == 'en' ? '' : lang);
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

    function getDailyReport(media) {

        var options = {
            prefix: 'bPzDzniJKAJM5vlemjwB2mNd7ZgqdRLk',
            media: media,
            campaign: '1',
            mode: 'txt'
        };

        $.get('http://js.binary.com/javascript.php', options, function(xml) {

            var content = '',
                recent = '';

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

                    // post = post.substr(post.indexOf('<div>') + 5, post.lastIndexOf('</div>') - 6);

                    $('.report-list').append($('<option>', {
                        value: idx,
                        text: title
                    }));

                    $('<div id="report-' + idx + '" class="single-report">')
                        .append('<h1>' + title + '</h1>')
                        .append('<span class="post-meta">' + pubDate + '</span>')
                        .append('<p>' + post + '</p>')
                        .toggle(idx == 0)
                        .appendTo('.daily-report');
                });
            },
            'xml'
        );
    }

    if ($('.daily-report').length) {
        if (currLang == 'fr') {
            getDailyReport('875');
        } else {
            getDailyReport('26');
        }
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
                    '<p>' + title + '</p>' +
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

    $('.report-list').on('change', function(ev) {
        $('.single-report').hide();
        $('#report-' + $('.report-list').val()).show();

    });
});
