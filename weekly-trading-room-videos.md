---
layout: en/weekly-trading-room-videos
title: Weekly Trading Room Videos
category: weekly-trading-room-videos
permalink: en/weekly-trading-room-videos/
---

<div class="home">
  <div class="post-list">
    {% for post in site.categories.weekly-trading-room-videos %}
      <div class="post">
        <h1>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        </h1>
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
        <article class="post-content">
          <p>
          {{ post.excerpt }}
          </p>
        </article>
        <div class="readMore">
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">Read more...</a>
          <div style="clear:both;"></div>
        </div>
        
      </div>
    {% endfor %}
  </div>
  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>

</div>