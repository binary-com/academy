$(function() {

    function langCodeIdx(url) {
        return url.substring(0, url.length - 1).lastIndexOf('/');
    }

    function isLangCode(langCode) {
      console.log('is it ', langCode)
        return (langCode == 'en'
            || langCode == 'de'
            || langCode == 'id'
            || langCode == 'zh'
            || langCode == 'pl'
            || langCode == 'ru'
            || langCode == 'pt'
            || langCode == 'es'
            || langCode == 'fr');
    }

    function langFromUrl(url) {
        var langs = ['en', 'de', 'id', 'zh', 'pl', 'ru', 'pt', 'es', 'fr'],
            parser = document.createElement('a');

        parser.href = url;
        langCode = parser.pathname.substring(1, 3);

        return isLangCode(langCode) ? langCode : 'en';
    }

    var currLang = langFromUrl(window.location.href);

    console.log(currLang);

    $('#language_select select').val(currLang)

    $('#language_select select').on('change', function() {

        var url = window.location.href,
            parser = document.createElement('a'),
            lang = $('#language_select select option:selected').val(),
            lastIdx = langCodeIdx(url),
            codeInUrl = url.substring(lastIdx + 1, lastIdx + 3),
            langOffset = isLangCode(codeInUrl) ? 3 : 0,
            newUrl2 = url.substring(0, lastIdx + 1)
                + (lang == 'en' ? '' : (lang + '-'))
                + url.substring(lastIdx + 1 + langOffset);

        parser.href = window.location.href;
        parser.pathname = '/' + lang + parser.pathname.substring(3);

        window.location.href = parser.href;
    });

    $(".nav-button").click(function () {
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

    var url = 'http://js.betonmarkets.com/javascript.php';
    $.get(
      url,
      {
        prefix:   'bPzDzniJKAJHH6eEtUVc2GNd7ZgqdRLk',
        media:    '26',
        campaign: '1',
        mode:     'txt'
      },
      function (xml) {
        var content = '';
        var recent  = '';

        var count = 1;
        $(xml).find('item').each( function () {
            var post = $(this).find('content\\:encoded').text();
            if (! post) {
                post = $(this).find('encoded').text();
            }
            post = post.replace(']]&gt;','');
            post = post.replace(']]>','');
            post = post.replace(/>(.*?)</, '');
            var title    = $(this).find('title').text();
            title = title.replace(/regentmarkets\d.*$/, '');
            var pub_date = $(this).find('pubDate').text();
            pub_date = pub_date.replace(/\+0000$/, 'GMT');
            var description = $(this).find('description').text();
            description = description.replace(/^(?:Morning|Afternoon) Report: \d\d.\d\d (?:London)*/, '');
            //console.log(post);
            content +=
                "<a id=\"post-" + count + "\"></a>"
                + "<div class=\"post\">\n"
                + "<h1>" + pub_date + ' - ' + title + "</h1>\n"
                + "<div class=\"summary\"><p>" + description + "</p></div>\n"
                + "<div class=\"content\" style=\"display: none\"><p>" + post + "</p></div>\n"
                + "\n<a class=\"read-more\" href=\"#post-" + count + "\">Read more...</a>\n</div>\n"
                + "<div style=\"clear:both;\"></div>";
            recent +=
                "<li><a href=\"#post-" + count + "\">" + title + "</a></li>";
            count = count + 1;
        });

        $('#report').html(content);
        $('#recent-posts').html(recent);

        $('a.read-more').click( function () {
          if ($(this).text().match('more')) {
            $(this).siblings('div.summary').hide();
            $(this).siblings('div.content').show();
            $(this).text('Read less');
          }
          else {
            $(this).siblings('div.summary').show();
            $(this).siblings('div.content').hide();
            $(this).text('Read more');
          }
        });

        $('a[rel="nofollow"]').hide();

        return;
      },
      'xml'
    );

    $('div[data-role=youtube-playlist]').each(function(el) {

        var $playlist = this,
            listId = $(this).attr('data-list-id'),
            playlistUrl = 'https://gdata.youtube.com/feeds/api/playlists/' + listId + '?v=2&max-re‌​sults=50&alt=json&orderby=published';

        $.getJSON(playlistUrl, function (data) {
            var listHtml = "";
            $.each(data.feed.entry, function (i, item) {
                console.log(item)
                var title = item.title.$t,
                    feedURL = item.link[1].href,
                    fragments = feedURL.split("/"),
                    videoID = fragments[fragments.length - 2],
                    thumbUrl = "http://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg";
                    thumbHtml = '<a class="video-thumb" data-video-id="' + videoID + '" title="' + title + '">' +
                        '<img src="' + thumbUrl + '">' +
                        '<h3>' + title + '</h3>' +
                        '</a>'
                listHtml += thumbHtml;
            });
            $(listHtml).appendTo($playlist);
        });
    });
});
