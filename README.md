## Binary blog v2

[![Build Status](https://travis-ci.org/binary-com/blog.svg?branch=gh-pages)](https://travis-ci.org/binary-com/blog)

- Always add language to the permalink ( like this -> permalink: /en/some-text-for-prmalink }



Why is this important?
Blog is always listening url and looking for language value (/en/) in order to show correct language on the page for all elements (header, footer, sidebar..) 

If you forget to add language value to the permalink, English will be used.
- Always add language to the front matter ( like this -> language: en )



Why is this important?
This value is used to show pages and posts. Without it, jekyll will have nightmare and bad things will happen.



- All sidebar elements and links are loaded dynamically, according to the language within permalink. 
Example: If Jekyll see value /ru/ in the url (which is added to the page or post permalink), it will load last 10 Russian posts, generate Russian links for learning center, show Russian contributors, show Russian version of promotional boxes. 

===========================================================

###Heart n Soul

- All pages are stored in the folder "pages", in the subfolder for each language.
- All posts are stored in the folder "_posts" , in the subfolder for each language.

####24/7 Listening for language in the url
file: _includes/lang.html

####Building page elements according to the language found in the url (header, menu, sidebar, footer)
files: 
```
_includes/sidebar
_includes/navs
_includes/navs/footer
```

===========================================================

24/7 Listening for front matter language and tag values in pages and posts and building the page content according to this combination.

###Correct usage of front matter for pages

Tag value sets the group of pages to build navigation for. Example: Learning center sidebar nav and contributors grid page as well as contributor sidebar menu. 
There are only 3 tags now, "learning" for Learning Center, "contributor" for Contributors and "main" for building main navigation.

Front matter example for page webinars, which is under tag "learning", meaning it belongs to the group of pages (category if you will) Learning Center.
```
layout: page-learning-center
title: Webinars
permalink: /en/webinars/
language: en
tag: learning
```

Front matter for contributors pages. 
Image value is used for contributors grid, page "Contributors".

```
layout: page-contributor
title: Jim Mellon
permalink: /en/jim-mellon/
language: en
tag: contributor
image: /images/speaker/jimmellon.jpg
```

========================================================

###Adding posts
 
Note that even if you add post in the wrong language subfolder but with correct front matter values, it will be still correctly shown. Language subfolders are meant to just make management easier and better organized (and that is also valid for pages):

Correct usage of front matter for posts.

```
layout: post
title: "Learn Forex Trading Basics"
permalink: /en/learn-forex-trading-basics/
language: en
excerpt: "The Forex — where foreign currencies are bought, sold, and exchanged..."
```


=========================================================

###Post Content

you can just use p element, no need for fancy div usage.
Note that a button under new unified style looks like this:
```
<a class="button" href"http://binary.com"><span>Link Title</span></a>
```
But all elements following unified styling can be found on the style guide here: https://style.binary.com

###Grid System
12 columns


Using a single set of .col-md grid classes, you can create a basic grid system that starts out stacked on mobile devices and tablet devices (the extra small to small range) before becoming horizontal on desktop (medium) devices. Place grid columns in any .row


Always make sure the total sum is 12 (3+3+3+3 / 4+4+4 / 6+6 / 4+8 etc.)

```
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
</div>
<div class="row">
  <div class="col-md-6">.col-md-6</div>
  <div class="col-md-6">.col-md-6</div>
</div>
```

No need to add container class, this is already added. Just add row and columns.



###Validate your code
Its highly recommended to validate the page code you just created. Use html Validator: https://html5.validator.nu
