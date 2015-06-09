Support = require './../utility/support'

class SmoothScroll extends Support
  constructor: ->
    @DURATION = 800
    @EASING = 'swing'

    @$target = $ 'html, body'
    @$trigger = $ '#jsi-smooth-scroll'

    @event = @isEvent()
    @attachEvent()

  attachEvent: ->
    @$trigger.on @event, =>
      @scrollTop()

  scrollTop: ->
    @$target.animate
      scrollTop: 0
    ,@DURATION, @EASING

module.exports = SmoothScroll