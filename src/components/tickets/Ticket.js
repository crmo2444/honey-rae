import { Link } from "react-router-dom"

export const Ticket = ({id, description, emergency, date}) => {
    return <section className="ticket">
                    <div>
                        Ticket {id} 
                        <br></br>   
                    <Link to={`/tickets/${id}`}>(Details)</Link>
                    </div>
                    <div>Description: {description}</div>
                    <div>Emergency: {emergency ? "Yes" : "No"}</div>
                    <Link to={`/tickets/${id}/edit`}>Edit</Link>
                </section>
}