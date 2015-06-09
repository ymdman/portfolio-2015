Support = require './../utility/support'

class Modal extends Support
  VISIBLE_CLASS: 'is-visible'
  HIDDEN_CLASS: 'jsc-dn-i'
  ERROR_MESSAGE: 'コンテンツの読み込みに失敗しました。ブラウザのリロードボタンを押して再読み込みしてください。'

  $window: $ window
  $docment: $ document
  $html: $ 'html'
  $body: $ 'body'
  $wrapper: $ '.jsc-modal'
  $trigger: @::$wrapper.find 'a'
  $hideTarget: $ '.jsc-modal-hide-target'
  $loading: $ '#jsi-modal-loading'

  flg: false

  constructor: ->
    @event = @isEvent()
    @attachEvent()

  attachEvent: ->
    @$trigger.on 'click', (e) =>
      e.preventDefault()

      @getWindowWidth()
      @getWindowHeight()
      @getScrollPosition()
      @getHTML(e.currentTarget)
        .done (data) =>
          @hideLoading()
          @insertHTML(data)
          @adjustTargetSize()
          @adjustImgtMaskHeight()
          @hideContainer()
          @changeHash()
        .fail =>
          @hideLoading()
          @setErrorMessage()
          @invertFlg()

      @invertFlg()

    @$hideTarget.on 'webkitTransitionEnd transitionend', =>
      if @flg
        @showTarget()
        @invertFlg()

    @$body.on 'webkitTransitionEnd transitionend', '#jsi-modal-target', =>
      if @flg
        @showContainer()
        @removeHTML()
        @adjustScrollPosition()
        @invertFlg()

    .on @event, '#jsi-modal-prev-btn', =>
      @hideTarget()
      @invertFlg()

    .on @event, '#jsi-modal-change-img-trigger li', (e) =>
      @changeImg(e.currentTarget)

    @$window.on 'resize', =>
      @getWindowWidth()
      @getWindowHeight()
      @adjustTargetSize()
      @adjustImgtMaskHeight()

    .on 'hashchange', =>
      if @$hideTarget.is ':hidden'
        @hideTarget()
        @showContainer()
        @removeHTML()
        @adjustScrollPosition()

  invertFlg: ->
    @flg = not @flg

  getHTML: (trigger) ->
    @dfd = $.Deferred()
    @URL = $(trigger).attr 'href'

    @showLoading()

    $.ajax
      url: @URL
      type: 'GET'
      dataType: 'html'
      cache: false
      timeout: 10000
    .done (data) =>
      @dfd.resolve(data)
    .fail =>
      @dfd.reject()

    @dfd.promise()

  insertHTML: (data) ->
    @$body.append data

  removeHTML: ->
    $('#jsi-modal-target').remove()

  showTarget: ->
    $('#jsi-modal-target').addClass @VISIBLE_CLASS
    @$hideTarget.addClass @HIDDEN_CLASS
    @$window.scrollTop 0

  hideTarget: ->
    $('#jsi-modal-target').removeClass @VISIBLE_CLASS
    @$hideTarget.removeClass @HIDDEN_CLASS

  showContainer: ->
    @$hideTarget.addClass @VISIBLE_CLASS

  hideContainer: ->
    @$hideTarget.removeClass @VISIBLE_CLASS

  getWindowWidth: ->
    @windowWidth = @$window.width()

  getWindowHeight: ->
    @windowHeight = @$window.height()

  adjustTargetSize: ->
    $('#jsi-modal-target').css
      width: @windowWidth

  showLoading: ->
    @$loading
      .removeClass @HIDDEN_CLASS
      .css
        top: @windowHeight / 2  + @$docment.scrollTop()

  hideLoading: ->
    @$loading.addClass @HIDDEN_CLASS

  setErrorMessage: ->
    alert @ERROR_MESSAGE

  getScrollPosition: ->
    @scrollPosition = @$window.scrollTop()

  adjustScrollPosition: ->
    @$html
      .add(@$body)
      .scrollTop @scrollPosition

  changeImg: (trigger) ->
    $('#jsi-modal-change-img-target')
      .find 'li'
      .removeClass @VISIBLE_CLASS
      .eq $(trigger).index()
      .addClass @VISIBLE_CLASS

  adjustImgtMaskHeight: ->
    @targetPT = parseInt($('#jsi-modal-target').css 'padding-top')
    @targetPB = parseInt($('#jsi-modal-target').css 'padding-bottom')
    @maskBT = parseInt($('#jsi-modal-change-img-target').css 'border-top-width')
    @maskBB = parseInt($('#jsi-modal-change-img-target').css 'border-bottom-width')

    $('#jsi-modal-change-img-target')
      .height @windowHeight - (@targetPT + @targetPB + @maskBT + @maskBB)

  changeHash: ->
    location.hash = @URL.replace(/.+\/(.+)\.html/g, '$1')

module.exports = Modal
