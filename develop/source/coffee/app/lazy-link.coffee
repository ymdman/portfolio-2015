DrawerMenu = require './drawer-menu'
Support = require './../utility/support'

class LazyLink extends DrawerMenu
  VISIBLE_CLASS: 'is-visible'
  DURATION: 300

  $wrapper: $ '#jsi-lazy-link'
  $trigger: @::$wrapper.find 'a'
  $target: $ '.jsc-lazy-link-target'

  flg = false

  constructor: () ->
    @extend new Support()
    @event = @isEvent()

    @attachEvent()

  attachEvent: ->
    @$trigger.on @event, (e) =>
      e.preventDefault()

      @getURL(e.currentTarget)
      @closeSlide()
      @invertFlg()

    @$targetContents.on 'webkitTransitionEnd transitionend', =>
      if @flg
        @fadeOut()
        @toLink()

    @$window.on 'load', =>
      @fadeIn()

  invertFlg: ->
    @flg = not @flg

  getURL: (target) ->
    @URL = $(target).attr('href')

  toLink: ->
    setTimeout =>
      location.href = @URL
    , @DURATION

  fadeOut: ->
    @$target.removeClass @VISIBLE_CLASS

  fadeIn: ->
    setTimeout =>
      @$target.addClass @VISIBLE_CLASS
    , 0

module.exports = LazyLink
