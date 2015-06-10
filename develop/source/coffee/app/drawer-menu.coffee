Inheritance = require './../utility/inheritance'
Support = require './../utility/support'

class DrawerMenu extends Inheritance
  OPEN_CLASS: 'is-open'
  FIXED_CLASS: 'jsc-pf-i'
  OVERFLOW_CLASS: 'jsc-ofy-i'
  STYLE_ATTR_NAME: 'style'

  $window: $ window
  $html: $ 'html'
  $body: $ 'body'
  $wrapper: $ '#jsi-drawer-menu'
  $trigger: $ '#jsi-drawer-menu-trigger'
  $targetContents: $ '#jsi-drawer-menu-contents-target'
  $targetNav: $ '#jsi-drawer-menu-nav-target'
  $ovarLay: $ '#jsi-drawer-menu-overlay'
  $tagetAll: $ [@::$trigger[0], @::$targetContents[0], @::$targetNav[0], @::$ovarLay[0]]

  flg: false

  constructor: ->
    @extend new Support()
    @isiOS = @isiOS()
    @isWindows = @isWindows()
    @isBrowser = @isBrowser()
    @event = @isEvent()

    @attachEvent()

  attachEvent: ->
    @$trigger.on @event, =>
      unless @flg
        @toggleSlide()
        @getWindowHeight()
        @adjustScrollPosition()
        @invertFlg()

    @$ovarLay.on @event, =>
      unless @flg
        @removeScrollPosition()
        @closeSlide()
        @invertFlg()

    @$targetContents.on 'webkitTransitionEnd transitionend', (e) =>
      if e.originalEvent.propertyName is 'transform' or '-webkit-transform'
        @invertFlg()

  invertFlg: ->
    @flg = not @flg

  toggleSlide: ->
    @$tagetAll.toggleClass @OPEN_CLASS

  closeSlide: ->
    @$tagetAll.removeClass @OPEN_CLASS

  getScrollPosition: ->
    @scrollPosition = @$window.scrollTop()

  getWindowHeight: ->
    @windowHeight = @$window.height()

  adjustScrollPosition: ->
    if @$targetContents.hasClass @OPEN_CLASS
      @getScrollPosition()
      @addScrollPosition()

    else
      @removeScrollPosition()

  addScrollPosition: ->
    if @isiOS
      @$wrapper
        .css
          top: -@scrollPosition
          height: @scrollPosition + @windowHeight

      @$html
        .add @$body
        .addClass @FIXED_CLASS

    else if @isWindows
      if @isBrowser is 'firefox'
        @$body
          .addClass @OVERFLOW_CLASS + ' ' + @FIXED_CLASS
      else
        @$body
          .addClass @OVERFLOW_CLASS

      @$wrapper
        .css
          top: -@scrollPosition
          height: @scrollPosition + @windowHeight

    else
      @$body.width @$body.width()
      @$body.addClass @FIXED_CLASS

  removeScrollPosition: ->
    if @isiOS
      @$wrapper.removeAttr @STYLE_ATTR_NAME

      @$html
        .add @$body
        .removeClass @FIXED_CLASS
        .scrollTop @scrollPosition

    else if @isWindows
      @$body
        .removeClass @OVERFLOW_CLASS + ' ' + @FIXED_CLASS

      @$wrapper.removeAttr @STYLE_ATTR_NAME

      @$html
        .add @$body
        .scrollTop @scrollPosition

    else
      @$body.width ''
      @$body.removeClass @FIXED_CLASS

module.exports = DrawerMenu
