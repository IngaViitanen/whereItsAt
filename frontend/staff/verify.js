const logoutBtn = document.querySelector('#logoutBtn')
const ticketIdInput = document.querySelector('#ticketId')
const verifyBtn = document.querySelector('#verifyBtn')
const statusPara = document.querySelector('#statusPara')

function getToken() {
  return sessionStorage.getItem('auth')
}

async function isLoggedIn() {
  const token = getToken()
    const response = await fetch('http://localhost:8000/api/auth/loggedIn', {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    const data = await response.json()

    if (!data.loggedIn) {
      location.href = 'staff.html'
    }
}

verifyBtn.addEventListener('click', async () => {
  const ticketId = ticketIdInput.value

  const response =  fetch(`http://localhost:8000/api/ticket/${ticketId}`,{
    method: 'PUT'
  }).then(function(response) {
    return response.json()
  }).then(function(data) {
    if(data.status == "success")
      alert('Ticket number '+ticketId+' was successfully verified')
    else
      alert("Error: "+data.message)
  })
})

logoutBtn.addEventListener('click', async () => {
  sessionStorage.removeItem('auth')
  location.href = 'staff.html'
})

isLoggedIn()