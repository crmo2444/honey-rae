import { Link } from "react-router-dom"

export const Ticket = ({ticketObject, userObject, employees, getTickets}) => {


    //find assigned employee for current ticket
    let assignedEmployee = null

    if(ticketObject.employeeTickets.length !== 0) {
        let ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    let userEmployee = employees.find(employee => employee.userId === userObject.id)

    //determines if current user can close ticket (if they are the one assigned to ticket)
    const canClose = () => {
        if (assignedEmployee?.id === userEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish">Close Ticket</button>
        }
        else {
            return ""
        }
    }

    //updates ticket with a new date completed
    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(getTickets)
    }

    const showCompletedDate = () => {
        if  (ticketObject.dateCompleted !== "") {
            return <div>Date Completed: {ticketObject.dateCompleted}</div>
        }
        else {
            return <div>Assigned to {assignedEmployee?.user?.fullName}</div>
        }
    }

    const deleteButton = () => {
        if(userObject.staff === false)  {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                    method: "DELETE"
                })
                    .then(response => response.json())
                    .then(getTickets)
            }}
                className="ticket__delete">Delete</button>
        }
        else {
            return ""
        }
    }

    const allowEdit = () => {
        return <button
                    type="button"
                    onClick={(e) => {
                    e.preventDefault();
                    window.location.href=`http://localhost:3000/tickets/${ticketObject.id}/edit`;
                    }}
                    >Edit</button>
    }

    //find employee profile object of current user

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
                            <footer>{showCompletedDate()} {canClose()}</footer> 
                        : 
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
                                 : <>
                                 {allowEdit()}
                                 {deleteButton()}
                                 </>}
                </section>
}