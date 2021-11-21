
// hämta 1 event
function getEventDetails(req, res) {
    const eventId = req.params.id
    const event = db.get('event').find({id: parseInt(eventId)}).value()
    console.log('event', event)

    if (!event) {
        res.status(404).send('Sorry! Not an event...');
    }
    
    else {
        res.json({
            status: 'success',
            data:  event
        });
    }
}

// beställ en biljett
function orderTicket(req, res){
    const eventId = req.body.id
    const event = db.get('event').find({id: parseInt(eventId)}).value()

    if(event && event.antal > 0){
        let ticket = {
            "id": event.id,
            "ticketId": "ABC"+Math.random(),
            "verified": false
          }
          const result = db.get('tickets').push(ticket).write()
          const updateQuantity = db.get('event').find({id: parseInt(eventId)})
          .assign({antal: parseInt(event.antal - 1)}).write()
          res.json({
              status: 'success',
              message: 'Ticket ordered successsfully!',
              data: ticket
          })
    }else{
        if(event.antal === 0){
            res.json({
                status: 'false',
                message: 'Biljetterna är tyvärr slutsålda...'
            })
        }else{
            res.json({
                status: 'error',
                message: error.message
            })
        }
    }
}


function createTicket(req,res){
    const ticketId = req.params.ticketId
    const ticket = db.get('tickets').find({ ticketId : ticketId }).value()
    if (!ticket){
        res.json({
            status: 'false',
            message: 'not a real ticket'
        })
    }else{
        const event = db.get('event').find({id: parseInt(ticket.id)}).value()
        const ticketDetails = {
            "artist": event.artist,
            "plats": event.plats,
            "datum": event.datum + event.datum2,
            "start": event.start,
            "slut": event.slut,
            "biljettnummer": ticket.ticketId
        }
        res.json({
            status: 'success',
            message: 'Here is your ticket!',
            data: ticketDetails
        })
    }
}

// verifiera biljett
function verifyTicket(req, res) {
    const ticketId = req.params.ticketId
    const ticket = db.get('tickets').find({ ticketId: ticketId }).value()
    if(ticket){
      if(!ticket.verified){
        const updateVerfication = db.get('tickets').find({ ticketId: ticketId }).assign({verified:true}).write()
        res.json({
            status: 'success',
            message: "Ticket verified"
        })
      }else{
        res.status(400).json({
            status: 'false',
            message: "Ticket is already verified"
        })
      }
    }else{
      res.status(404).json({
          status: 'false',
          message: "Ticket does not exist"
      })
    }
}

exports.getEventDetails = getEventDetails
exports.orderTicket = orderTicket
exports.createTicket = createTicket
exports.verifyTicket = verifyTicket