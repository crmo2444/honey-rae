import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    //only displays when route = customer/:customerId (some number)
    const {customerId} = useParams()
    const [customer, updatecustomer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&_embed=serviceTickets&userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updatecustomer(singleCustomer)
                })
        },
        [customerId]
    )

    return  <section className="customer">
                    <header className="customer__header">{customer?.user?.fullName}</header>
                    <div>Email: {customer?.user?.email}</div>
                    <div>Phone Number: {customer.phoneNumber}</div>
                    <div>Address: {customer.address}</div>
                    {customer.serviceTickets ? <footer className="customer__footer">Currently has {customer?.serviceTickets?.length} tickets.</footer>
                    : <footer className="customer__footer">Currently has 0 tickets.</footer>}
        </section>
}