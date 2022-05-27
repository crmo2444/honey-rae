import { Link } from "react-router-dom"

export const Ticket = ({ticketObject, userObject, employees, getTickets}) => {


    //find assigned employee for current ticket
    let assignedEmployee = null

    if(ticketObject.employeeTickets.length !== 0) {
        let ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }


    //find employee profile object of current user
    let userEmployee = employees.find(employee => employee.userId === userObject.id)

    return <section className="ticket">
                    <div>  
                    {userObject.staff ? <header>Ticket {ticketObject.id}</header> : <>
                        Ticket {ticketObject.id}
                        <br></br> 
                        <Link to={`/tickets/${ticketObject.id}`}>(Details)</Link></>}
                    </div>
                    <div>Description: {ticketObject.description}</div>
                    <div>Emergency: {ticketObject.emergency ? "Yes" : "No"}</div>
                    {userObject.staff ? 
                        ticketObject.employeeTickets.length ?
                            <footer>Currently being worked on by {assignedEmployee?.user?.fullName}.</footer> : 
                            <button onClick={
                                () => {
                                    fetch(`http://localhost:8088/employeeTickets`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            employeeId: userEmployee.id,
                                            serviceTicketId: ticketObject.id
                                        })
                                    })
                                        .then(response => response.json())
                                        .then(() => {
                                            //GET the updated state from the API again
                                            getTickets()
                                    })
                                }
                            }>Claim</button>
                                 : <Link to={`/tickets/${ticketObject.id}/edit`}>Edit</Link>}
                </section>
}