import swing from './swing'

if ($('#form-comment').length) {
  $('.required').bind('input blur cut copy paste keypress', updateSubmittability)
  updateSubmittability()
  $('#form-comment').show()
}

$('#form-comment').submit(function (e) {
  var $gips = $('.e2-gips')
  const name = $('#name')
  const email = $('#email')
  const mailMask = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i
  const cookieName = $(this).data('cookie')
  const cookieValue = $(this).data('cookie-value')

  setNospamCookie(cookieName, cookieValue)

  if (!$gips.length || !$gips.is(':visible') || !$gips.hasClass('required')) {
    return true
  } else if ($gips.hasClass('required') && name.val() && mailMask.test(email.val())) {
    return true
  }

  swing($gips[0])

  return false
})

$('.e2-email-fields-revealer').click(function (e) {
  e.preventDefault()

  $('.e2-email-fields').show()
  updateSubmittability()
  $(this).hide()
})

$('.e2-gips a.e2-gip-link').click(function (e) {
  e.preventDefault()
  let href = $(this).attr('href')
  let windowSizeAndPosition = getWindowSizeAndPosition()
  const popupWidth = 600
  const popupHeight = 600
  let popupLeft = windowSizeAndPosition.left + (windowSizeAndPosition.width / 2) - (popupWidth / 2)
  let popupTop = windowSizeAndPosition.top + (windowSizeAndPosition.height / 2) - (popupHeight / 2)
  if (popupLeft < 0) popupLeft = 50
  if (popupTop < 0) popupTop = 50
  window.open(href, 'gips', 'left=' + popupLeft + ',top=' + popupTop + ',width=' + popupWidth + ',height=' + popupHeight + ',centerscreen')
})

function getWindowSizeAndPosition () {
  let myWidth = 0
  let myHeight = 0
  let myTop = 0
  let myLeft = 0
  if (typeof (window.innerWidth) === 'number') {
    /* Non-IE */
    myWidth = window.innerWidth
    myHeight = window.innerHeight
    myTop = window.screenY
    myLeft = window.screenX
  } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
    /* IE 6+ in 'standards compliant mode' */
    myWidth = document.documentElement.clientWidth
    myHeight = document.documentElement.clientHeight
    myTop = window.screenTop
    myLeft = window.screenLeft
  } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
    /* IE 4 compatible */
    myWidth = document.body.clientWidth
    myHeight = document.body.clientHeight
    myTop = window.screenTop
    myLeft = window.screenLeft
  }
  let WindowSizeAndPosition = {}
  WindowSizeAndPosition.width = myWidth
  WindowSizeAndPosition.height = myHeight
  WindowSizeAndPosition.top = myTop
  WindowSizeAndPosition.left = myLeft
  return (WindowSizeAndPosition)
}

function updateSubmittability () {
  const mailMask = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i

  const name = $('#name')
  const email = $('#email')
  const gips = $('.e2-gips')

  var shouldBeEnabled = true
  var emailCommentsReqired = gips.hasClass('required')

  if (name.length && emailCommentsReqired && !name.val()) {
    shouldBeEnabled = false
  }

  if (email.length && emailCommentsReqired && !mailMask.test(email.val())) {
    shouldBeEnabled = false
  }

  shouldBeEnabled = shouldBeEnabled && $('#text').val()

  if (shouldBeEnabled) {
    $('#submit-button').removeAttr('disabled')
  } else {
    $('#submit-button').attr('disabled', 'disabled')
  }
}

function setNospamCookie (cookieName, cookieValue) {
  const d = new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000)
  document.cookie = cookieName + '=' + cookieValue + ';path=/;expires=' + d.toUTCString()
}

window.oauthAuthorized = function (data) { // eslint-disable-line no-unused-vars
  $('.e2-hide-on-login').hide()
  $('.e2-gips').removeClass('required')

  $('.e2-gip-info')
    .find('.name').text(data.name).end()
    .find('.e2-gip-icon').html(data.gipIcon).end()
    .find('.e2-gip-logout-url').attr('href', data.logoutUrl).end()
    .show()
  updateSubmittability()
}
