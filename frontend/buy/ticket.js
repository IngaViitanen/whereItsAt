const artist = document.querySelector('#artistTicket')
const plats = document.querySelector('#placeTicket')
const date = document.querySelector('#dateTicket')
const start = document.querySelector('#startTicket')
const slut = document.querySelector('#slutTicket')
const barcode = document.querySelector('#barcode')
const biljettnummer = document.querySelector('#ticketNumber')
const params = new URLSearchParams(window.location.search);
let ticketId=""

if(params.has('ticketId')){
  ticketId = params.get('ticketId')
}

console.log('hello')

async function displayTicketOrder(ticketId) {
    const response = await fetch (`http://localhost:8000/api/ticket/${ticketId}`)
    const data = await response.json()
    console.log('data', data)

    artist.innerHTML = data.data.artist
    plats.innerHTML = data.data.plats
    date.innerHTML = data.data.datum 
    start.innerHTML = data.data.start
    slut.innerHTML = data.data.slut
    biljettnummer.innerHTML = 'Biljetnummer:  ' + data.data.biljettnummer
}

displayTicketOrder(ticketId)