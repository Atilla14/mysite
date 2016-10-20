window.addEventListener('DOMContentLoaded', function() {
  axios.get('http://ipinfo.io').then(function(resp) {
    postToTelegram({
      'city': resp.city,
      'country': resp.country,
      'browser': getBrowser(),
      'region': resp.region,
      'screen_dimensions': getScreenDimensions().width + 'px x ' + getScreenDimensions().height + 'px',
      'browser_dimensions': getBrowserDimensions().width + 'px x ' + getBrowserDimensions().height + 'px',
      'referrer': document.referrer ? document.referrer : 'Direct page landing, No referrer'
    })
  })
})

function postToTelegram (payload) {
  var browser = payload.browser ? '\n*Browser:* ' + payload.browser : ''
  var city = payload.city ? '\n*City:* ' + payload.city : ''
  var country = payload.country ? '\n*Country:* ' + payload.country : ''
  var region = payload.region ? '\n*Region:* ' + payload.region : ''
  var dimensions = '\n*Browser-Dimensions:* ' + payload.browser_dimensions + '\n*Screen-Dimensions:* ' + payload.screen_dimensions

  var messageString = '_Someone just landed on your site_\nDetails:\n*Referrer:* ' + payload.referrer + city + region + country + browser + dimensions
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

var getBrowser = function() {

    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

    // Chrome 1+
    var isChrome = !!window.chrome && !isOpera;

    // At least IE6
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    return isOpera ? 'Opera' :
        isFirefox ? 'Firefox' :
        isSafari ? 'Safari' :
        isChrome ? 'Chrome' :
        isIE ? 'IE' :
        isEdge ? 'Edge' :
        "Don't know"
}

function getBrowserDimensions() {
  return {
    width : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}

function getScreenDimensions() {
  return {
    width: window.screen.width,
    height: window.screen.height
  }
}
