
const artist = document.querySelector('#artist')
const datumOtid = document.querySelector('#dateNtime')
const plats = document.querySelector('#place')
const pris = document.querySelector('#price')
const orderBtn = document.querySelector('#orderBtn')
const ticketsLeft = document.querySelector('#ticketsLeft')
const params = new URLSearchParams(window.location.search);
let id=""

if(params.has('id')){
  id = params.get('id')
}

async function orderEventTicket(id){
  const request = {id}
  const response = await fetch('http://localhost:8000/api/ticket', {
    method: 'POST',
    body: JSON.stringify(request),
    headers:{"Content-Type": "application/json"}
  })
  const data = await response.json()
  console.log(data)
  
  if(data.status === 'false'){
        alert(data.message)
        return
      }else{
        alert(data.message)
        window.location.href = 'ticket.html?ticketId='+data.data.ticketId
        return
      }
  }
  
async function detailsPage(id) {
    const response = await fetch (`http://localhost:8000/api/event/${id}`)
    const data = await response.json()
    console.log('data', data)

    artist.innerHTML = data.data.artist
    datumOtid.innerHTML = data.data.datum + " " + data.data.datum2 + " kl " + data.data.start + "-" + data.data.slut
    plats.innerHTML = "@" + data.data.plats
    pris.innerHTML = data.data.pris
    orderBtn.innerHTML = 'Beställ'
    ticketsLeft.innerHTML = 'Antal biljetter kvar: ' + data.data.antal
}

orderBtn.addEventListener('click', function() {
  orderEventTicket(id)
})


detailsPage(id)

