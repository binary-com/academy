## Binary blog v2

- Always add language to the permalink ( like this -> permalink: /en/some-text-for-prmalink }



Why is this important?
Blog is always listening url and looking for language value (/en/) in order to show correct language on the page for all elements (header, footer, sidebar..) 
If you forget to add language value to the permalink, Jekyll will not be happy about it and will use English in spite.
- Always add language to the front matter ( like this -> language: en )



Why is this important?
This value is used to show pages and posts. Without it, jekyll will have nightmare and bad things will happen.



- All sidebar elements and links are loaded dynamically, according to the language within permalink. Example: If Jekyll see value /ru/ in the url (which is added to the page or post permalink), it will load last 10 Russian posts, generate Russian links for learning center, show Russian contributors, show Russian version of promotional boxes. 

===========================================================

###Heart n Soul

- All pages are stored in the folder "pages", in the subfolder for each language.
- All posts are stored in the folder "_posts" , in the subfolder for each language.

####24/7 Listening for language in the url
file: _includes/lang.html

####Building page elements according to the language found in the url (header, menu, sidebar, footer)
files: 
_includes/sidebar
_includes/navs
_includes/navs/footer


===========================================================

24/7 Listening for front matter language and tag values in pages and posts and building the page content according to this combination.

###Correct usage of front matter for pages:

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
language: en
tag: contributor
permalink: /en/jim-mellon/
image: /images/speaker/jimmellon.jpg
```

========================================================

###Adding posts
 
Note that even if you add post in the wrong language subfolder but with correct front matter values, it will be still correctly shown. Language subfolders are meant to just make management easier and better organized (and that is also valid for pages):

Correct usage of front matter for posts.

```
layout: post
title: "Learn Forex Trading Basics"
language: en
permalink: /en/learn-forex-trading-basics/
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