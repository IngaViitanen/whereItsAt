
const eventElem = document.querySelector('#event')
// const eventDetails = document.querySelector('#details')
let eventPage = []

async function getEventPage(){
    const response = await fetch (`http://localhost:8000/api/event`)
    const data = await response.json()
    eventPage = data
    displayEvent(eventPage)
    console.log('data', eventPage)
}

const displayEvent = (events) => {
    const htmlString = events
    .map((event) => {
        return `
        <a href="buy.html?id=${event.id}">
        <li class="event" id="details">
            <div class="date">
            <p class="date2">${event.datum}</p>
            <p class="date2">${event.datum2}</p>
            </div>
            <div class="wrapper">
            <h3 class="artist">${event.artist}</h3>
            <p class="place">${event.plats}</p>
            <p class="time">${event.start} - ${event.slut}</p>
            </div>
            <p class="price">${event.pris}</p>
        </li>
        `
    })
    .join(' ')
    eventElem.innerHTML = htmlString
}

getEventPage()