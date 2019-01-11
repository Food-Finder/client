check()

function check() {
  let token = localStorage.getItem('token')
  if (token) {
    $('#login').show()
    $('#signinMethod').hide()
    $('#started').show()
    $('#logout').show()
  } else {
    $('#login').hide()
    $('#signinMethod').show()
    $('#started').hide()
    $('#logout').hide()
  }
}
