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

  DrawerMenu.prototype.FIXED_CLASS = 'jsc-pf-i';

  DrawerMenu.prototype.HIDDEN_CLASS = 'jsc-ofh-i';

  DrawerMenu.prototype.SCROLL_Y_CLASS = 'jsc-ofy-i';

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
        if (!_this.flg) {
          _this.toggleSlide();
          _this.getWindowHeight();
          _this.adjustScrollPosition();
          return _this.invertFlg();
        }
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
      return this.$html.add(this.$body).addClass(this.HIDDEN_CLASS);
    } else if (this.isWindows) {
      if (this.isBrowser === 'firefox') {
        this.$body.addClass(this.SCROLL_Y_CLASS + ' ' + this.FIXED_CLASS);
      } else {
        this.$body.addClass(this.SCROLL_Y_CLASS);
      }
      return this.$wrapper.css({
        top: -this.scrollPosition,
        height: this.scrollPosition + this.windowHeight
      });
    } else {
      this.$body.width(this.$body.width());
      return this.$body.addClass(this.HIDDEN_CLASS);
    }
  };

  DrawerMenu.prototype.removeScrollPosition = function() {
    if (this.isiOS) {
      this.$wrapper.removeAttr(this.STYLE_ATTR_NAME);
      return this.$html.add(this.$body).removeClass(this.HIDDEN_CLASS).scrollTop(this.scrollPosition);
    } else if (this.isWindows) {
      this.$body.removeClass(this.SCROLL_Y_CLASS + ' ' + this.FIXED_CLASS);
      this.$wrapper.removeAttr(this.STYLE_ATTR_NAME);
      return this.$html.add(this.$body).scrollTop(this.scrollPosition);
    } else {
      this.$body.width('');
      return this.$body.removeClass(this.HIDDEN_CLASS);
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvd29ya3MuY29mZmVlIiwiZGV2ZWxvcC9zb3VyY2UvY29mZmVlL2FwcC9kcmF3ZXItbWVudS5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvYXBwL2xhenktbGluay5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvYXBwL21vZGFsLmNvZmZlZSIsImRldmVsb3Avc291cmNlL2NvZmZlZS9hcHAvc21vb3RoLXNjcm9sbC5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvdXRpbGl0eS9pbmhlcml0YW5jZS5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvdXRpbGl0eS9zdXBwb3J0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsb0ZBQUE7O0FBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxtQkFBUixDQUFiLENBQUE7O0FBQUEsUUFDQSxHQUFXLE9BQUEsQ0FBUSxpQkFBUixDQURYLENBQUE7O0FBQUEsWUFFQSxHQUFlLE9BQUEsQ0FBUSxxQkFBUixDQUZmLENBQUE7O0FBQUEsS0FHQSxHQUFRLE9BQUEsQ0FBUSxhQUFSLENBSFIsQ0FBQTs7QUFBQSxVQUtBLEdBQWlCLElBQUEsVUFBQSxDQUFBLENBTGpCLENBQUE7O0FBQUEsUUFNQSxHQUFlLElBQUEsUUFBQSxDQUFBLENBTmYsQ0FBQTs7QUFBQSxZQU9BLEdBQW1CLElBQUEsWUFBQSxDQUFBLENBUG5CLENBQUE7O0FBQUEsS0FRQSxHQUFZLElBQUEsS0FBQSxDQUFBLENBUlosQ0FBQTs7Ozs7QUNBQSxJQUFBLGdDQUFBO0VBQUE7aVNBQUE7O0FBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSwwQkFBUixDQUFkLENBQUE7O0FBQUEsT0FDQSxHQUFVLE9BQUEsQ0FBUSxzQkFBUixDQURWLENBQUE7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QTs7QUFBQSxvQkE0QkEsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNQLFFBQUEsS0FBQTtXQUFBLEtBQUEsR0FBUSwrQ0FERDtFQUFBLENBNUJULENBQUE7O2lCQUFBOztJQURGLENBQUE7O0FBQUEsTUFnQ00sQ0FBQyxPQUFQLEdBQWlCLE9BaENqQixDQUFBIiwiZmlsZSI6IndvcmtzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJEcmF3ZXJNZW51ID0gcmVxdWlyZSAnLi9hcHAvZHJhd2VyLW1lbnUnXG5MYXp5TGluayA9IHJlcXVpcmUgJy4vYXBwL2xhenktbGluaydcblNtb290aFNjcm9sbCA9IHJlcXVpcmUgJy4vYXBwL3Ntb290aC1zY3JvbGwnXG5Nb2RhbCA9IHJlcXVpcmUgJy4vYXBwL21vZGFsJ1xuXG5kcmF3ZXJNZW51ID0gbmV3IERyYXdlck1lbnUoKVxubGF6eUxpbmsgPSBuZXcgTGF6eUxpbmsoKVxuc21vb3RoU2Nyb2xsID0gbmV3IFNtb290aFNjcm9sbCgpXG5tb2RhbCA9IG5ldyBNb2RhbCgpIiwiSW5oZXJpdGFuY2UgPSByZXF1aXJlICcuLy4uL3V0aWxpdHkvaW5oZXJpdGFuY2UnXG5TdXBwb3J0ID0gcmVxdWlyZSAnLi8uLi91dGlsaXR5L3N1cHBvcnQnXG5cbmNsYXNzIERyYXdlck1lbnUgZXh0ZW5kcyBJbmhlcml0YW5jZVxuICBPUEVOX0NMQVNTOiAnaXMtb3BlbidcbiAgRklYRURfQ0xBU1M6ICdqc2MtcGYtaSdcbiAgSElEREVOX0NMQVNTOiAnanNjLW9maC1pJ1xuICBTQ1JPTExfWV9DTEFTUzogJ2pzYy1vZnktaSdcbiAgU1RZTEVfQVRUUl9OQU1FOiAnc3R5bGUnXG5cbiAgJHdpbmRvdzogJCB3aW5kb3dcbiAgJGh0bWw6ICQgJ2h0bWwnXG4gICRib2R5OiAkICdib2R5J1xuICAkd3JhcHBlcjogJCAnI2pzaS1kcmF3ZXItbWVudSdcbiAgJHRyaWdnZXI6ICQgJyNqc2ktZHJhd2VyLW1lbnUtdHJpZ2dlcidcbiAgJHRhcmdldENvbnRlbnRzOiAkICcjanNpLWRyYXdlci1tZW51LWNvbnRlbnRzLXRhcmdldCdcbiAgJHRhcmdldE5hdjogJCAnI2pzaS1kcmF3ZXItbWVudS1uYXYtdGFyZ2V0J1xuICAkb3ZhckxheTogJCAnI2pzaS1kcmF3ZXItbWVudS1vdmVybGF5J1xuICAkdGFnZXRBbGw6ICQgW0A6OiR0cmlnZ2VyWzBdLCBAOjokdGFyZ2V0Q29udGVudHNbMF0sIEA6OiR0YXJnZXROYXZbMF0sIEA6OiRvdmFyTGF5WzBdXVxuXG4gIGZsZzogZmFsc2VcblxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAZXh0ZW5kIG5ldyBTdXBwb3J0KClcbiAgICBAaXNpT1MgPSBAaXNpT1MoKVxuICAgIEBpc1dpbmRvd3MgPSBAaXNXaW5kb3dzKClcbiAgICBAaXNCcm93c2VyID0gQGlzQnJvd3NlcigpXG4gICAgQGV2ZW50ID0gQGlzRXZlbnQoKVxuXG4gICAgQGF0dGFjaEV2ZW50KClcblxuICBhdHRhY2hFdmVudDogLT5cbiAgICBAJHRyaWdnZXIub24gQGV2ZW50LCA9PlxuICAgICAgdW5sZXNzIEBmbGdcbiAgICAgICAgQHRvZ2dsZVNsaWRlKClcbiAgICAgICAgQGdldFdpbmRvd0hlaWdodCgpXG4gICAgICAgIEBhZGp1c3RTY3JvbGxQb3NpdGlvbigpXG4gICAgICAgIEBpbnZlcnRGbGcoKVxuXG4gICAgQCRvdmFyTGF5Lm9uIEBldmVudCwgPT5cbiAgICAgIHVubGVzcyBAZmxnXG4gICAgICAgIEByZW1vdmVTY3JvbGxQb3NpdGlvbigpXG4gICAgICAgIEBjbG9zZVNsaWRlKClcbiAgICAgICAgQGludmVydEZsZygpXG5cbiAgICBAJHRhcmdldENvbnRlbnRzLm9uICd3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCAoZSkgPT5cbiAgICAgIGlmIGUub3JpZ2luYWxFdmVudC5wcm9wZXJ0eU5hbWUgaXMgJ3RyYW5zZm9ybScgb3IgJy13ZWJraXQtdHJhbnNmb3JtJ1xuICAgICAgICBAaW52ZXJ0RmxnKClcblxuICBpbnZlcnRGbGc6IC0+XG4gICAgQGZsZyA9IG5vdCBAZmxnXG5cbiAgdG9nZ2xlU2xpZGU6IC0+XG4gICAgQCR0YWdldEFsbC50b2dnbGVDbGFzcyBAT1BFTl9DTEFTU1xuXG4gIGNsb3NlU2xpZGU6IC0+XG4gICAgQCR0YWdldEFsbC5yZW1vdmVDbGFzcyBAT1BFTl9DTEFTU1xuXG4gIGdldFNjcm9sbFBvc2l0aW9uOiAtPlxuICAgIEBzY3JvbGxQb3NpdGlvbiA9IEAkd2luZG93LnNjcm9sbFRvcCgpXG5cbiAgZ2V0V2luZG93SGVpZ2h0OiAtPlxuICAgIEB3aW5kb3dIZWlnaHQgPSBAJHdpbmRvdy5oZWlnaHQoKVxuXG4gIGFkanVzdFNjcm9sbFBvc2l0aW9uOiAtPlxuICAgIGlmIEAkdGFyZ2V0Q29udGVudHMuaGFzQ2xhc3MgQE9QRU5fQ0xBU1NcbiAgICAgIEBnZXRTY3JvbGxQb3NpdGlvbigpXG4gICAgICBAYWRkU2Nyb2xsUG9zaXRpb24oKVxuXG4gICAgZWxzZVxuICAgICAgQHJlbW92ZVNjcm9sbFBvc2l0aW9uKClcblxuICBhZGRTY3JvbGxQb3NpdGlvbjogLT5cbiAgICBpZiBAaXNpT1NcbiAgICAgIEAkd3JhcHBlclxuICAgICAgICAuY3NzXG4gICAgICAgICAgdG9wOiAtQHNjcm9sbFBvc2l0aW9uXG4gICAgICAgICAgaGVpZ2h0OiBAc2Nyb2xsUG9zaXRpb24gKyBAd2luZG93SGVpZ2h0XG5cbiAgICAgIEAkaHRtbFxuICAgICAgICAuYWRkIEAkYm9keVxuICAgICAgICAuYWRkQ2xhc3MgQEhJRERFTl9DTEFTU1xuXG4gICAgZWxzZSBpZiBAaXNXaW5kb3dzXG4gICAgICBpZiBAaXNCcm93c2VyIGlzICdmaXJlZm94J1xuICAgICAgICBAJGJvZHlcbiAgICAgICAgICAuYWRkQ2xhc3MgQFNDUk9MTF9ZX0NMQVNTICsgJyAnICsgQEZJWEVEX0NMQVNTXG4gICAgICBlbHNlXG4gICAgICAgIEAkYm9keVxuICAgICAgICAgIC5hZGRDbGFzcyBAU0NST0xMX1lfQ0xBU1NcblxuICAgICAgQCR3cmFwcGVyXG4gICAgICAgIC5jc3NcbiAgICAgICAgICB0b3A6IC1Ac2Nyb2xsUG9zaXRpb25cbiAgICAgICAgICBoZWlnaHQ6IEBzY3JvbGxQb3NpdGlvbiArIEB3aW5kb3dIZWlnaHRcblxuICAgIGVsc2VcbiAgICAgIEAkYm9keS53aWR0aCBAJGJvZHkud2lkdGgoKVxuICAgICAgQCRib2R5LmFkZENsYXNzIEBISURERU5fQ0xBU1NcblxuICByZW1vdmVTY3JvbGxQb3NpdGlvbjogLT5cbiAgICBpZiBAaXNpT1NcbiAgICAgIEAkd3JhcHBlci5yZW1vdmVBdHRyIEBTVFlMRV9BVFRSX05BTUVcblxuICAgICAgQCRodG1sXG4gICAgICAgIC5hZGQgQCRib2R5XG4gICAgICAgIC5yZW1vdmVDbGFzcyBASElEREVOX0NMQVNTXG4gICAgICAgIC5zY3JvbGxUb3AgQHNjcm9sbFBvc2l0aW9uXG5cbiAgICBlbHNlIGlmIEBpc1dpbmRvd3NcbiAgICAgIEAkYm9keVxuICAgICAgICAucmVtb3ZlQ2xhc3MgQFNDUk9MTF9ZX0NMQVNTICsgJyAnICsgQEZJWEVEX0NMQVNTXG5cbiAgICAgIEAkd3JhcHBlci5yZW1vdmVBdHRyIEBTVFlMRV9BVFRSX05BTUVcblxuICAgICAgQCRodG1sXG4gICAgICAgIC5hZGQgQCRib2R5XG4gICAgICAgIC5zY3JvbGxUb3AgQHNjcm9sbFBvc2l0aW9uXG5cbiAgICBlbHNlXG4gICAgICBAJGJvZHkud2lkdGggJydcbiAgICAgIEAkYm9keS5yZW1vdmVDbGFzcyBASElEREVOX0NMQVNTXG5cbm1vZHVsZS5leHBvcnRzID0gRHJhd2VyTWVudVxuIiwiRHJhd2VyTWVudSA9IHJlcXVpcmUgJy4vZHJhd2VyLW1lbnUnXG5TdXBwb3J0ID0gcmVxdWlyZSAnLi8uLi91dGlsaXR5L3N1cHBvcnQnXG5cbmNsYXNzIExhenlMaW5rIGV4dGVuZHMgRHJhd2VyTWVudVxuICBWSVNJQkxFX0NMQVNTOiAnaXMtdmlzaWJsZSdcbiAgRFVSQVRJT046IDMwMFxuXG4gICR3cmFwcGVyOiAkICcjanNpLWxhenktbGluaydcbiAgJHRyaWdnZXI6IEA6OiR3cmFwcGVyLmZpbmQgJ2EnXG4gICR0YXJnZXQ6ICQgJy5qc2MtbGF6eS1saW5rLXRhcmdldCdcblxuICBmbGcgPSBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yOiAoKSAtPlxuICAgIEBleHRlbmQgbmV3IFN1cHBvcnQoKVxuICAgIEBldmVudCA9IEBpc0V2ZW50KClcblxuICAgIEBhdHRhY2hFdmVudCgpXG5cbiAgYXR0YWNoRXZlbnQ6IC0+XG4gICAgQCR0cmlnZ2VyLm9uIEBldmVudCwgKGUpID0+XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgQGdldFVSTChlLmN1cnJlbnRUYXJnZXQpXG4gICAgICBAY2xvc2VTbGlkZSgpXG4gICAgICBAaW52ZXJ0RmxnKClcblxuICAgIEAkdGFyZ2V0Q29udGVudHMub24gJ3dlYmtpdFRyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsID0+XG4gICAgICBpZiBAZmxnXG4gICAgICAgIEBmYWRlT3V0KClcbiAgICAgICAgQHRvTGluaygpXG5cbiAgICBAJHdpbmRvdy5vbiAnbG9hZCcsID0+XG4gICAgICBAZmFkZUluKClcblxuICBpbnZlcnRGbGc6IC0+XG4gICAgQGZsZyA9IG5vdCBAZmxnXG5cbiAgZ2V0VVJMOiAodGFyZ2V0KSAtPlxuICAgIEBVUkwgPSAkKHRhcmdldCkuYXR0cignaHJlZicpXG5cbiAgdG9MaW5rOiAtPlxuICAgIHNldFRpbWVvdXQgPT5cbiAgICAgIGxvY2F0aW9uLmhyZWYgPSBAVVJMXG4gICAgLCBARFVSQVRJT05cblxuICBmYWRlT3V0OiAtPlxuICAgIEAkdGFyZ2V0LnJlbW92ZUNsYXNzIEBWSVNJQkxFX0NMQVNTXG5cbiAgZmFkZUluOiAtPlxuICAgIHNldFRpbWVvdXQgPT5cbiAgICAgIEAkdGFyZ2V0LmFkZENsYXNzIEBWSVNJQkxFX0NMQVNTXG4gICAgLCAwXG5cbm1vZHVsZS5leHBvcnRzID0gTGF6eUxpbmtcbiIsIlN1cHBvcnQgPSByZXF1aXJlICcuLy4uL3V0aWxpdHkvc3VwcG9ydCdcblxuY2xhc3MgTW9kYWwgZXh0ZW5kcyBTdXBwb3J0XG4gIFZJU0lCTEVfQ0xBU1M6ICdpcy12aXNpYmxlJ1xuICBISURERU5fQ0xBU1M6ICdqc2MtZG4taSdcbiAgRVJST1JfTUVTU0FHRTogJ+OCs+ODs+ODhuODs+ODhOOBruiqreOBv+i+vOOBv+OBq+WkseaVl+OBl+OBvuOBl+OBn+OAguODluODqeOCpuOCtuOBruODquODreODvOODieODnOOCv+ODs+OCkuaKvOOBl+OBpuWGjeiqreOBv+i+vOOBv+OBl+OBpuOBj+OBoOOBleOBhOOAgidcblxuICAkd2luZG93OiAkIHdpbmRvd1xuICAkZG9jbWVudDogJCBkb2N1bWVudFxuICAkaHRtbDogJCAnaHRtbCdcbiAgJGJvZHk6ICQgJ2JvZHknXG4gICR3cmFwcGVyOiAkICcuanNjLW1vZGFsJ1xuICAkdHJpZ2dlcjogQDo6JHdyYXBwZXIuZmluZCAnYSdcbiAgJGhpZGVUYXJnZXQ6ICQgJy5qc2MtbW9kYWwtaGlkZS10YXJnZXQnXG4gICRsb2FkaW5nOiAkICcjanNpLW1vZGFsLWxvYWRpbmcnXG5cbiAgZmxnOiBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBldmVudCA9IEBpc0V2ZW50KClcbiAgICBAYXR0YWNoRXZlbnQoKVxuXG4gIGF0dGFjaEV2ZW50OiAtPlxuICAgIEAkdHJpZ2dlci5vbiAnY2xpY2snLCAoZSkgPT5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBAZ2V0V2luZG93V2lkdGgoKVxuICAgICAgQGdldFdpbmRvd0hlaWdodCgpXG4gICAgICBAZ2V0U2Nyb2xsUG9zaXRpb24oKVxuICAgICAgQGdldEhUTUwoZS5jdXJyZW50VGFyZ2V0KVxuICAgICAgICAuZG9uZSAoZGF0YSkgPT5cbiAgICAgICAgICBAaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIEBpbnNlcnRIVE1MKGRhdGEpXG4gICAgICAgICAgQGFkanVzdFRhcmdldFNpemUoKVxuICAgICAgICAgIEBhZGp1c3RJbWd0TWFza0hlaWdodCgpXG4gICAgICAgICAgQGhpZGVDb250YWluZXIoKVxuICAgICAgICAgIEBjaGFuZ2VIYXNoKClcbiAgICAgICAgLmZhaWwgPT5cbiAgICAgICAgICBAaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIEBzZXRFcnJvck1lc3NhZ2UoKVxuICAgICAgICAgIEBpbnZlcnRGbGcoKVxuXG4gICAgICBAaW52ZXJ0RmxnKClcblxuICAgIEAkaGlkZVRhcmdldC5vbiAnd2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgPT5cbiAgICAgIGlmIEBmbGdcbiAgICAgICAgQHNob3dUYXJnZXQoKVxuICAgICAgICBAaW52ZXJ0RmxnKClcblxuICAgIEAkYm9keS5vbiAnd2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgJyNqc2ktbW9kYWwtdGFyZ2V0JywgPT5cbiAgICAgIGlmIEBmbGdcbiAgICAgICAgQHNob3dDb250YWluZXIoKVxuICAgICAgICBAcmVtb3ZlSFRNTCgpXG4gICAgICAgIEBhZGp1c3RTY3JvbGxQb3NpdGlvbigpXG4gICAgICAgIEBpbnZlcnRGbGcoKVxuXG4gICAgLm9uIEBldmVudCwgJyNqc2ktbW9kYWwtcHJldi1idG4nLCA9PlxuICAgICAgQGhpZGVUYXJnZXQoKVxuICAgICAgQGludmVydEZsZygpXG5cbiAgICAub24gQGV2ZW50LCAnI2pzaS1tb2RhbC1jaGFuZ2UtaW1nLXRyaWdnZXIgbGknLCAoZSkgPT5cbiAgICAgIEBjaGFuZ2VJbWcoZS5jdXJyZW50VGFyZ2V0KVxuXG4gICAgQCR3aW5kb3cub24gJ3Jlc2l6ZScsID0+XG4gICAgICBAZ2V0V2luZG93V2lkdGgoKVxuICAgICAgQGdldFdpbmRvd0hlaWdodCgpXG4gICAgICBAYWRqdXN0VGFyZ2V0U2l6ZSgpXG4gICAgICBAYWRqdXN0SW1ndE1hc2tIZWlnaHQoKVxuXG4gICAgLm9uICdoYXNoY2hhbmdlJywgPT5cbiAgICAgIGlmIEAkaGlkZVRhcmdldC5pcyAnOmhpZGRlbidcbiAgICAgICAgQGhpZGVUYXJnZXQoKVxuICAgICAgICBAc2hvd0NvbnRhaW5lcigpXG4gICAgICAgIEByZW1vdmVIVE1MKClcbiAgICAgICAgQGFkanVzdFNjcm9sbFBvc2l0aW9uKClcblxuICBpbnZlcnRGbGc6IC0+XG4gICAgQGZsZyA9IG5vdCBAZmxnXG5cbiAgZ2V0SFRNTDogKHRyaWdnZXIpIC0+XG4gICAgQGRmZCA9ICQuRGVmZXJyZWQoKVxuICAgIEBVUkwgPSAkKHRyaWdnZXIpLmF0dHIgJ2hyZWYnXG5cbiAgICBAc2hvd0xvYWRpbmcoKVxuXG4gICAgJC5hamF4XG4gICAgICB1cmw6IEBVUkxcbiAgICAgIHR5cGU6ICdHRVQnXG4gICAgICBkYXRhVHlwZTogJ2h0bWwnXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIHRpbWVvdXQ6IDEwMDAwXG4gICAgLmRvbmUgKGRhdGEpID0+XG4gICAgICBAZGZkLnJlc29sdmUoZGF0YSlcbiAgICAuZmFpbCA9PlxuICAgICAgQGRmZC5yZWplY3QoKVxuXG4gICAgQGRmZC5wcm9taXNlKClcblxuICBpbnNlcnRIVE1MOiAoZGF0YSkgLT5cbiAgICBAJGJvZHkuYXBwZW5kIGRhdGFcblxuICByZW1vdmVIVE1MOiAtPlxuICAgICQoJyNqc2ktbW9kYWwtdGFyZ2V0JykucmVtb3ZlKClcblxuICBzaG93VGFyZ2V0OiAtPlxuICAgICQoJyNqc2ktbW9kYWwtdGFyZ2V0JykuYWRkQ2xhc3MgQFZJU0lCTEVfQ0xBU1NcbiAgICBAJGhpZGVUYXJnZXQuYWRkQ2xhc3MgQEhJRERFTl9DTEFTU1xuICAgIEAkd2luZG93LnNjcm9sbFRvcCAwXG5cbiAgaGlkZVRhcmdldDogLT5cbiAgICAkKCcjanNpLW1vZGFsLXRhcmdldCcpLnJlbW92ZUNsYXNzIEBWSVNJQkxFX0NMQVNTXG4gICAgQCRoaWRlVGFyZ2V0LnJlbW92ZUNsYXNzIEBISURERU5fQ0xBU1NcblxuICBzaG93Q29udGFpbmVyOiAtPlxuICAgIEAkaGlkZVRhcmdldC5hZGRDbGFzcyBAVklTSUJMRV9DTEFTU1xuXG4gIGhpZGVDb250YWluZXI6IC0+XG4gICAgQCRoaWRlVGFyZ2V0LnJlbW92ZUNsYXNzIEBWSVNJQkxFX0NMQVNTXG5cbiAgZ2V0V2luZG93V2lkdGg6IC0+XG4gICAgQHdpbmRvd1dpZHRoID0gQCR3aW5kb3cud2lkdGgoKVxuXG4gIGdldFdpbmRvd0hlaWdodDogLT5cbiAgICBAd2luZG93SGVpZ2h0ID0gQCR3aW5kb3cuaGVpZ2h0KClcblxuICBhZGp1c3RUYXJnZXRTaXplOiAtPlxuICAgICQoJyNqc2ktbW9kYWwtdGFyZ2V0JykuY3NzXG4gICAgICB3aWR0aDogQHdpbmRvd1dpZHRoXG5cbiAgc2hvd0xvYWRpbmc6IC0+XG4gICAgQCRsb2FkaW5nXG4gICAgICAucmVtb3ZlQ2xhc3MgQEhJRERFTl9DTEFTU1xuICAgICAgLmNzc1xuICAgICAgICB0b3A6IEB3aW5kb3dIZWlnaHQgLyAyICArIEAkZG9jbWVudC5zY3JvbGxUb3AoKVxuXG4gIGhpZGVMb2FkaW5nOiAtPlxuICAgIEAkbG9hZGluZy5hZGRDbGFzcyBASElEREVOX0NMQVNTXG5cbiAgc2V0RXJyb3JNZXNzYWdlOiAtPlxuICAgIGFsZXJ0IEBFUlJPUl9NRVNTQUdFXG5cbiAgZ2V0U2Nyb2xsUG9zaXRpb246IC0+XG4gICAgQHNjcm9sbFBvc2l0aW9uID0gQCR3aW5kb3cuc2Nyb2xsVG9wKClcblxuICBhZGp1c3RTY3JvbGxQb3NpdGlvbjogLT5cbiAgICBAJGh0bWxcbiAgICAgIC5hZGQoQCRib2R5KVxuICAgICAgLnNjcm9sbFRvcCBAc2Nyb2xsUG9zaXRpb25cblxuICBjaGFuZ2VJbWc6ICh0cmlnZ2VyKSAtPlxuICAgICQoJyNqc2ktbW9kYWwtY2hhbmdlLWltZy10YXJnZXQnKVxuICAgICAgLmZpbmQgJ2xpJ1xuICAgICAgLnJlbW92ZUNsYXNzIEBWSVNJQkxFX0NMQVNTXG4gICAgICAuZXEgJCh0cmlnZ2VyKS5pbmRleCgpXG4gICAgICAuYWRkQ2xhc3MgQFZJU0lCTEVfQ0xBU1NcblxuICBhZGp1c3RJbWd0TWFza0hlaWdodDogLT5cbiAgICBAdGFyZ2V0UFQgPSBwYXJzZUludCgkKCcjanNpLW1vZGFsLXRhcmdldCcpLmNzcyAncGFkZGluZy10b3AnKVxuICAgIEB0YXJnZXRQQiA9IHBhcnNlSW50KCQoJyNqc2ktbW9kYWwtdGFyZ2V0JykuY3NzICdwYWRkaW5nLWJvdHRvbScpXG4gICAgQG1hc2tCVCA9IHBhcnNlSW50KCQoJyNqc2ktbW9kYWwtY2hhbmdlLWltZy10YXJnZXQnKS5jc3MgJ2JvcmRlci10b3Atd2lkdGgnKVxuICAgIEBtYXNrQkIgPSBwYXJzZUludCgkKCcjanNpLW1vZGFsLWNoYW5nZS1pbWctdGFyZ2V0JykuY3NzICdib3JkZXItYm90dG9tLXdpZHRoJylcblxuICAgICQoJyNqc2ktbW9kYWwtY2hhbmdlLWltZy10YXJnZXQnKVxuICAgICAgLmhlaWdodCBAd2luZG93SGVpZ2h0IC0gKEB0YXJnZXRQVCArIEB0YXJnZXRQQiArIEBtYXNrQlQgKyBAbWFza0JCKVxuXG4gIGNoYW5nZUhhc2g6IC0+XG4gICAgbG9jYXRpb24uaGFzaCA9IEBVUkwucmVwbGFjZSgvLitcXC8oLispXFwuaHRtbC9nLCAnJDEnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsXG4iLCJTdXBwb3J0ID0gcmVxdWlyZSAnLi8uLi91dGlsaXR5L3N1cHBvcnQnXG5cbmNsYXNzIFNtb290aFNjcm9sbCBleHRlbmRzIFN1cHBvcnRcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQERVUkFUSU9OID0gODAwXG4gICAgQEVBU0lORyA9ICdzd2luZydcblxuICAgIEAkdGFyZ2V0ID0gJCAnaHRtbCwgYm9keSdcbiAgICBAJHRyaWdnZXIgPSAkICcjanNpLXNtb290aC1zY3JvbGwnXG5cbiAgICBAZXZlbnQgPSBAaXNFdmVudCgpXG4gICAgQGF0dGFjaEV2ZW50KClcblxuICBhdHRhY2hFdmVudDogLT5cbiAgICBAJHRyaWdnZXIub24gQGV2ZW50LCA9PlxuICAgICAgQHNjcm9sbFRvcCgpXG5cbiAgc2Nyb2xsVG9wOiAtPlxuICAgIEAkdGFyZ2V0LmFuaW1hdGVcbiAgICAgIHNjcm9sbFRvcDogMFxuICAgICxARFVSQVRJT04sIEBFQVNJTkdcblxubW9kdWxlLmV4cG9ydHMgPSBTbW9vdGhTY3JvbGwiLCJjbGFzcyBJbmhlcml0YW5jZVxuICBtb2R1bGVLZXl3b3JkcyA9IFsnZXh0ZW5kZWQnLCAnaW5jbHVkZWQnXVxuXG4gIGV4dGVuZDogKG9iaikgLT5cbiAgICBmb3Iga2V5LCB2YWx1ZSBvZiBvYmogd2hlbiBrZXkgbm90IGluIG1vZHVsZUtleXdvcmRzXG4gICAgICBAW2tleV0gPSB2YWx1ZVxuXG4gICAgb2JqLmV4dGVuZGVkPy5hcHBseShAKVxuICAgIHRoaXNcblxuICBpbmNsdWRlOiAob2JqKSAtPlxuICAgIGZvciBrZXksIHZhbHVlIG9mIG9iaiB3aGVuIGtleSBub3QgaW4gbW9kdWxlS2V5d29yZHNcbiAgICAgIEA6OltrZXldID0gdmFsdWVcblxuICAgIG9iai5pbmNsdWRlZD8uYXBwbHkoQClcbiAgICB0aGlzXG5cbm1vZHVsZS5leHBvcnRzID0gSW5oZXJpdGFuY2UiLCJjbGFzcyBTdXBwb3J0XG4gIHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcbiAgYnJvd3NlciA9IG51bGxcblxuICBpc1dpbmRvd3M6IC0+XG4gICAgdXNlckFnZW50LmluZGV4T2YoJ3dpbicpIGlzbnQgLTFcblxuICBpc01hYzogLT5cbiAgICB1c2VyQWdlbnQuaW5kZXhPZignbWFjJykgaXNudCAtMVxuXG4gIGlzaVBob25lOiAtPlxuICAgIHVzZXJBZ2VudC5pbmRleE9mKCdpcGhvbmUnKSBpc250IC0xXG5cbiAgaXNpUGFkOiAtPlxuICAgIHVzZXJBZ2VudC5pbmRleE9mKCdpcGFkJykgaXNudCAtMVxuXG4gIGlzaU9TOiAtPlxuICAgIEBpc2lQaG9uZSgpIG9yIEBpc2lQYWQoKVxuXG4gIGlzQnJvd3NlcjogLT5cbiAgICBpZiB1c2VyQWdlbnQuaW5kZXhPZigndHJpZGVudC83JykgaXNudCAtMVxuICAgICAgYnJvd3NlciA9ICdpZTExJ1xuICAgIGVsc2UgaWYgdXNlckFnZW50LmluZGV4T2YoJ2Nocm9tZScpIGlzbnQgLTFcbiAgICAgIGJyb3dzZXIgPSAnY2hyb21lJ1xuICAgIGVsc2UgaWYgdXNlckFnZW50LmluZGV4T2YoJ3NhZmFyaScpIGlzbnQgLTFcbiAgICAgIGJyb3dzZXIgPSAnc2FmYXJpJ1xuICAgIGVsc2UgaWYgdXNlckFnZW50LmluZGV4T2YoJ2ZpcmVmb3gnKSBpc250IC0xXG4gICAgICBicm93c2VyID0gJ2ZpcmVmb3gnXG5cbiAgaXNFdmVudDogLT5cbiAgICBldmVudCA9IGAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hlbmQnOiAnY2xpY2snYFxuXG5tb2R1bGUuZXhwb3J0cyA9IFN1cHBvcnQiXX0=