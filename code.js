$(function() {

    var slider = function() {
        var slider = $('#slider');
        if (slider.size()) {
            $('.invisibleslides').show();
            slider.slides({
                container: 'slides-container',
                paginationClass: 'slides-pagination',
                generatePagination: false,
                generateNextPrev: false,
                start: 1,
                preload: true,
                play: 10000,
                slideSpeed: 800,
            });
            if ($('.slides_control').height() < 300) {
                $('.slides_control').css('min-height', '300px');
            }
        }
    };
    slider();

    var currLang = document.documentElement.lang;

    $('#language_select select').on('change', function() {

        var lang = $(this).val();

        window.location.href = '/' + (lang === 'en' ? '' : lang);
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


    function getDailyReport(media, prefix) {

        var options = {
            prefix: prefix,
            media: media,
            campaign: '1',
            mode: 'txt'
        };

        $.get('//js.binary.com/javascript.php', options, function(xml) {

                $(xml).find('item').each(function(idx) {

                    var title = $(this).find('title:first').text().replace(/regentmarkets\d.*$/, ''),
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
                        //.append('<span class="post-meta">' + pubDate + '</span>')
                        .append('<p>' + post + '</p>')
                        .toggle(idx === 0)
                        .appendTo('.daily-report');
                });
            },
            'xml'
        );
    }

    if ($('.daily-report').length) {
        if (currLang === 'id') {
            getDailyReport('876', '8grqRDVc105iX6ztb0GwqWNd7ZgqdRLk');
        } else if (currLang === 'es') {
            getDailyReport('875', 'bPzDzniJKAK6tyDIijdDK2Nd7ZgqdRLk');
        }
        else  {
            getDailyReport('26', 'bPzDzniJKAJHH6eEtUVc2GNd7ZgqdRLk');
        }
    };
    $('.report-list').on('change', function() {
        $('.single-report').hide();
        $('#report-' + $('.report-list').val()).show();

    });

    $('div[data-role=youtube-playlist]').each(function() {

        var $playlist = this,
            listId = $(this).attr('data-list-id'),
            reqUrl = 'https://www.googleapis.com/youtube/v3/playlistItems',
            reqParams = {
                part: 'contentDetails,snippet,status',
                playlistId: listId,
                key: 'AIzaSyDM8-uF9EGwVl4litOnFGSbBzWodGVRnLU',
                maxResults: 50
            };

        $.get(reqUrl, reqParams, renderVideoList);

        function renderVideoList(data) {
            var thumbs = data.items.map(function(item) {
                return '<a class="video-thumb" data-video-id="' + item.snippet.resourceId.videoId + '" title="' + item.snippet.title + '">' +
                            '<img src="' + item.snippet.thumbnails.high.url + '">' +
                            '<p>' + item.snippet.title + '</p>' +
                        '</a>';
            });
            $(thumbs.join('')).appendTo($playlist);
        }
    });

    $('div[data-role=youtube-playlist]').on('click', '.video-thumb', function() {
        var videoId = $(this).attr('data-video-id');
        $('.video-container iframe').attr('src', '//www.youtube.com/embed/' + videoId + '?autoplay=1');
        $('html, body').animate({
            scrollTop: $(".video-container").offset().top
        }, 300);
    });

    $('.report-list').on('change', function() {
        $('.single-report').hide();
        $('#report-' + $('.report-list').val()).show();

    });
});
