window.addEventListener('DOMContentLoaded', function() {
  var date = countdown( new Date(1479493800000) )
  var dateString = date.toString()
  var hours1 = document.getElementById('hours-1')
  var hours2 = document.getElementById('hours-2')
  var days1 = document.getElementById('days-1')
  var days2 = document.getElementById('days-2')
  var minutes1 = document.getElementById('minutes-1')
  var minutes2 = document.getElementById('minutes-2')
  var seconds1 = document.getElementById('seconds-1')
  var seconds2 = document.getElementById('seconds-2')

  setInterval(function() {
    date = countdown( new Date(1479493800000) )
    dateString = date.toString()
    hours1.innerText = toLocaleString(date.hours, 2)[0]
    hours2.innerText = toLocaleString(date.hours, 2)[1]
    days1.innerText = toLocaleString(date.days, 2)[0]
    days2.innerText = toLocaleString(date.days, 2)[1]
    minutes1.innerText = toLocaleString(date.minutes, 2)[0]
    minutes2.innerText = toLocaleString(date.minutes, 2)[1]
    seconds1.innerText = toLocaleString(date.seconds, 2)[0]
    seconds2.innerText = toLocaleString(date.seconds, 2)[1]

  }, 1000)
})

function toLocaleString (val, length) {
  let valString = val + ''
  if (valString.length > length) return valString.slice(0, length)
  if (valString.length === length) return valString
  if (valString.length < length) {
    let diffLength = length - valString.length
    for (i = 1; i <= diffLength; i++) valString = '0' + valString
    return valString
  }
}
