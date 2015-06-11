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
        this.$body.addClass(this.SCROLL_Y_CLASS + ' ' + this.FIXED_CLASS).width('100%');
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
      if (this.isBrowser === 'firefox') {
        this.$body.removeClass(this.SCROLL_Y_CLASS + ' ' + this.FIXED_CLASS).width('');
      } else {
        this.$body.removeClass(this.SCROLL_Y_CLASS);
      }
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvd29ya3MuY29mZmVlIiwiZGV2ZWxvcC9zb3VyY2UvY29mZmVlL2FwcC9kcmF3ZXItbWVudS5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvYXBwL2xhenktbGluay5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvYXBwL21vZGFsLmNvZmZlZSIsImRldmVsb3Avc291cmNlL2NvZmZlZS9hcHAvc21vb3RoLXNjcm9sbC5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvdXRpbGl0eS9pbmhlcml0YW5jZS5jb2ZmZWUiLCJkZXZlbG9wL3NvdXJjZS9jb2ZmZWUvdXRpbGl0eS9zdXBwb3J0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsb0ZBQUE7O0FBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxtQkFBUixDQUFiLENBQUE7O0FBQUEsUUFDQSxHQUFXLE9BQUEsQ0FBUSxpQkFBUixDQURYLENBQUE7O0FBQUEsWUFFQSxHQUFlLE9BQUEsQ0FBUSxxQkFBUixDQUZmLENBQUE7O0FBQUEsS0FHQSxHQUFRLE9BQUEsQ0FBUSxhQUFSLENBSFIsQ0FBQTs7QUFBQSxVQUtBLEdBQWlCLElBQUEsVUFBQSxDQUFBLENBTGpCLENBQUE7O0FBQUEsUUFNQSxHQUFlLElBQUEsUUFBQSxDQUFBLENBTmYsQ0FBQTs7QUFBQSxZQU9BLEdBQW1CLElBQUEsWUFBQSxDQUFBLENBUG5CLENBQUE7O0FBQUEsS0FRQSxHQUFZLElBQUEsS0FBQSxDQUFBLENBUlosQ0FBQTs7Ozs7QUNBQSxJQUFBLGdDQUFBO0VBQUE7aVNBQUE7O0FBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSwwQkFBUixDQUFkLENBQUE7O0FBQUEsT0FDQSxHQUFVLE9BQUEsQ0FBUSxzQkFBUixDQURWLENBQUE7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QUFHLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFFBQWxCLENBQUEsS0FBaUMsQ0FBQSxDQUFwQzthQUNILE9BQUEsR0FBVSxTQURQO0tBQUEsTUFFQSxJQUFHLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFNBQWxCLENBQUEsS0FBa0MsQ0FBQSxDQUFyQzthQUNILE9BQUEsR0FBVSxVQURQO0tBUEk7RUFBQSxDQWxCWCxDQUFBOztBQUFBLG9CQTRCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsUUFBQSxLQUFBO1dBQUEsS0FBQSxHQUFRLCtDQUREO0VBQUEsQ0E1QlQsQ0FBQTs7aUJBQUE7O0lBREYsQ0FBQTs7QUFBQSxNQWdDTSxDQUFDLE9BQVAsR0FBaUIsT0FoQ2pCLENBQUEiLCJmaWxlIjoid29ya3MuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIkRyYXdlck1lbnUgPSByZXF1aXJlICcuL2FwcC9kcmF3ZXItbWVudSdcbkxhenlMaW5rID0gcmVxdWlyZSAnLi9hcHAvbGF6eS1saW5rJ1xuU21vb3RoU2Nyb2xsID0gcmVxdWlyZSAnLi9hcHAvc21vb3RoLXNjcm9sbCdcbk1vZGFsID0gcmVxdWlyZSAnLi9hcHAvbW9kYWwnXG5cbmRyYXdlck1lbnUgPSBuZXcgRHJhd2VyTWVudSgpXG5sYXp5TGluayA9IG5ldyBMYXp5TGluaygpXG5zbW9vdGhTY3JvbGwgPSBuZXcgU21vb3RoU2Nyb2xsKClcbm1vZGFsID0gbmV3IE1vZGFsKCkiLCJJbmhlcml0YW5jZSA9IHJlcXVpcmUgJy4vLi4vdXRpbGl0eS9pbmhlcml0YW5jZSdcblN1cHBvcnQgPSByZXF1aXJlICcuLy4uL3V0aWxpdHkvc3VwcG9ydCdcblxuY2xhc3MgRHJhd2VyTWVudSBleHRlbmRzIEluaGVyaXRhbmNlXG4gIE9QRU5fQ0xBU1M6ICdpcy1vcGVuJ1xuICBGSVhFRF9DTEFTUzogJ2pzYy1wZi1pJ1xuICBISURERU5fQ0xBU1M6ICdqc2Mtb2ZoLWknXG4gIFNDUk9MTF9ZX0NMQVNTOiAnanNjLW9meS1pJ1xuICBTVFlMRV9BVFRSX05BTUU6ICdzdHlsZSdcblxuICAkd2luZG93OiAkIHdpbmRvd1xuICAkaHRtbDogJCAnaHRtbCdcbiAgJGJvZHk6ICQgJ2JvZHknXG4gICR3cmFwcGVyOiAkICcjanNpLWRyYXdlci1tZW51J1xuICAkdHJpZ2dlcjogJCAnI2pzaS1kcmF3ZXItbWVudS10cmlnZ2VyJ1xuICAkdGFyZ2V0Q29udGVudHM6ICQgJyNqc2ktZHJhd2VyLW1lbnUtY29udGVudHMtdGFyZ2V0J1xuICAkdGFyZ2V0TmF2OiAkICcjanNpLWRyYXdlci1tZW51LW5hdi10YXJnZXQnXG4gICRvdmFyTGF5OiAkICcjanNpLWRyYXdlci1tZW51LW92ZXJsYXknXG4gICR0YWdldEFsbDogJCBbQDo6JHRyaWdnZXJbMF0sIEA6OiR0YXJnZXRDb250ZW50c1swXSwgQDo6JHRhcmdldE5hdlswXSwgQDo6JG92YXJMYXlbMF1dXG5cbiAgZmxnOiBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBleHRlbmQgbmV3IFN1cHBvcnQoKVxuICAgIEBpc2lPUyA9IEBpc2lPUygpXG4gICAgQGlzV2luZG93cyA9IEBpc1dpbmRvd3MoKVxuICAgIEBpc0Jyb3dzZXIgPSBAaXNCcm93c2VyKClcbiAgICBAZXZlbnQgPSBAaXNFdmVudCgpXG5cbiAgICBAYXR0YWNoRXZlbnQoKVxuXG4gIGF0dGFjaEV2ZW50OiAtPlxuICAgIEAkdHJpZ2dlci5vbiBAZXZlbnQsID0+XG4gICAgICB1bmxlc3MgQGZsZ1xuICAgICAgICBAdG9nZ2xlU2xpZGUoKVxuICAgICAgICBAZ2V0V2luZG93SGVpZ2h0KClcbiAgICAgICAgQGFkanVzdFNjcm9sbFBvc2l0aW9uKClcbiAgICAgICAgQGludmVydEZsZygpXG5cbiAgICBAJG92YXJMYXkub24gQGV2ZW50LCA9PlxuICAgICAgdW5sZXNzIEBmbGdcbiAgICAgICAgQHJlbW92ZVNjcm9sbFBvc2l0aW9uKClcbiAgICAgICAgQGNsb3NlU2xpZGUoKVxuICAgICAgICBAaW52ZXJ0RmxnKClcblxuICAgIEAkdGFyZ2V0Q29udGVudHMub24gJ3dlYmtpdFRyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsIChlKSA9PlxuICAgICAgaWYgZS5vcmlnaW5hbEV2ZW50LnByb3BlcnR5TmFtZSBpcyAndHJhbnNmb3JtJyBvciAnLXdlYmtpdC10cmFuc2Zvcm0nXG4gICAgICAgIEBpbnZlcnRGbGcoKVxuXG4gIGludmVydEZsZzogLT5cbiAgICBAZmxnID0gbm90IEBmbGdcblxuICB0b2dnbGVTbGlkZTogLT5cbiAgICBAJHRhZ2V0QWxsLnRvZ2dsZUNsYXNzIEBPUEVOX0NMQVNTXG5cbiAgY2xvc2VTbGlkZTogLT5cbiAgICBAJHRhZ2V0QWxsLnJlbW92ZUNsYXNzIEBPUEVOX0NMQVNTXG5cbiAgZ2V0U2Nyb2xsUG9zaXRpb246IC0+XG4gICAgQHNjcm9sbFBvc2l0aW9uID0gQCR3aW5kb3cuc2Nyb2xsVG9wKClcblxuICBnZXRXaW5kb3dIZWlnaHQ6IC0+XG4gICAgQHdpbmRvd0hlaWdodCA9IEAkd2luZG93LmhlaWdodCgpXG5cbiAgYWRqdXN0U2Nyb2xsUG9zaXRpb246IC0+XG4gICAgaWYgQCR0YXJnZXRDb250ZW50cy5oYXNDbGFzcyBAT1BFTl9DTEFTU1xuICAgICAgQGdldFNjcm9sbFBvc2l0aW9uKClcbiAgICAgIEBhZGRTY3JvbGxQb3NpdGlvbigpXG5cbiAgICBlbHNlXG4gICAgICBAcmVtb3ZlU2Nyb2xsUG9zaXRpb24oKVxuXG4gIGFkZFNjcm9sbFBvc2l0aW9uOiAtPlxuICAgIGlmIEBpc2lPU1xuICAgICAgQCR3cmFwcGVyXG4gICAgICAgIC5jc3NcbiAgICAgICAgICB0b3A6IC1Ac2Nyb2xsUG9zaXRpb25cbiAgICAgICAgICBoZWlnaHQ6IEBzY3JvbGxQb3NpdGlvbiArIEB3aW5kb3dIZWlnaHRcblxuICAgICAgQCRodG1sXG4gICAgICAgIC5hZGQgQCRib2R5XG4gICAgICAgIC5hZGRDbGFzcyBASElEREVOX0NMQVNTXG5cbiAgICBlbHNlIGlmIEBpc1dpbmRvd3NcbiAgICAgIGlmIEBpc0Jyb3dzZXIgaXMgJ2ZpcmVmb3gnXG4gICAgICAgIEAkYm9keVxuICAgICAgICAgIC5hZGRDbGFzcyBAU0NST0xMX1lfQ0xBU1MgKyAnICcgKyBARklYRURfQ0xBU1NcbiAgICAgICAgICAud2lkdGggJzEwMCUnXG5cbiAgICAgIGVsc2VcbiAgICAgICAgQCRib2R5XG4gICAgICAgICAgLmFkZENsYXNzIEBTQ1JPTExfWV9DTEFTU1xuXG4gICAgICBAJHdyYXBwZXJcbiAgICAgICAgLmNzc1xuICAgICAgICAgIHRvcDogLUBzY3JvbGxQb3NpdGlvblxuICAgICAgICAgIGhlaWdodDogQHNjcm9sbFBvc2l0aW9uICsgQHdpbmRvd0hlaWdodFxuXG4gICAgZWxzZVxuICAgICAgQCRib2R5LndpZHRoIEAkYm9keS53aWR0aCgpXG4gICAgICBAJGJvZHkuYWRkQ2xhc3MgQEhJRERFTl9DTEFTU1xuXG4gIHJlbW92ZVNjcm9sbFBvc2l0aW9uOiAtPlxuICAgIGlmIEBpc2lPU1xuICAgICAgQCR3cmFwcGVyLnJlbW92ZUF0dHIgQFNUWUxFX0FUVFJfTkFNRVxuXG4gICAgICBAJGh0bWxcbiAgICAgICAgLmFkZCBAJGJvZHlcbiAgICAgICAgLnJlbW92ZUNsYXNzIEBISURERU5fQ0xBU1NcbiAgICAgICAgLnNjcm9sbFRvcCBAc2Nyb2xsUG9zaXRpb25cblxuICAgIGVsc2UgaWYgQGlzV2luZG93c1xuICAgICAgaWYgQGlzQnJvd3NlciBpcyAnZmlyZWZveCdcbiAgICAgICAgQCRib2R5XG4gICAgICAgIC5yZW1vdmVDbGFzcyBAU0NST0xMX1lfQ0xBU1MgKyAnICcgKyBARklYRURfQ0xBU1NcbiAgICAgICAgLndpZHRoICcnXG5cbiAgICAgIGVsc2VcbiAgICAgICAgQCRib2R5XG4gICAgICAgICAgLnJlbW92ZUNsYXNzIEBTQ1JPTExfWV9DTEFTU1xuXG4gICAgICBAJHdyYXBwZXIucmVtb3ZlQXR0ciBAU1RZTEVfQVRUUl9OQU1FXG5cbiAgICAgIEAkaHRtbFxuICAgICAgICAuYWRkIEAkYm9keVxuICAgICAgICAuc2Nyb2xsVG9wIEBzY3JvbGxQb3NpdGlvblxuXG4gICAgZWxzZVxuICAgICAgQCRib2R5LndpZHRoICcnXG4gICAgICBAJGJvZHkucmVtb3ZlQ2xhc3MgQEhJRERFTl9DTEFTU1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYXdlck1lbnVcbiIsIkRyYXdlck1lbnUgPSByZXF1aXJlICcuL2RyYXdlci1tZW51J1xuU3VwcG9ydCA9IHJlcXVpcmUgJy4vLi4vdXRpbGl0eS9zdXBwb3J0J1xuXG5jbGFzcyBMYXp5TGluayBleHRlbmRzIERyYXdlck1lbnVcbiAgVklTSUJMRV9DTEFTUzogJ2lzLXZpc2libGUnXG4gIERVUkFUSU9OOiAzMDBcblxuICAkd3JhcHBlcjogJCAnI2pzaS1sYXp5LWxpbmsnXG4gICR0cmlnZ2VyOiBAOjokd3JhcHBlci5maW5kICdhJ1xuICAkdGFyZ2V0OiAkICcuanNjLWxhenktbGluay10YXJnZXQnXG5cbiAgZmxnID0gZmFsc2VcblxuICBjb25zdHJ1Y3RvcjogKCkgLT5cbiAgICBAZXh0ZW5kIG5ldyBTdXBwb3J0KClcbiAgICBAZXZlbnQgPSBAaXNFdmVudCgpXG5cbiAgICBAYXR0YWNoRXZlbnQoKVxuXG4gIGF0dGFjaEV2ZW50OiAtPlxuICAgIEAkdHJpZ2dlci5vbiBAZXZlbnQsIChlKSA9PlxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIEBnZXRVUkwoZS5jdXJyZW50VGFyZ2V0KVxuICAgICAgQGNsb3NlU2xpZGUoKVxuICAgICAgQGludmVydEZsZygpXG5cbiAgICBAJHRhcmdldENvbnRlbnRzLm9uICd3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCA9PlxuICAgICAgaWYgQGZsZ1xuICAgICAgICBAZmFkZU91dCgpXG4gICAgICAgIEB0b0xpbmsoKVxuXG4gICAgQCR3aW5kb3cub24gJ2xvYWQnLCA9PlxuICAgICAgQGZhZGVJbigpXG5cbiAgaW52ZXJ0RmxnOiAtPlxuICAgIEBmbGcgPSBub3QgQGZsZ1xuXG4gIGdldFVSTDogKHRhcmdldCkgLT5cbiAgICBAVVJMID0gJCh0YXJnZXQpLmF0dHIoJ2hyZWYnKVxuXG4gIHRvTGluazogLT5cbiAgICBzZXRUaW1lb3V0ID0+XG4gICAgICBsb2NhdGlvbi5ocmVmID0gQFVSTFxuICAgICwgQERVUkFUSU9OXG5cbiAgZmFkZU91dDogLT5cbiAgICBAJHRhcmdldC5yZW1vdmVDbGFzcyBAVklTSUJMRV9DTEFTU1xuXG4gIGZhZGVJbjogLT5cbiAgICBzZXRUaW1lb3V0ID0+XG4gICAgICBAJHRhcmdldC5hZGRDbGFzcyBAVklTSUJMRV9DTEFTU1xuICAgICwgMFxuXG5tb2R1bGUuZXhwb3J0cyA9IExhenlMaW5rXG4iLCJTdXBwb3J0ID0gcmVxdWlyZSAnLi8uLi91dGlsaXR5L3N1cHBvcnQnXG5cbmNsYXNzIE1vZGFsIGV4dGVuZHMgU3VwcG9ydFxuICBWSVNJQkxFX0NMQVNTOiAnaXMtdmlzaWJsZSdcbiAgSElEREVOX0NMQVNTOiAnanNjLWRuLWknXG4gIEVSUk9SX01FU1NBR0U6ICfjgrPjg7Pjg4bjg7Pjg4Tjga7oqq3jgb/ovrzjgb/jgavlpLHmlZfjgZfjgb7jgZfjgZ/jgILjg5bjg6njgqbjgrbjga7jg6rjg63jg7zjg4njg5zjgr/jg7PjgpLmirzjgZfjgablho3oqq3jgb/ovrzjgb/jgZfjgabjgY/jgaDjgZXjgYTjgIInXG5cbiAgJHdpbmRvdzogJCB3aW5kb3dcbiAgJGRvY21lbnQ6ICQgZG9jdW1lbnRcbiAgJGh0bWw6ICQgJ2h0bWwnXG4gICRib2R5OiAkICdib2R5J1xuICAkd3JhcHBlcjogJCAnLmpzYy1tb2RhbCdcbiAgJHRyaWdnZXI6IEA6OiR3cmFwcGVyLmZpbmQgJ2EnXG4gICRoaWRlVGFyZ2V0OiAkICcuanNjLW1vZGFsLWhpZGUtdGFyZ2V0J1xuICAkbG9hZGluZzogJCAnI2pzaS1tb2RhbC1sb2FkaW5nJ1xuXG4gIGZsZzogZmFsc2VcblxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAZXZlbnQgPSBAaXNFdmVudCgpXG4gICAgQGF0dGFjaEV2ZW50KClcblxuICBhdHRhY2hFdmVudDogLT5cbiAgICBAJHRyaWdnZXIub24gJ2NsaWNrJywgKGUpID0+XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgQGdldFdpbmRvd1dpZHRoKClcbiAgICAgIEBnZXRXaW5kb3dIZWlnaHQoKVxuICAgICAgQGdldFNjcm9sbFBvc2l0aW9uKClcbiAgICAgIEBnZXRIVE1MKGUuY3VycmVudFRhcmdldClcbiAgICAgICAgLmRvbmUgKGRhdGEpID0+XG4gICAgICAgICAgQGhpZGVMb2FkaW5nKClcbiAgICAgICAgICBAaW5zZXJ0SFRNTChkYXRhKVxuICAgICAgICAgIEBhZGp1c3RUYXJnZXRTaXplKClcbiAgICAgICAgICBAYWRqdXN0SW1ndE1hc2tIZWlnaHQoKVxuICAgICAgICAgIEBoaWRlQ29udGFpbmVyKClcbiAgICAgICAgICBAY2hhbmdlSGFzaCgpXG4gICAgICAgIC5mYWlsID0+XG4gICAgICAgICAgQGhpZGVMb2FkaW5nKClcbiAgICAgICAgICBAc2V0RXJyb3JNZXNzYWdlKClcbiAgICAgICAgICBAaW52ZXJ0RmxnKClcblxuICAgICAgQGludmVydEZsZygpXG5cbiAgICBAJGhpZGVUYXJnZXQub24gJ3dlYmtpdFRyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsID0+XG4gICAgICBpZiBAZmxnXG4gICAgICAgIEBzaG93VGFyZ2V0KClcbiAgICAgICAgQGludmVydEZsZygpXG5cbiAgICBAJGJvZHkub24gJ3dlYmtpdFRyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsICcjanNpLW1vZGFsLXRhcmdldCcsID0+XG4gICAgICBpZiBAZmxnXG4gICAgICAgIEBzaG93Q29udGFpbmVyKClcbiAgICAgICAgQHJlbW92ZUhUTUwoKVxuICAgICAgICBAYWRqdXN0U2Nyb2xsUG9zaXRpb24oKVxuICAgICAgICBAaW52ZXJ0RmxnKClcblxuICAgIC5vbiBAZXZlbnQsICcjanNpLW1vZGFsLXByZXYtYnRuJywgPT5cbiAgICAgIEBoaWRlVGFyZ2V0KClcbiAgICAgIEBpbnZlcnRGbGcoKVxuXG4gICAgLm9uIEBldmVudCwgJyNqc2ktbW9kYWwtY2hhbmdlLWltZy10cmlnZ2VyIGxpJywgKGUpID0+XG4gICAgICBAY2hhbmdlSW1nKGUuY3VycmVudFRhcmdldClcblxuICAgIEAkd2luZG93Lm9uICdyZXNpemUnLCA9PlxuICAgICAgQGdldFdpbmRvd1dpZHRoKClcbiAgICAgIEBnZXRXaW5kb3dIZWlnaHQoKVxuICAgICAgQGFkanVzdFRhcmdldFNpemUoKVxuICAgICAgQGFkanVzdEltZ3RNYXNrSGVpZ2h0KClcblxuICAgIC5vbiAnaGFzaGNoYW5nZScsID0+XG4gICAgICBpZiBAJGhpZGVUYXJnZXQuaXMgJzpoaWRkZW4nXG4gICAgICAgIEBoaWRlVGFyZ2V0KClcbiAgICAgICAgQHNob3dDb250YWluZXIoKVxuICAgICAgICBAcmVtb3ZlSFRNTCgpXG4gICAgICAgIEBhZGp1c3RTY3JvbGxQb3NpdGlvbigpXG5cbiAgaW52ZXJ0RmxnOiAtPlxuICAgIEBmbGcgPSBub3QgQGZsZ1xuXG4gIGdldEhUTUw6ICh0cmlnZ2VyKSAtPlxuICAgIEBkZmQgPSAkLkRlZmVycmVkKClcbiAgICBAVVJMID0gJCh0cmlnZ2VyKS5hdHRyICdocmVmJ1xuXG4gICAgQHNob3dMb2FkaW5nKClcblxuICAgICQuYWpheFxuICAgICAgdXJsOiBAVVJMXG4gICAgICB0eXBlOiAnR0VUJ1xuICAgICAgZGF0YVR5cGU6ICdodG1sJ1xuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICB0aW1lb3V0OiAxMDAwMFxuICAgIC5kb25lIChkYXRhKSA9PlxuICAgICAgQGRmZC5yZXNvbHZlKGRhdGEpXG4gICAgLmZhaWwgPT5cbiAgICAgIEBkZmQucmVqZWN0KClcblxuICAgIEBkZmQucHJvbWlzZSgpXG5cbiAgaW5zZXJ0SFRNTDogKGRhdGEpIC0+XG4gICAgQCRib2R5LmFwcGVuZCBkYXRhXG5cbiAgcmVtb3ZlSFRNTDogLT5cbiAgICAkKCcjanNpLW1vZGFsLXRhcmdldCcpLnJlbW92ZSgpXG5cbiAgc2hvd1RhcmdldDogLT5cbiAgICAkKCcjanNpLW1vZGFsLXRhcmdldCcpLmFkZENsYXNzIEBWSVNJQkxFX0NMQVNTXG4gICAgQCRoaWRlVGFyZ2V0LmFkZENsYXNzIEBISURERU5fQ0xBU1NcbiAgICBAJHdpbmRvdy5zY3JvbGxUb3AgMFxuXG4gIGhpZGVUYXJnZXQ6IC0+XG4gICAgJCgnI2pzaS1tb2RhbC10YXJnZXQnKS5yZW1vdmVDbGFzcyBAVklTSUJMRV9DTEFTU1xuICAgIEAkaGlkZVRhcmdldC5yZW1vdmVDbGFzcyBASElEREVOX0NMQVNTXG5cbiAgc2hvd0NvbnRhaW5lcjogLT5cbiAgICBAJGhpZGVUYXJnZXQuYWRkQ2xhc3MgQFZJU0lCTEVfQ0xBU1NcblxuICBoaWRlQ29udGFpbmVyOiAtPlxuICAgIEAkaGlkZVRhcmdldC5yZW1vdmVDbGFzcyBAVklTSUJMRV9DTEFTU1xuXG4gIGdldFdpbmRvd1dpZHRoOiAtPlxuICAgIEB3aW5kb3dXaWR0aCA9IEAkd2luZG93LndpZHRoKClcblxuICBnZXRXaW5kb3dIZWlnaHQ6IC0+XG4gICAgQHdpbmRvd0hlaWdodCA9IEAkd2luZG93LmhlaWdodCgpXG5cbiAgYWRqdXN0VGFyZ2V0U2l6ZTogLT5cbiAgICAkKCcjanNpLW1vZGFsLXRhcmdldCcpLmNzc1xuICAgICAgd2lkdGg6IEB3aW5kb3dXaWR0aFxuXG4gIHNob3dMb2FkaW5nOiAtPlxuICAgIEAkbG9hZGluZ1xuICAgICAgLnJlbW92ZUNsYXNzIEBISURERU5fQ0xBU1NcbiAgICAgIC5jc3NcbiAgICAgICAgdG9wOiBAd2luZG93SGVpZ2h0IC8gMiAgKyBAJGRvY21lbnQuc2Nyb2xsVG9wKClcblxuICBoaWRlTG9hZGluZzogLT5cbiAgICBAJGxvYWRpbmcuYWRkQ2xhc3MgQEhJRERFTl9DTEFTU1xuXG4gIHNldEVycm9yTWVzc2FnZTogLT5cbiAgICBhbGVydCBARVJST1JfTUVTU0FHRVxuXG4gIGdldFNjcm9sbFBvc2l0aW9uOiAtPlxuICAgIEBzY3JvbGxQb3NpdGlvbiA9IEAkd2luZG93LnNjcm9sbFRvcCgpXG5cbiAgYWRqdXN0U2Nyb2xsUG9zaXRpb246IC0+XG4gICAgQCRodG1sXG4gICAgICAuYWRkKEAkYm9keSlcbiAgICAgIC5zY3JvbGxUb3AgQHNjcm9sbFBvc2l0aW9uXG5cbiAgY2hhbmdlSW1nOiAodHJpZ2dlcikgLT5cbiAgICAkKCcjanNpLW1vZGFsLWNoYW5nZS1pbWctdGFyZ2V0JylcbiAgICAgIC5maW5kICdsaSdcbiAgICAgIC5yZW1vdmVDbGFzcyBAVklTSUJMRV9DTEFTU1xuICAgICAgLmVxICQodHJpZ2dlcikuaW5kZXgoKVxuICAgICAgLmFkZENsYXNzIEBWSVNJQkxFX0NMQVNTXG5cbiAgYWRqdXN0SW1ndE1hc2tIZWlnaHQ6IC0+XG4gICAgQHRhcmdldFBUID0gcGFyc2VJbnQoJCgnI2pzaS1tb2RhbC10YXJnZXQnKS5jc3MgJ3BhZGRpbmctdG9wJylcbiAgICBAdGFyZ2V0UEIgPSBwYXJzZUludCgkKCcjanNpLW1vZGFsLXRhcmdldCcpLmNzcyAncGFkZGluZy1ib3R0b20nKVxuICAgIEBtYXNrQlQgPSBwYXJzZUludCgkKCcjanNpLW1vZGFsLWNoYW5nZS1pbWctdGFyZ2V0JykuY3NzICdib3JkZXItdG9wLXdpZHRoJylcbiAgICBAbWFza0JCID0gcGFyc2VJbnQoJCgnI2pzaS1tb2RhbC1jaGFuZ2UtaW1nLXRhcmdldCcpLmNzcyAnYm9yZGVyLWJvdHRvbS13aWR0aCcpXG5cbiAgICAkKCcjanNpLW1vZGFsLWNoYW5nZS1pbWctdGFyZ2V0JylcbiAgICAgIC5oZWlnaHQgQHdpbmRvd0hlaWdodCAtIChAdGFyZ2V0UFQgKyBAdGFyZ2V0UEIgKyBAbWFza0JUICsgQG1hc2tCQilcblxuICBjaGFuZ2VIYXNoOiAtPlxuICAgIGxvY2F0aW9uLmhhc2ggPSBAVVJMLnJlcGxhY2UoLy4rXFwvKC4rKVxcLmh0bWwvZywgJyQxJylcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFxuIiwiU3VwcG9ydCA9IHJlcXVpcmUgJy4vLi4vdXRpbGl0eS9zdXBwb3J0J1xuXG5jbGFzcyBTbW9vdGhTY3JvbGwgZXh0ZW5kcyBTdXBwb3J0XG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBEVVJBVElPTiA9IDgwMFxuICAgIEBFQVNJTkcgPSAnc3dpbmcnXG5cbiAgICBAJHRhcmdldCA9ICQgJ2h0bWwsIGJvZHknXG4gICAgQCR0cmlnZ2VyID0gJCAnI2pzaS1zbW9vdGgtc2Nyb2xsJ1xuXG4gICAgQGV2ZW50ID0gQGlzRXZlbnQoKVxuICAgIEBhdHRhY2hFdmVudCgpXG5cbiAgYXR0YWNoRXZlbnQ6IC0+XG4gICAgQCR0cmlnZ2VyLm9uIEBldmVudCwgPT5cbiAgICAgIEBzY3JvbGxUb3AoKVxuXG4gIHNjcm9sbFRvcDogLT5cbiAgICBAJHRhcmdldC5hbmltYXRlXG4gICAgICBzY3JvbGxUb3A6IDBcbiAgICAsQERVUkFUSU9OLCBARUFTSU5HXG5cbm1vZHVsZS5leHBvcnRzID0gU21vb3RoU2Nyb2xsIiwiY2xhc3MgSW5oZXJpdGFuY2VcbiAgbW9kdWxlS2V5d29yZHMgPSBbJ2V4dGVuZGVkJywgJ2luY2x1ZGVkJ11cblxuICBleHRlbmQ6IChvYmopIC0+XG4gICAgZm9yIGtleSwgdmFsdWUgb2Ygb2JqIHdoZW4ga2V5IG5vdCBpbiBtb2R1bGVLZXl3b3Jkc1xuICAgICAgQFtrZXldID0gdmFsdWVcblxuICAgIG9iai5leHRlbmRlZD8uYXBwbHkoQClcbiAgICB0aGlzXG5cbiAgaW5jbHVkZTogKG9iaikgLT5cbiAgICBmb3Iga2V5LCB2YWx1ZSBvZiBvYmogd2hlbiBrZXkgbm90IGluIG1vZHVsZUtleXdvcmRzXG4gICAgICBAOjpba2V5XSA9IHZhbHVlXG5cbiAgICBvYmouaW5jbHVkZWQ/LmFwcGx5KEApXG4gICAgdGhpc1xuXG5tb2R1bGUuZXhwb3J0cyA9IEluaGVyaXRhbmNlIiwiY2xhc3MgU3VwcG9ydFxuICB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpXG4gIGJyb3dzZXIgPSBudWxsXG5cbiAgaXNXaW5kb3dzOiAtPlxuICAgIHVzZXJBZ2VudC5pbmRleE9mKCd3aW4nKSBpc250IC0xXG5cbiAgaXNNYWM6IC0+XG4gICAgdXNlckFnZW50LmluZGV4T2YoJ21hYycpIGlzbnQgLTFcblxuICBpc2lQaG9uZTogLT5cbiAgICB1c2VyQWdlbnQuaW5kZXhPZignaXBob25lJykgaXNudCAtMVxuXG4gIGlzaVBhZDogLT5cbiAgICB1c2VyQWdlbnQuaW5kZXhPZignaXBhZCcpIGlzbnQgLTFcblxuICBpc2lPUzogLT5cbiAgICBAaXNpUGhvbmUoKSBvciBAaXNpUGFkKClcblxuICBpc0Jyb3dzZXI6IC0+XG4gICAgaWYgdXNlckFnZW50LmluZGV4T2YoJ3RyaWRlbnQvNycpIGlzbnQgLTFcbiAgICAgIGJyb3dzZXIgPSAnaWUxMSdcbiAgICBlbHNlIGlmIHVzZXJBZ2VudC5pbmRleE9mKCdjaHJvbWUnKSBpc250IC0xXG4gICAgICBicm93c2VyID0gJ2Nocm9tZSdcbiAgICBlbHNlIGlmIHVzZXJBZ2VudC5pbmRleE9mKCdzYWZhcmknKSBpc250IC0xXG4gICAgICBicm93c2VyID0gJ3NhZmFyaSdcbiAgICBlbHNlIGlmIHVzZXJBZ2VudC5pbmRleE9mKCdmaXJlZm94JykgaXNudCAtMVxuICAgICAgYnJvd3NlciA9ICdmaXJlZm94J1xuXG4gIGlzRXZlbnQ6IC0+XG4gICAgZXZlbnQgPSBgJ29udG91Y2hzdGFydCcgaW4gd2luZG93ID8gJ3RvdWNoZW5kJzogJ2NsaWNrJ2BcblxubW9kdWxlLmV4cG9ydHMgPSBTdXBwb3J0Il19