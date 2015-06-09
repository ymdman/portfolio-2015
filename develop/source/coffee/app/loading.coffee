class Loading
  ACTIVE_CLASS: 'is-active'
  DURATION: 300

  $window: $ window
  $targetHeader: $ '#jsi-loading-header'
  $targetBg: $ '#jsi-loading-bg'
  $target: $ '#jsi-loading-title, #jsi-loading-logo, .jsc-loading-icon'

  constructor: ->
    @getWindowSize()
    @setBgPosition()
    @addActiveClass()
    @attachEvent()

  attachEvent: ->
    @$window.on 'resize', =>
      @getWindowSize()
      @setBgPosition()

  getWindowSize: ->
    @windowHeight = @$window.height()
    @windowWidth = @$window.width()

  setBgPosition: ->
    @$targetBg
      .add @$targetHeader
      .height @windowHeight
      .end()
        .width @windowWidth

  addActiveClass: ->
    setTimeout =>
      @$target.addClass @ACTIVE_CLASS
    , @DURATION

module.exports = Loading
