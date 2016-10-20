window.addEventListener('DOMContentLoaded', function() {
  var emailEl = document.getElementById('email')
  var submitEl = document.getElementById('submit-email')
  var valid = 1
  var sent = 0
  emailEl.addEventListener('keydown', function(ev) {
    if (isValidEmail(ev.target.value)) {
      valid = 0
      addClass(ev.target, 'success')
      removeClass(ev.target, 'error')
      removeClass(ev.target, 'fatal-error')
      if (ev.keyCode === 13 && !sent) {
        postEmailToTelegram(ev.target.value).then(function(resp) {
          removeClass(ev.target, 'sent')
          addClass(ev.target, 'completed')
          removeClass(submitEl, 'processing')
          addClass(submitEl, 'done')
        })
        addClass(ev.target, 'sent')
        addClass(submitEl, 'processing')
        sent = 1
        ev.target.disabled = true
      }
    } else {
      if (!valid) addClass(ev.target, 'error')
      removeClass(ev.target, 'success')
      if (ev.keyCode === 13 && !sent) {
        addClass(ev.target, 'fatal-error')
        valid = 0
      }
    }
  })
  submitEl.addEventListener('click', function(ev){
    if (isValidEmail(emailEl.value)) {
      postEmailToTelegram(emailEl.value)
      addClass(ev.target, 'completed')
      removeClass(ev.target, 'success')
      sent = 1
      emailEl.disabled = true
    } else {
      addClass(ev.target, 'error')
      removeClass(ev.target, 'success')
      addClass(ev.target, 'fatal-error')
      valid = 0
    }
  })
})

function isValidEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function addClass (elem, className) {
  if (!hasClass(elem, className)) {
    if (elem.classList) elem.classList.add(className)
    else elem.className += ' ' + className
  }
}

function removeClass (elem, className) {
  if (hasClass(elem, className)) {
    if (elem.classList) elem.classList.remove(className)
    else elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  }
}

function hasClass (elem, className) {
  if (elem.classList) return elem.classList.contains(className)
  else return new RegExp('(^| )' + className + '( |$)', 'gi').test(elem.className)
}

function postEmailToTelegram (email) {
  var messageString = "*Someone just entered their email on your site*\nEmail:\n" + email
  return axios.post('https://api.telegram.org/bot291064949:AAEi_jUm8JKqnWGQstz63S0jmSzWh2xDZmU/sendMessage', {
    chat_id: 82013442,
    text: messageString,
    parse_mode : 'Markdown'
  }).then(function(resp) {
    console.log(resp)
  }).catch(function(error) {
    console.log(error)
  })
}
