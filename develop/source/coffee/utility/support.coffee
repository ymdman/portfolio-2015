class Support
  userAgent = window.navigator.userAgent.toLowerCase()
  browser = null

  isWindows: ->
    userAgent.indexOf('win') isnt -1

  isMac: ->
    userAgent.indexOf('mac') isnt -1

  isiPhone: ->
    userAgent.indexOf('iphone') isnt -1

  isiPad: ->
    userAgent.indexOf('ipad') isnt -1

  isiOS: ->
    @isiPhone() or @isiPad()

  isBrowser: ->
    if userAgent.indexOf('trident/7') isnt -1
      browser = 'ie11'
    else if userAgent.indexOf('chrome') isnt -1
      browser = 'chrome'
    else if userAgent.indexOf('safari') isnt -1
      browser = 'safari'
    else if userAgent.indexOf('firefox') isnt -1
      browser = 'firefox'

  isEvent: ->
    event = `'ontouchstart' in window ? 'touchend': 'click'`

module.exports = Support