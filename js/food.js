check()

function check() {
  let token = localStorage.getItem('token')
  if (token) {
    $('#started').text('Get Started')
    $('#login').show()
  } else {
    $('#started').text('Sign In')
    $('#login').hide()
  }
}
