(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DrawerMenu, LazyLink, Modal, SmoothScroll, drawerMenu, lazyLink, modal, smoothScroll;

DrawerMenu = require('./app/drawer-menu');

LazyLink = require('./app/lazy-link');

SmoothScroll = require('./app/smooth-scroll');

Modal = require('./app/modal');

drawerMenu = new DrawerMenu();

lazyLink = new LazyLink();

smoothScroll = new SmoothScroll();

modal = new Modal();



},{"./app/drawer-menu":2,"./app/lazy-link":3,"./app/modal":4,"./app/smooth-scroll":5}],2:[function(require,module,exports){
var DrawerMenu, Inheritance, Support,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Inheritance = require('./../utility/inheritance');

Support = require('./../utility/support');

DrawerMenu = (function(_super) {
  __extends(DrawerMenu, _super);

  DrawerMenu.prototype.OPEN_CLASS = 'is-open';

  DrawerMenu.prototype.FIXED_CLASS = 'jsc-ofh-i';

  DrawerMenu.prototype.STYLE_ATTR_NAME = 'style';

  DrawerMenu.prototype.$window = $(window);

  DrawerMenu.prototype.$html = $('html');

  DrawerMenu.prototype.$body = $('body');

  DrawerMenu.prototype.$wrapper = $('#jsi-drawer-menu');

  DrawerMenu.prototype.$trigger = $('#jsi-drawer-menu-trigger');

  DrawerMenu.prototype.$targetContents = $('#jsi-drawer-menu-contents-target');

  DrawerMenu.prototype.$targetNav = $('#jsi-drawer-menu-nav-target');

  DrawerMenu.prototype.$ovarLay = $('#jsi-drawer-menu-overlay');

  DrawerMenu.prototype.$tagetAll = $([DrawerMenu.prototype.$trigger[0], DrawerMenu.prototype.$targetContents[0], DrawerMenu.prototype.$targetNav[0], DrawerMenu.prototype.$ovarLay[0]]);

  DrawerMenu.prototype.flg = false;

  function DrawerMenu() {
    this.extend(new Support());
    this.isiOS = this.isiOS();
    this.isWindows = this.isWindows();
    this.isBrowser = this.isBrowser();
    this.event = this.isEvent();
    this.attachEvent();
  }

  DrawerMenu.prototype.attachEvent = function() {
    this.$trigger.on(this.event, (function(_this) {
      return function() {
        _this.toggleSlide();
        _this.getWindowHeight();
        _this.adjustScrollPosition();
        return _this.invertFlg();
      };
    })(this));
    this.$ovarLay.on(this.event, (function(_this) {
      return function() {
        if (!_this.flg) {
          _this.removeScrollPosition();
          _this.closeSlide();
          return _this.invertFlg();
        }
      };
    })(this));
    return this.$targetContents.on('webkitTransitionEnd transitionend', (function(_this) {
      return function(e) {
        if (e.originalEvent.propertyName === 'transform' || '-webkit-transform') {
          return _this.invertFlg();
        }
      };
    })(this));
  };

  DrawerMenu.prototype.invertFlg = function() {
    return this.flg = !this.flg;
  };

  DrawerMenu.prototype.toggleSlide = function() {
    return this.$tagetAll.toggleClass(this.OPEN_CLASS);
  };

  DrawerMenu.prototype.closeSlide = function() {
    return this.$tagetAll.removeClass(this.OPEN_CLASS);
  };

  DrawerMenu.prototype.getScrollPosition = function() {
    return this.scrollPosition = this.$window.scrollTop();
  };

  DrawerMenu.prototype.getWindowHeight = function() {
    return this.windowHeight = this.$window.height();
  };

  DrawerMenu.prototype.adjustScrollPosition = function() {
    if (this.$targetContents.hasClass(this.OPEN_CLASS)) {
      this.getScrollPosition();
      return this.addScrollPosition();
    } else {
      return this.removeScrollPosition();
    }
  };

  DrawerMenu.prototype.addScrollPosition = function() {
    if (this.isiOS) {
      this.$wrapper.css({
        top: -this.scrollPosition,
        height: this.scrollPosition + this.windowHeight
      });
      return this.$html.add(this.$body).addClass(this.FIXED_CLASS);
    } else if (this.isWindows) {
      if (this.isBrowser === 'firefox') {
        this.$body.addClass('jsc-ofy-i jsc-pf-i');
      } else {
        this.$body.addClass('jsc-ofy-i');
      }
      return this.$wrapper.css({
        top: -this.scrollPosition,
        height: this.scrollPosition + this.windowHeight
      });
    } else {
      this.$body.width(this.$body.width());
      return this.$body.addClass(this.FIXED_CLASS);
    }
  };

  DrawerMenu.prototype.removeScrollPosition = function() {
    if (this.isiOS) {
      this.$wrapper.removeAttr(this.STYLE_ATTR_NAME);
      return this.$html.add(this.$body).removeClass(this.FIXED_CLASS).scrollTop(this.scrollPosition);
    } else if (this.isWindows) {
      this.$body.removeClass('jsc-ofy-i jsc-pf-i');
      this.$wrapper.removeAttr(this.STYLE_ATTR_NAME);
      return this.$html.add(this.$body).scrollTop(this.scrollPosition);
    } else {
      this.$body.width('');
      return this.$body.removeClass(this.FIXED_CLASS);
    }
  };

  return DrawerMenu;

})(Inheritance);

module.exports = DrawerMenu;



},{"./../utility/inheritance":6,"./../utility/support":7}],3:[function(require,module,exports){
var DrawerMenu, LazyLink, Support,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DrawerMenu = require('./drawer-menu');

Support = require('./../utility/support');

LazyLink = (function(_super) {
  var flg;

  __extends(LazyLink, _super);

  LazyLink.prototype.VISIBLE_CLASS = 'is-visible';

  LazyLink.prototype.DURATION = 300;

  LazyLink.prototype.$wrapper = $('#jsi-lazy-link');

  LazyLink.prototype.$trigger = LazyLink.prototype.$wrapper.find('a');

  LazyLink.prototype.$target = $('.jsc-lazy-link-target');

  flg = false;

  function LazyLink() {
    this.extend(new Support());
    this.event = this.isEvent();
    this.attachEvent();
  }

  LazyLink.prototype.attachEvent = function() {
    this.$trigger.on(this.event, (function(_this) {
      return function(e) {
        e.preventDefault();
        _this.getURL(e.currentTarget);
        _this.closeSlide();
        return _this.invertFlg();
      };
    })(this));
    this.$targetContents.on('webkitTransitionEnd transitionend', (function(_this) {
      return function() {
        if (_this.flg) {
          _this.fadeOut();
          return _this.toLink();
        }
      };
    })(this));
    return this.$window.on('load', (function(_this) {
      return function() {
        return _this.fadeIn();
      };
    })(this));
  };

  LazyLink.prototype.invertFlg = function() {
    return this.flg = !this.flg;
  };

  LazyLink.prototype.getURL = function(target) {
    return this.URL = $(target).attr('href');
  };

  LazyLink.prototype.toLink = function() {
    return setTimeout((function(_this) {
      return function() {
        return location.href = _this.URL;
      };
    })(this), this.DURATION);
  };

  LazyLink.prototype.fadeOut = function() {
    return this.$target.removeClass(this.VISIBLE_CLASS);
  };

  LazyLink.prototype.fadeIn = function() {
    return setTimeout((function(_this) {
      return function() {
        return _this.$target.addClass(_this.VISIBLE_CLASS);
      };
    })(this), 0);
  };

  return LazyLink;

})(DrawerMenu);

module.exports = LazyLink;



},{"./../utility/support":7,"./drawer-menu":2}],4:[function(require,module,exports){
var Modal, Support,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Support = require('./../utility/support');

Modal = (function(_super) {
  __extends(Modal, _super);

  Modal.prototype.VISIBLE_CLASS = 'is-visible';

  Modal.prototype.HIDDEN_CLASS = 'jsc-dn-i';

  Modal.prototype.ERROR_MESSAGE = 'コンテンツの読み込みに失敗しました。ブラウザのリロードボタンを押して再読み込みしてください。';

  Modal.prototype.$window = $(window);

  Modal.prototype.$docment = $(document);

  Modal.prototype.$html = $('html');

  Modal.prototype.$body = $('body');

  Modal.prototype.$wrapper = $('.jsc-modal');

  Modal.prototype.$trigger = Modal.prototype.$wrapper.find('a');

  Modal.prototype.$hideTarget = $('.jsc-modal-hide-target');

  Modal.prototype.$loading = $('#jsi-modal-loading');

  Modal.prototype.flg = false;

  function Modal() {
    this.event = this.isEvent();
    this.attachEvent();
  }

  Modal.prototype.attachEvent = function() {
    this.$trigger.on('click', (function(_this) {
      return function(e) {
        e.preventDefault();
        _this.getWindowWidth();
        _this.getWindowHeight();
        _this.getScrollPosition();
        _this.getHTML(e.currentTarget).done(function(data) {
          _this.hideLoading();
          _this.insertHTML(data);
          _this.adjustTargetSize();
          _this.adjustImgtMaskHeight();
          _this.hideContainer();
          return _this.changeHash();
        }).fail(function() {
          _this.hideLoading();
          _this.setErrorMessage();
          return _this.invertFlg();
        });
        return _this.invertFlg();
      };
    })(this));
    this.$hideTarget.on('webkitTransitionEnd transitionend', (function(_this) {
      return function() {
        if (_this.flg) {
          _this.showTarget();
          return _this.invertFlg();
        }
      };
    })(this));
    this.$body.on('webkitTransitionEnd transitionend', '#jsi-modal-target', (function(_this) {
      return function() {
        if (_this.flg) {
          _this.showContainer();
          _this.removeHTML();
          _this.adjustScrollPosition();
          return _this.invertFlg();
        }
      };
    })(this)).on(this.event, '#jsi-modal-prev-btn', (function(_this) {
      return function() {
        _this.hideTarget();
        return _this.invertFlg();
      };
    })(this)).on(this.event, '#jsi-modal-change-img-trigger li', (function(_this) {
      return function(e) {
        return _this.changeImg(e.currentTarget);
      };
    })(this));
    return this.$window.on('resize', (function(_this) {
      return function() {
        _this.getWindowWidth();
        _this.getWindowHeight();
        _this.adjustTargetSize();
        return _this.adjustImgtMaskHeight();
      };
    })(this)).on('hashchange', (function(_this) {
      return function() {
        if (_this.$hideTarget.is(':hidden')) {
          _this.hideTarget();
          _this.showContainer();
          _this.removeHTML();
          return _this.adjustScrollPosition();
        }
      };
    })(this));
  };

  Modal.prototype.invertFlg = function() {
    return this.flg = !this.flg;
  };

  Modal.prototype.getHTML = function(trigger) {
    this.dfd = $.Deferred();
    this.URL = $(trigger).attr('href');
    this.showLoading();
    $.ajax({
      url: this.URL,
      type: 'GET',
      dataType: 'html',
      cache: false,
      timeout: 10000
    }).done((function(_this) {
      return function(data) {
        return _this.dfd.resolve(data);
      };
    })(this)).fail((function(_this) {
      return function() {
        return _this.dfd.reject();
      };
    })(this));
    return this.dfd.promise();
  };

  Modal.prototype.insertHTML = function(data) {
    return this.$body.append(data);
  };

  Modal.prototype.removeHTML = function() {
    return $('#jsi-modal-target').remove();
  };

  Modal.prototype.showTarget = function() {
    $('#jsi-modal-target').addClass(this.VISIBLE_CLASS);
    this.$hideTarget.addClass(this.HIDDEN_CLASS);
    return this.$window.scrollTop(0);
  };

  Modal.prototype.hideTarget = function() {
    $('#jsi-modal-target').removeClass(this.VISIBLE_CLASS);
    return this.$hideTarget.removeClass(this.HIDDEN_CLASS);
  };

  Modal.prototype.showContainer = function() {
    return this.$hideTarget.addClass(this.VISIBLE_CLASS);
  };

  Modal.prototype.hideContainer = function() {
    return this.$hideTarget.removeClass(this.VISIBLE_CLASS);
  };

  Modal.prototype.getWindowWidth = function() {
    return this.windowWidth = this.$window.width();
  };

  Modal.prototype.getWindowHeight = function() {
    return this.windowHeight = this.$window.height();
  };

  Modal.prototype.adjustTargetSize = function() {
    return $('#jsi-modal-target').css({
      width: this.windowWidth
    });
  };

  Modal.prototype.showLoading = function() {
    return this.$loading.removeClass(this.HIDDEN_CLASS).css({
      top: this.windowHeight / 2 + this.$docment.scrollTop()
    });
  };

  Modal.prototype.hideLoading = function() {
    return this.$loading.addClass(this.HIDDEN_CLASS);
  };

  Modal.prototype.setErrorMessage = function() {
    return alert(this.ERROR_MESSAGE);
  };

  Modal.prototype.getScrollPosition = function() {
    return this.scrollPosition = this.$window.scrollTop();
  };

  Modal.prototype.adjustScrollPosition = function() {
    return this.$html.add(this.$body).scrollTop(this.scrollPosition);
  };

  Modal.prototype.changeImg = function(trigger) {
    return $('#jsi-modal-change-img-target').find('li').removeClass(this.VISIBLE_CLASS).eq($(trigger).index()).addClass(this.VISIBLE_CLASS);
  };

  Modal.prototype.adjustImgtMaskHeight = function() {
    this.targetPT = parseInt($('#jsi-modal-target').css('padding-top'));
    this.targetPB = parseInt($('#jsi-modal-target').css('padding-bottom'));
    this.maskBT = parseInt($('#jsi-modal-change-img-target').css('border-top-width'));
    this.maskBB = parseInt($('#jsi-modal-change-img-target').css('border-bottom-width'));
    return $('#jsi-modal-change-img-target').height(this.windowHeight - (this.targetPT + this.targetPB + this.maskBT + this.maskBB));
  };

  Modal.prototype.changeHash = function() {
    return location.hash = this.URL.replace(/.+\/(.+)\.html/g, '$1');
  };

  return Modal;

})(Support);

module.exports = Modal;



},{"./../utility/support":7}],5:[function(require,module,exports){
var SmoothScroll, Support,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Support = require('./../utility/support');

SmoothScroll = (function(_super) {
  __extends(SmoothScroll, _super);

  function SmoothScroll() {
    this.DURATION = 800;
    this.EASING = 'swing';
    this.$target = $('html, body');
    this.$trigger = $('#jsi-smooth-scroll');
    this.event = this.isEvent();
    this.attachEvent();
  }

  SmoothScroll.prototype.attachEvent = function() {
    return this.$trigger.on(this.event, (function(_this) {
      return function() {
        return _this.scrollTop();
      };
    })(this));
  };

  SmoothScroll.prototype.scrollTop = function() {
    return this.$target.animate({
      scrollTop: 0
    }, this.DURATION, this.EASING);
  };

  return SmoothScroll;

})(Support);

module.exports = SmoothScroll;



},{"./../utility/support":7}],6:[function(require,module,exports){
var Inheritance,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Inheritance = (function() {
  var moduleKeywords;

  function Inheritance() {}

  moduleKeywords = ['extended', 'included'];

  Inheritance.prototype.extend = function(obj) {
    var key, value, _ref;
    for (key in obj) {
      value = obj[key];
      if (__indexOf.call(moduleKeywords, key) < 0) {
        this[key] = value;
      }
    }
    if ((_ref = obj.extended) != null) {
      _ref.apply(this);
    }
    return this;
  };

  Inheritance.prototype.include = function(obj) {
    var key, value, _ref;
    for (key in obj) {
      value = obj[key];
      if (__indexOf.call(moduleKeywords, key) < 0) {
        this.prototype[key] = value;
      }
    }
    if ((_ref = obj.included) != null) {
      _ref.apply(this);
    }
    return this;
  };

  return Inheritance;

})();

module.exports = Inheritance;



},{}],7:[function(require,module,exports){
var Support;

Support = (function() {
  var browser, userAgent;

  function Support() {}

  userAgent = window.navigator.userAgent.toLowerCase();

  browser = null;

  Support.prototype.isWindows = function() {
    return userAgent.indexOf('win') !== -1;
  };

  Support.prototype.isMac = function() {
    return userAgent.indexOf('mac') !== -1;
  };

  Support.prototype.isiPhone = function() {
    return userAgent.indexOf('iphone') !== -1;
  };

  Support.prototype.isiPad = function() {
    return userAgent.indexOf('ipad') !== -1;
  };

  Support.prototype.isiOS = function() {
    return this.isiPhone() || this.isiPad();
  };

  Support.prototype.isBrowser = function() {
    if (userAgent.indexOf('trident/7') !== -1) {
      return browser = 'ie11';
    } else if (userAgent.indexOf('chrome') !== -1) {
      return browser = 'chrome';
    } else if (userAgent.indexOf('safari') !== -1) {
      return browser = 'safari';
    } else if (userAgent.indexOf('firefox') !== -1) {
      return browser = 'firefox';
    }
  };

  Support.prototype.isEvent = function() {
    var event;
    return event = 'ontouchstart' in window ? 'touchend': 'click';
  };

  return Support;

})();

module.exports = Support;



},{}]},{},[1])


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvd29ya3MuY29mZmVlIiwiZGV2ZWxvcC9zb3VyY2UvY29mZmVlL2FwcC9kcmF3ZXItbWVudS5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvYXBwL2xhenktbGluay5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvYXBwL21vZGFsLmNvZmZlZSIsImRldmVsb3Avc291cmNlL2NvZmZlZS9hcHAvc21vb3RoLXNjcm9sbC5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvdXRpbGl0eS9pbmhlcml0YW5jZS5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvdXRpbGl0eS9zdXBwb3J0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsb0ZBQUE7O0FBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxtQkFBUixDQUFiLENBQUE7O0FBQUEsUUFDQSxHQUFXLE9BQUEsQ0FBUSxpQkFBUixDQURYLENBQUE7O0FBQUEsWUFFQSxHQUFlLE9BQUEsQ0FBUSxxQkFBUixDQUZmLENBQUE7O0FBQUEsS0FHQSxHQUFRLE9BQUEsQ0FBUSxhQUFSLENBSFIsQ0FBQTs7QUFBQSxVQUtBLEdBQWlCLElBQUEsVUFBQSxDQUFBLENBTGpCLENBQUE7O0FBQUEsUUFNQSxHQUFlLElBQUEsUUFBQSxDQUFBLENBTmYsQ0FBQTs7QUFBQSxZQU9BLEdBQW1CLElBQUEsWUFBQSxDQUFBLENBUG5CLENBQUE7O0FBQUEsS0FRQSxHQUFZLElBQUEsS0FBQSxDQUFBLENBUlosQ0FBQTs7Ozs7QUNBQSxJQUFBLGdDQUFBO0VBQUE7aVNBQUE7O0FBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSwwQkFBUixDQUFkLENBQUE7O0FBQUEsT0FDQSxHQUFVLE9BQUEsQ0FBUSxzQkFBUixDQURWLENBQUE7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WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIkRyYXdlck1lbnUgPSByZXF1aXJlICcuL2FwcC9kcmF3ZXItbWVudSdcbkxhenlMaW5rID0gcmVxdWlyZSAnLi9hcHAvbGF6eS1saW5rJ1xuU21vb3RoU2Nyb2xsID0gcmVxdWlyZSAnLi9hcHAvc21vb3RoLXNjcm9sbCdcbk1vZGFsID0gcmVxdWlyZSAnLi9hcHAvbW9kYWwnXG5cbmRyYXdlck1lbnUgPSBuZXcgRHJhd2VyTWVudSgpXG5sYXp5TGluayA9IG5ldyBMYXp5TGluaygpXG5zbW9vdGhTY3JvbGwgPSBuZXcgU21vb3RoU2Nyb2xsKClcbm1vZGFsID0gbmV3IE1vZGFsKCkiLCJJbmhlcml0YW5jZSA9IHJlcXVpcmUgJy4vLi4vdXRpbGl0eS9pbmhlcml0YW5jZSdcblN1cHBvcnQgPSByZXF1aXJlICcuLy4uL3V0aWxpdHkvc3VwcG9ydCdcblxuY2xhc3MgRHJhd2VyTWVudSBleHRlbmRzIEluaGVyaXRhbmNlXG4gIE9QRU5fQ0xBU1M6ICdpcy1vcGVuJ1xuICBGSVhFRF9DTEFTUzogJ2pzYy1vZmgtaSdcbiAgU1RZTEVfQVRUUl9OQU1FOiAnc3R5bGUnXG5cbiAgJHdpbmRvdzogJCB3aW5kb3dcbiAgJGh0bWw6ICQgJ2h0bWwnXG4gICRib2R5OiAkICdib2R5J1xuICAkd3JhcHBlcjogJCAnI2pzaS1kcmF3ZXItbWVudSdcbiAgJHRyaWdnZXI6ICQgJyNqc2ktZHJhd2VyLW1lbnUtdHJpZ2dlcidcbiAgJHRhcmdldENvbnRlbnRzOiAkICcjanNpLWRyYXdlci1tZW51LWNvbnRlbnRzLXRhcmdldCdcbiAgJHRhcmdldE5hdjogJCAnI2pzaS1kcmF3ZXItbWVudS1uYXYtdGFyZ2V0J1xuICAkb3ZhckxheTogJCAnI2pzaS1kcmF3ZXItbWVudS1vdmVybGF5J1xuICAkdGFnZXRBbGw6ICQgW0A6OiR0cmlnZ2VyWzBdLCBAOjokdGFyZ2V0Q29udGVudHNbMF0sIEA6OiR0YXJnZXROYXZbMF0sIEA6OiRvdmFyTGF5WzBdXVxuXG4gIGZsZzogZmFsc2VcblxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAZXh0ZW5kIG5ldyBTdXBwb3J0KClcbiAgICBAaXNpT1MgPSBAaXNpT1MoKVxuICAgIEBpc1dpbmRvd3MgPSBAaXNXaW5kb3dzKClcbiAgICBAaXNCcm93c2VyID0gQGlzQnJvd3NlcigpXG4gICAgQGV2ZW50ID0gQGlzRXZlbnQoKVxuXG4gICAgQGF0dGFjaEV2ZW50KClcblxuICBhdHRhY2hFdmVudDogLT5cbiAgICBAJHRyaWdnZXIub24gQGV2ZW50LCA9PlxuICAgICAgQHRvZ2dsZVNsaWRlKClcbiAgICAgIEBnZXRXaW5kb3dIZWlnaHQoKVxuICAgICAgQGFkanVzdFNjcm9sbFBvc2l0aW9uKClcbiAgICAgIEBpbnZlcnRGbGcoKVxuXG4gICAgQCRvdmFyTGF5Lm9uIEBldmVudCwgPT5cbiAgICAgIHVubGVzcyBAZmxnXG4gICAgICAgIEByZW1vdmVTY3JvbGxQb3NpdGlvbigpXG4gICAgICAgIEBjbG9zZVNsaWRlKClcbiAgICAgICAgQGludmVydEZsZygpXG5cbiAgICBAJHRhcmdldENvbnRlbnRzLm9uICd3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCAoZSkgPT5cbiAgICAgIGlmIGUub3JpZ2luYWxFdmVudC5wcm9wZXJ0eU5hbWUgaXMgJ3RyYW5zZm9ybScgb3IgJy13ZWJraXQtdHJhbnNmb3JtJ1xuICAgICAgICBAaW52ZXJ0RmxnKClcblxuICBpbnZlcnRGbGc6IC0+XG4gICAgQGZsZyA9IG5vdCBAZmxnXG5cbiAgdG9nZ2xlU2xpZGU6IC0+XG4gICAgQCR0YWdldEFsbC50b2dnbGVDbGFzcyBAT1BFTl9DTEFTU1xuXG4gIGNsb3NlU2xpZGU6IC0+XG4gICAgQCR0YWdldEFsbC5yZW1vdmVDbGFzcyBAT1BFTl9DTEFTU1xuXG4gIGdldFNjcm9sbFBvc2l0aW9uOiAtPlxuICAgIEBzY3JvbGxQb3NpdGlvbiA9IEAkd2luZG93LnNjcm9sbFRvcCgpXG5cbiAgZ2V0V2luZG93SGVpZ2h0OiAtPlxuICAgIEB3aW5kb3dIZWlnaHQgPSBAJHdpbmRvdy5oZWlnaHQoKVxuXG4gIGFkanVzdFNjcm9sbFBvc2l0aW9uOiAtPlxuICAgIGlmIEAkdGFyZ2V0Q29udGVudHMuaGFzQ2xhc3MgQE9QRU5fQ0xBU1NcbiAgICAgIEBnZXRTY3JvbGxQb3NpdGlvbigpXG4gICAgICBAYWRkU2Nyb2xsUG9zaXRpb24oKVxuXG4gICAgZWxzZVxuICAgICAgQHJlbW92ZVNjcm9sbFBvc2l0aW9uKClcblxuICBhZGRTY3JvbGxQb3NpdGlvbjogLT5cbiAgICBpZiBAaXNpT1NcbiAgICAgIEAkd3JhcHBlclxuICAgICAgICAuY3NzXG4gICAgICAgICAgdG9wOiAtQHNjcm9sbFBvc2l0aW9uXG4gICAgICAgICAgaGVpZ2h0OiBAc2Nyb2xsUG9zaXRpb24gKyBAd2luZG93SGVpZ2h0XG5cbiAgICAgIEAkaHRtbFxuICAgICAgICAuYWRkIEAkYm9keVxuICAgICAgICAuYWRkQ2xhc3MgQEZJWEVEX0NMQVNTXG5cbiAgICBlbHNlIGlmIEBpc1dpbmRvd3NcbiAgICAgIGlmIEBpc0Jyb3dzZXIgaXMgJ2ZpcmVmb3gnXG4gICAgICAgIEAkYm9keVxuICAgICAgICAgIC5hZGRDbGFzcyAnanNjLW9meS1pIGpzYy1wZi1pJ1xuICAgICAgZWxzZVxuICAgICAgICBAJGJvZHlcbiAgICAgICAgICAuYWRkQ2xhc3MgJ2pzYy1vZnktaSdcblxuICAgICAgQCR3cmFwcGVyXG4gICAgICAgIC5jc3NcbiAgICAgICAgICB0b3A6IC1Ac2Nyb2xsUG9zaXRpb25cbiAgICAgICAgICBoZWlnaHQ6IEBzY3JvbGxQb3NpdGlvbiArIEB3aW5kb3dIZWlnaHRcblxuICAgIGVsc2VcbiAgICAgIEAkYm9keS53aWR0aCBAJGJvZHkud2lkdGgoKVxuICAgICAgQCRib2R5LmFkZENsYXNzIEBGSVhFRF9DTEFTU1xuXG4gIHJlbW92ZVNjcm9sbFBvc2l0aW9uOiAtPlxuICAgIGlmIEBpc2lPU1xuICAgICAgQCR3cmFwcGVyLnJlbW92ZUF0dHIgQFNUWUxFX0FUVFJfTkFNRVxuXG4gICAgICBAJGh0bWxcbiAgICAgICAgLmFkZCBAJGJvZHlcbiAgICAgICAgLnJlbW92ZUNsYXNzIEBGSVhFRF9DTEFTU1xuICAgICAgICAuc2Nyb2xsVG9wIEBzY3JvbGxQb3NpdGlvblxuXG4gICAgZWxzZSBpZiBAaXNXaW5kb3dzXG4gICAgICBAJGJvZHlcbiAgICAgICAgLnJlbW92ZUNsYXNzICdqc2Mtb2Z5LWkganNjLXBmLWknXG5cbiAgICAgIEAkd3JhcHBlci5yZW1vdmVBdHRyIEBTVFlMRV9BVFRSX05BTUVcblxuICAgICAgQCRodG1sXG4gICAgICAgIC5hZGQgQCRib2R5XG4gICAgICAgIC5zY3JvbGxUb3AgQHNjcm9sbFBvc2l0aW9uXG5cbiAgICBlbHNlXG4gICAgICBAJGJvZHkud2lkdGggJydcbiAgICAgIEAkYm9keS5yZW1vdmVDbGFzcyBARklYRURfQ0xBU1NcblxubW9kdWxlLmV4cG9ydHMgPSBEcmF3ZXJNZW51XG4iLCJEcmF3ZXJNZW51ID0gcmVxdWlyZSAnLi9kcmF3ZXItbWVudSdcblN1cHBvcnQgPSByZXF1aXJlICcuLy4uL3V0aWxpdHkvc3VwcG9ydCdcblxuY2xhc3MgTGF6eUxpbmsgZXh0ZW5kcyBEcmF3ZXJNZW51XG4gIFZJU0lCTEVfQ0xBU1M6ICdpcy12aXNpYmxlJ1xuICBEVVJBVElPTjogMzAwXG5cbiAgJHdyYXBwZXI6ICQgJyNqc2ktbGF6eS1saW5rJ1xuICAkdHJpZ2dlcjogQDo6JHdyYXBwZXIuZmluZCAnYSdcbiAgJHRhcmdldDogJCAnLmpzYy1sYXp5LWxpbmstdGFyZ2V0J1xuXG4gIGZsZyA9IGZhbHNlXG5cbiAgY29uc3RydWN0b3I6ICgpIC0+XG4gICAgQGV4dGVuZCBuZXcgU3VwcG9ydCgpXG4gICAgQGV2ZW50ID0gQGlzRXZlbnQoKVxuXG4gICAgQGF0dGFjaEV2ZW50KClcblxuICBhdHRhY2hFdmVudDogLT5cbiAgICBAJHRyaWdnZXIub24gQGV2ZW50LCAoZSkgPT5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBAZ2V0VVJMKGUuY3VycmVudFRhcmdldClcbiAgICAgIEBjbG9zZVNsaWRlKClcbiAgICAgIEBpbnZlcnRGbGcoKVxuXG4gICAgQCR0YXJnZXRDb250ZW50cy5vbiAnd2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgPT5cbiAgICAgIGlmIEBmbGdcbiAgICAgICAgQGZhZGVPdXQoKVxuICAgICAgICBAdG9MaW5rKClcblxuICAgIEAkd2luZG93Lm9uICdsb2FkJywgPT5cbiAgICAgIEBmYWRlSW4oKVxuXG4gIGludmVydEZsZzogLT5cbiAgICBAZmxnID0gbm90IEBmbGdcblxuICBnZXRVUkw6ICh0YXJnZXQpIC0+XG4gICAgQFVSTCA9ICQodGFyZ2V0KS5hdHRyKCdocmVmJylcblxuICB0b0xpbms6IC0+XG4gICAgc2V0VGltZW91dCA9PlxuICAgICAgbG9jYXRpb24uaHJlZiA9IEBVUkxcbiAgICAsIEBEVVJBVElPTlxuXG4gIGZhZGVPdXQ6IC0+XG4gICAgQCR0YXJnZXQucmVtb3ZlQ2xhc3MgQFZJU0lCTEVfQ0xBU1NcblxuICBmYWRlSW46IC0+XG4gICAgc2V0VGltZW91dCA9PlxuICAgICAgQCR0YXJnZXQuYWRkQ2xhc3MgQFZJU0lCTEVfQ0xBU1NcbiAgICAsIDBcblxubW9kdWxlLmV4cG9ydHMgPSBMYXp5TGlua1xuIiwiU3VwcG9ydCA9IHJlcXVpcmUgJy4vLi4vdXRpbGl0eS9zdXBwb3J0J1xuXG5jbGFzcyBNb2RhbCBleHRlbmRzIFN1cHBvcnRcbiAgVklTSUJMRV9DTEFTUzogJ2lzLXZpc2libGUnXG4gIEhJRERFTl9DTEFTUzogJ2pzYy1kbi1pJ1xuICBFUlJPUl9NRVNTQUdFOiAn44Kz44Oz44OG44Oz44OE44Gu6Kqt44G/6L6844G/44Gr5aSx5pWX44GX44G+44GX44Gf44CC44OW44Op44Km44K244Gu44Oq44Ot44O844OJ44Oc44K/44Oz44KS5oq844GX44Gm5YaN6Kqt44G/6L6844G/44GX44Gm44GP44Gg44GV44GE44CCJ1xuXG4gICR3aW5kb3c6ICQgd2luZG93XG4gICRkb2NtZW50OiAkIGRvY3VtZW50XG4gICRodG1sOiAkICdodG1sJ1xuICAkYm9keTogJCAnYm9keSdcbiAgJHdyYXBwZXI6ICQgJy5qc2MtbW9kYWwnXG4gICR0cmlnZ2VyOiBAOjokd3JhcHBlci5maW5kICdhJ1xuICAkaGlkZVRhcmdldDogJCAnLmpzYy1tb2RhbC1oaWRlLXRhcmdldCdcbiAgJGxvYWRpbmc6ICQgJyNqc2ktbW9kYWwtbG9hZGluZydcblxuICBmbGc6IGZhbHNlXG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQGV2ZW50ID0gQGlzRXZlbnQoKVxuICAgIEBhdHRhY2hFdmVudCgpXG5cbiAgYXR0YWNoRXZlbnQ6IC0+XG4gICAgQCR0cmlnZ2VyLm9uICdjbGljaycsIChlKSA9PlxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIEBnZXRXaW5kb3dXaWR0aCgpXG4gICAgICBAZ2V0V2luZG93SGVpZ2h0KClcbiAgICAgIEBnZXRTY3JvbGxQb3NpdGlvbigpXG4gICAgICBAZ2V0SFRNTChlLmN1cnJlbnRUYXJnZXQpXG4gICAgICAgIC5kb25lIChkYXRhKSA9PlxuICAgICAgICAgIEBoaWRlTG9hZGluZygpXG4gICAgICAgICAgQGluc2VydEhUTUwoZGF0YSlcbiAgICAgICAgICBAYWRqdXN0VGFyZ2V0U2l6ZSgpXG4gICAgICAgICAgQGFkanVzdEltZ3RNYXNrSGVpZ2h0KClcbiAgICAgICAgICBAaGlkZUNvbnRhaW5lcigpXG4gICAgICAgICAgQGNoYW5nZUhhc2goKVxuICAgICAgICAuZmFpbCA9PlxuICAgICAgICAgIEBoaWRlTG9hZGluZygpXG4gICAgICAgICAgQHNldEVycm9yTWVzc2FnZSgpXG4gICAgICAgICAgQGludmVydEZsZygpXG5cbiAgICAgIEBpbnZlcnRGbGcoKVxuXG4gICAgQCRoaWRlVGFyZ2V0Lm9uICd3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCA9PlxuICAgICAgaWYgQGZsZ1xuICAgICAgICBAc2hvd1RhcmdldCgpXG4gICAgICAgIEBpbnZlcnRGbGcoKVxuXG4gICAgQCRib2R5Lm9uICd3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCAnI2pzaS1tb2RhbC10YXJnZXQnLCA9PlxuICAgICAgaWYgQGZsZ1xuICAgICAgICBAc2hvd0NvbnRhaW5lcigpXG4gICAgICAgIEByZW1vdmVIVE1MKClcbiAgICAgICAgQGFkanVzdFNjcm9sbFBvc2l0aW9uKClcbiAgICAgICAgQGludmVydEZsZygpXG5cbiAgICAub24gQGV2ZW50LCAnI2pzaS1tb2RhbC1wcmV2LWJ0bicsID0+XG4gICAgICBAaGlkZVRhcmdldCgpXG4gICAgICBAaW52ZXJ0RmxnKClcblxuICAgIC5vbiBAZXZlbnQsICcjanNpLW1vZGFsLWNoYW5nZS1pbWctdHJpZ2dlciBsaScsIChlKSA9PlxuICAgICAgQGNoYW5nZUltZyhlLmN1cnJlbnRUYXJnZXQpXG5cbiAgICBAJHdpbmRvdy5vbiAncmVzaXplJywgPT5cbiAgICAgIEBnZXRXaW5kb3dXaWR0aCgpXG4gICAgICBAZ2V0V2luZG93SGVpZ2h0KClcbiAgICAgIEBhZGp1c3RUYXJnZXRTaXplKClcbiAgICAgIEBhZGp1c3RJbWd0TWFza0hlaWdodCgpXG5cbiAgICAub24gJ2hhc2hjaGFuZ2UnLCA9PlxuICAgICAgaWYgQCRoaWRlVGFyZ2V0LmlzICc6aGlkZGVuJ1xuICAgICAgICBAaGlkZVRhcmdldCgpXG4gICAgICAgIEBzaG93Q29udGFpbmVyKClcbiAgICAgICAgQHJlbW92ZUhUTUwoKVxuICAgICAgICBAYWRqdXN0U2Nyb2xsUG9zaXRpb24oKVxuXG4gIGludmVydEZsZzogLT5cbiAgICBAZmxnID0gbm90IEBmbGdcblxuICBnZXRIVE1MOiAodHJpZ2dlcikgLT5cbiAgICBAZGZkID0gJC5EZWZlcnJlZCgpXG4gICAgQFVSTCA9ICQodHJpZ2dlcikuYXR0ciAnaHJlZidcblxuICAgIEBzaG93TG9hZGluZygpXG5cbiAgICAkLmFqYXhcbiAgICAgIHVybDogQFVSTFxuICAgICAgdHlwZTogJ0dFVCdcbiAgICAgIGRhdGFUeXBlOiAnaHRtbCdcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgdGltZW91dDogMTAwMDBcbiAgICAuZG9uZSAoZGF0YSkgPT5cbiAgICAgIEBkZmQucmVzb2x2ZShkYXRhKVxuICAgIC5mYWlsID0+XG4gICAgICBAZGZkLnJlamVjdCgpXG5cbiAgICBAZGZkLnByb21pc2UoKVxuXG4gIGluc2VydEhUTUw6IChkYXRhKSAtPlxuICAgIEAkYm9keS5hcHBlbmQgZGF0YVxuXG4gIHJlbW92ZUhUTUw6IC0+XG4gICAgJCgnI2pzaS1tb2RhbC10YXJnZXQnKS5yZW1vdmUoKVxuXG4gIHNob3dUYXJnZXQ6IC0+XG4gICAgJCgnI2pzaS1tb2RhbC10YXJnZXQnKS5hZGRDbGFzcyBAVklTSUJMRV9DTEFTU1xuICAgIEAkaGlkZVRhcmdldC5hZGRDbGFzcyBASElEREVOX0NMQVNTXG4gICAgQCR3aW5kb3cuc2Nyb2xsVG9wIDBcblxuICBoaWRlVGFyZ2V0OiAtPlxuICAgICQoJyNqc2ktbW9kYWwtdGFyZ2V0JykucmVtb3ZlQ2xhc3MgQFZJU0lCTEVfQ0xBU1NcbiAgICBAJGhpZGVUYXJnZXQucmVtb3ZlQ2xhc3MgQEhJRERFTl9DTEFTU1xuXG4gIHNob3dDb250YWluZXI6IC0+XG4gICAgQCRoaWRlVGFyZ2V0LmFkZENsYXNzIEBWSVNJQkxFX0NMQVNTXG5cbiAgaGlkZUNvbnRhaW5lcjogLT5cbiAgICBAJGhpZGVUYXJnZXQucmVtb3ZlQ2xhc3MgQFZJU0lCTEVfQ0xBU1NcblxuICBnZXRXaW5kb3dXaWR0aDogLT5cbiAgICBAd2luZG93V2lkdGggPSBAJHdpbmRvdy53aWR0aCgpXG5cbiAgZ2V0V2luZG93SGVpZ2h0OiAtPlxuICAgIEB3aW5kb3dIZWlnaHQgPSBAJHdpbmRvdy5oZWlnaHQoKVxuXG4gIGFkanVzdFRhcmdldFNpemU6IC0+XG4gICAgJCgnI2pzaS1tb2RhbC10YXJnZXQnKS5jc3NcbiAgICAgIHdpZHRoOiBAd2luZG93V2lkdGhcblxuICBzaG93TG9hZGluZzogLT5cbiAgICBAJGxvYWRpbmdcbiAgICAgIC5yZW1vdmVDbGFzcyBASElEREVOX0NMQVNTXG4gICAgICAuY3NzXG4gICAgICAgIHRvcDogQHdpbmRvd0hlaWdodCAvIDIgICsgQCRkb2NtZW50LnNjcm9sbFRvcCgpXG5cbiAgaGlkZUxvYWRpbmc6IC0+XG4gICAgQCRsb2FkaW5nLmFkZENsYXNzIEBISURERU5fQ0xBU1NcblxuICBzZXRFcnJvck1lc3NhZ2U6IC0+XG4gICAgYWxlcnQgQEVSUk9SX01FU1NBR0VcblxuICBnZXRTY3JvbGxQb3NpdGlvbjogLT5cbiAgICBAc2Nyb2xsUG9zaXRpb24gPSBAJHdpbmRvdy5zY3JvbGxUb3AoKVxuXG4gIGFkanVzdFNjcm9sbFBvc2l0aW9uOiAtPlxuICAgIEAkaHRtbFxuICAgICAgLmFkZChAJGJvZHkpXG4gICAgICAuc2Nyb2xsVG9wIEBzY3JvbGxQb3NpdGlvblxuXG4gIGNoYW5nZUltZzogKHRyaWdnZXIpIC0+XG4gICAgJCgnI2pzaS1tb2RhbC1jaGFuZ2UtaW1nLXRhcmdldCcpXG4gICAgICAuZmluZCAnbGknXG4gICAgICAucmVtb3ZlQ2xhc3MgQFZJU0lCTEVfQ0xBU1NcbiAgICAgIC5lcSAkKHRyaWdnZXIpLmluZGV4KClcbiAgICAgIC5hZGRDbGFzcyBAVklTSUJMRV9DTEFTU1xuXG4gIGFkanVzdEltZ3RNYXNrSGVpZ2h0OiAtPlxuICAgIEB0YXJnZXRQVCA9IHBhcnNlSW50KCQoJyNqc2ktbW9kYWwtdGFyZ2V0JykuY3NzICdwYWRkaW5nLXRvcCcpXG4gICAgQHRhcmdldFBCID0gcGFyc2VJbnQoJCgnI2pzaS1tb2RhbC10YXJnZXQnKS5jc3MgJ3BhZGRpbmctYm90dG9tJylcbiAgICBAbWFza0JUID0gcGFyc2VJbnQoJCgnI2pzaS1tb2RhbC1jaGFuZ2UtaW1nLXRhcmdldCcpLmNzcyAnYm9yZGVyLXRvcC13aWR0aCcpXG4gICAgQG1hc2tCQiA9IHBhcnNlSW50KCQoJyNqc2ktbW9kYWwtY2hhbmdlLWltZy10YXJnZXQnKS5jc3MgJ2JvcmRlci1ib3R0b20td2lkdGgnKVxuXG4gICAgJCgnI2pzaS1tb2RhbC1jaGFuZ2UtaW1nLXRhcmdldCcpXG4gICAgICAuaGVpZ2h0IEB3aW5kb3dIZWlnaHQgLSAoQHRhcmdldFBUICsgQHRhcmdldFBCICsgQG1hc2tCVCArIEBtYXNrQkIpXG5cbiAgY2hhbmdlSGFzaDogLT5cbiAgICBsb2NhdGlvbi5oYXNoID0gQFVSTC5yZXBsYWNlKC8uK1xcLyguKylcXC5odG1sL2csICckMScpXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxcbiIsIlN1cHBvcnQgPSByZXF1aXJlICcuLy4uL3V0aWxpdHkvc3VwcG9ydCdcblxuY2xhc3MgU21vb3RoU2Nyb2xsIGV4dGVuZHMgU3VwcG9ydFxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBARFVSQVRJT04gPSA4MDBcbiAgICBARUFTSU5HID0gJ3N3aW5nJ1xuXG4gICAgQCR0YXJnZXQgPSAkICdodG1sLCBib2R5J1xuICAgIEAkdHJpZ2dlciA9ICQgJyNqc2ktc21vb3RoLXNjcm9sbCdcblxuICAgIEBldmVudCA9IEBpc0V2ZW50KClcbiAgICBAYXR0YWNoRXZlbnQoKVxuXG4gIGF0dGFjaEV2ZW50OiAtPlxuICAgIEAkdHJpZ2dlci5vbiBAZXZlbnQsID0+XG4gICAgICBAc2Nyb2xsVG9wKClcblxuICBzY3JvbGxUb3A6IC0+XG4gICAgQCR0YXJnZXQuYW5pbWF0ZVxuICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgLEBEVVJBVElPTiwgQEVBU0lOR1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNtb290aFNjcm9sbCIsImNsYXNzIEluaGVyaXRhbmNlXG4gIG1vZHVsZUtleXdvcmRzID0gWydleHRlbmRlZCcsICdpbmNsdWRlZCddXG5cbiAgZXh0ZW5kOiAob2JqKSAtPlxuICAgIGZvciBrZXksIHZhbHVlIG9mIG9iaiB3aGVuIGtleSBub3QgaW4gbW9kdWxlS2V5d29yZHNcbiAgICAgIEBba2V5XSA9IHZhbHVlXG5cbiAgICBvYmouZXh0ZW5kZWQ/LmFwcGx5KEApXG4gICAgdGhpc1xuXG4gIGluY2x1ZGU6IChvYmopIC0+XG4gICAgZm9yIGtleSwgdmFsdWUgb2Ygb2JqIHdoZW4ga2V5IG5vdCBpbiBtb2R1bGVLZXl3b3Jkc1xuICAgICAgQDo6W2tleV0gPSB2YWx1ZVxuXG4gICAgb2JqLmluY2x1ZGVkPy5hcHBseShAKVxuICAgIHRoaXNcblxubW9kdWxlLmV4cG9ydHMgPSBJbmhlcml0YW5jZSIsImNsYXNzIFN1cHBvcnRcbiAgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKVxuICBicm93c2VyID0gbnVsbFxuXG4gIGlzV2luZG93czogLT5cbiAgICB1c2VyQWdlbnQuaW5kZXhPZignd2luJykgaXNudCAtMVxuXG4gIGlzTWFjOiAtPlxuICAgIHVzZXJBZ2VudC5pbmRleE9mKCdtYWMnKSBpc250IC0xXG5cbiAgaXNpUGhvbmU6IC0+XG4gICAgdXNlckFnZW50LmluZGV4T2YoJ2lwaG9uZScpIGlzbnQgLTFcblxuICBpc2lQYWQ6IC0+XG4gICAgdXNlckFnZW50LmluZGV4T2YoJ2lwYWQnKSBpc250IC0xXG5cbiAgaXNpT1M6IC0+XG4gICAgQGlzaVBob25lKCkgb3IgQGlzaVBhZCgpXG5cbiAgaXNCcm93c2VyOiAtPlxuICAgIGlmIHVzZXJBZ2VudC5pbmRleE9mKCd0cmlkZW50LzcnKSBpc250IC0xXG4gICAgICBicm93c2VyID0gJ2llMTEnXG4gICAgZWxzZSBpZiB1c2VyQWdlbnQuaW5kZXhPZignY2hyb21lJykgaXNudCAtMVxuICAgICAgYnJvd3NlciA9ICdjaHJvbWUnXG4gICAgZWxzZSBpZiB1c2VyQWdlbnQuaW5kZXhPZignc2FmYXJpJykgaXNudCAtMVxuICAgICAgYnJvd3NlciA9ICdzYWZhcmknXG4gICAgZWxzZSBpZiB1c2VyQWdlbnQuaW5kZXhPZignZmlyZWZveCcpIGlzbnQgLTFcbiAgICAgIGJyb3dzZXIgPSAnZmlyZWZveCdcblxuICBpc0V2ZW50OiAtPlxuICAgIGV2ZW50ID0gYCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyA/ICd0b3VjaGVuZCc6ICdjbGljaydgXG5cbm1vZHVsZS5leHBvcnRzID0gU3VwcG9ydCJdfQ==