# Portfolio-2015

- ポートフォリオサイト`19790620.com`のソースになります
- 画像とテキストの一部はダミーに差し替えてます
- node_modulesはGit管理外となってます


## ディレクトリ構成

~~~~
.
├── develop
│   ├── build
│   │   ├── css
│   │   │   ├── about.css
│   │   │   ├── about.css.map
│   │   │   ├── skill.css
│   │   │   ├── skill.css.map
│   │   │   ├── works.css
│   │   │   └── works.css.map
│   │   ├── favicon.ico
│   │   ├── images
│   │   │   ├── img-main-visual.jpg
│   │   │   ├── img-profile.jpg
│   │   │   ├── sprite-2x.png
│   │   │   ├── sprite-master-about
│   │   │   │   ├── icon-github-2x.png
│   │   │   │   ├── icon-github.png
│   │   │   │   ├── icon-qiita-2x.png
│   │   │   │   └── icon-qiita.png
│   │   │   └── sprite.png
│   │   ├── index.html
│   │   ├── js
│   │   │   ├── about.js
│   │   │   ├── lib
│   │   │   │   └── jquery-2.1.3.min.js
│   │   │   ├── skill.js
│   │   │   └── works.js
│   │   ├── skill
│   │   │   ├── images
│   │   │   │   ├── sprite-2x.png
│   │   │   │   ├── sprite-master-skill
│   │   │   │   │   ├── icon-git-2x.png
│   │   │   │   │   ├── icon-git.png
│   │   │   │   │   ├── icon-github-2x.png
│   │   │   │   │   ├── icon-github.png
│   │   │   │   │   ├── icon-illustrator-2x.png
│   │   │   │   │   ├── icon-illustrator.png
│   │   │   │   │   ├── icon-photoshop-2x.png
│   │   │   │   │   ├── icon-photoshop.png
│   │   │   │   │   ├── icon-sketch-2x.png
│   │   │   │   │   ├── icon-sketch.png
│   │   │   │   │   ├── icon-sublime-text-2x.png
│   │   │   │   │   ├── icon-sublime-text.png
│   │   │   │   │   ├── icon-web-storm-2x.png
│   │   │   │   │   └── icon-web-storm.png
│   │   │   │   └── sprite.png
│   │   │   └── index.html
│   │   └── works
│   │       ├── images
│   │       │   ├── *-pc.jpg
│   │       │   └── *-sp.jpg
│   │       ├── index.html
│   │       └── modal
│   │           └── *.html
│   └── source
│       ├── coffee
│       │   ├── about.coffee
│       │   ├── app
│       │   │   ├── drawer-menu.coffee
│       │   │   ├── lazy-link.coffee
│       │   │   ├── loading.coffee
│       │   │   ├── modal.coffee
│       │   │   ├── progress-bar.coffee
│       │   │   └── smooth-scroll.coffee
│       │   ├── skill.coffee
│       │   ├── utility
│       │   │   ├── Inheritance.coffee
│       │   │   └── support.coffee
│       │   └── works.coffee
│       ├── jade
│       │   ├── index.jade
│       │   ├── module
│       │   │   ├── _footer.jade
│       │   │   ├── _head.jade
│       │   │   ├── _header.jade
│       │   │   ├── _nav.jade
│       │   │   └── _script.jade
│       │   ├── pages
│       │   │   ├── _about.jade
│       │   │   ├── _skill.jade
│       │   │   └── _works.jade
│       │   ├── skill
│       │   │   └── index.jade
│       │   └── works
│       │       ├── index.jade
│       │       └── modal
│       │           └── *.jade
│       └── stylus
│           ├── about.styl
│           ├── core
│           │   ├── _base.styl
│           │   ├── _fonts.styl
│           │   ├── _mixin.styl
│           │   ├── _normalize.styl
│           │   ├── _script.styl
│           │   └── _setting.styl
│           ├── module
│           │   ├── _footer.styl
│           │   ├── _header.styl
│           │   ├── _layout.styl
│           │   ├── _modal.styl
│           │   └── _nav.styl
│           ├── pages
│           │   ├── _about.styl
│           │   ├── _skill.styl
│           │   ├── _works.styl
│           │   └── sprite
│           │       ├── _sprite-about.styl
│           │       └── _sprite-skill.styl
│           ├── skill.styl
│           └── works.styl
├── gulpfile.coffee
├── node_modules
├── package.json
└── release
    ├── css
    │   ├── about.css
    │   ├── skill.css
    │   └── works.css
    ├── favicon.ico
    ├── images
    │   ├── img-main-visual.jpg
    │   ├── img-profile.jpg
    │   ├── sprite-2x.png
    │   └── sprite.png
    ├── index.html
    ├── js
    │   ├── about.js
    │   ├── lib
    │   │   └── jquery-2.1.3.min.js
    │   ├── skill.js
    │   └── works.js
    ├── skill
    │   ├── images
    │   │   ├── sprite-2x.png
    │   │   └── sprite.png
    │   └── index.html
    └── works
        ├── images
        │   ├── *-pc.jpg
        │   └── *-sp.jpg
        ├── index.html
        └── modal
            └── *.html
~~~~