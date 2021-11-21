
const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const loginBtn = document.querySelector('#loginBtn')


async function login(user, pass) {
  const obj = {
    username: user,
    password: pass
  }

  const response = await fetch('http://localhost:8000/api/auth/', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await response.json();

  return await data;
}


function getToken() {
  return sessionStorage.getItem('auth')
}


async function isLoggedIn() {
  const token = getToken()
  
    const response = await fetch('http://localhost:8000/api/auth/loggedIn', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()

    if (data.loggedIn) {
      location.href = 'verify.html'
    }
}


function saveToken(token) {
  return new Promise((resolve, reject) => {
    sessionStorage.setItem('auth', token)
    resolve('Done')
  })
}



loginBtn.addEventListener('click', async () => {
  const username = usernameInput.value
  const password = passwordInput.value

  const loggedIn = await login(username, password);

  if (loggedIn.success) {
    await saveToken(loggedIn.token);
    window.location.href = 'verify.html'
  }
})

isLoggedIn();