import { Link } from "react-router-dom"

export const Ticket = ({id, description, emergency, date}) => {
    return <section className="ticket">
                    <div>
                        <Link to={`/tickets/${id}`}>Ticket {id}:</Link>
                    </div>
                    <div>Description: {description}</div>
                    <div>Emergency: {emergency ? "Yes" : "No"}</div>
                </section>
}