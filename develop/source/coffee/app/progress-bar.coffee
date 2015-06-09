class ProgressBar
  ACTIVE_CLASS: 'is-active'

  $window: $ window
  $wrapper: $ '#jsi-progress-bar'
  $target: @::$wrapper.find '.jsc-progress-bar-target'

  scrollPosition: 0

  constructor: ->
    @getPosition()
    @getScrollPosition
    @addActiveClass()
    @attachEvent()

  attachEvent: ->
    @$window.on 'scroll', =>
      @getScrollPosition()
      @addActiveClass()

  getScrollPosition: ->
    @scrollPosition = @$window.scrollTop()

  getPosition: ->
    @windowHeight = @$window.height()
    @targetPosition = @$wrapper.offset().top
    @targetHeight = @$wrapper.height()

  addActiveClass: ->
    if @windowHeight + @scrollPosition > @targetPosition + @targetHeight
      setTimeout =>
        @$target.addClass @ACTIVE_CLASS
      , 0

module.exports = ProgressBar