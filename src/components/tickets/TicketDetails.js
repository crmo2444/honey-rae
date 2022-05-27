import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const TicketDetails = () => {
    //only displays when route = ticket/:ticketId (some number)
    const {ticketId} = useParams()
    const [ticket, updateTicket] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets?_expand=user&id=${ticketId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleTicket = data[0]
                    updateTicket(singleTicket)
                })
        },
        [ticketId]
    )

    return  <section className="ticket">
                    <header className="ticket__header">Ticket {ticket.id}</header>
                    <div>Description: {ticket.description}</div>
                    <div>Emergency: {ticket.emergency ? "Yes" : "No"}</div>
                    <div>Submitted By: {ticket?.user?.fullName}</div>
        </section>
}