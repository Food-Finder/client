// GOOGLE SIGNIN
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  console.log('masokk', id_token)
  $.post('http://localhost:3000/user/login/google', {
    idtoken: id_token
  })
  .done(token => {
    console.log(';asdasdasdasd')
    localStorage.setItem('token', token)
    check()
  })
  .fail(err => {
    console.error(err)
  })
}

// LOGIN
$('#submitLogin').click(function (event) {
  event.preventDefault()
  let email = $('#loginEmail').val()
  let password = $('#loginPassword').val()
  $.post('http://localhost:3000/user/login', {
    email: email,
    password: password
  })
  .done(token => {
    localStorage.setItem('token', token)
    $('#signClose').trigger('click')
    check()
  })
  .fail(err => {
    console.error(err)
  })
})

// LOGOUT
function logout() {
  localStorage.clear()
  check()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

$('#logout').click(function (event) {
  event.preventDefault()
  logout()
})