import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeList } from "../employees/EmployeeList"
import { TicketContainer } from "../tickets/TicketContainer"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import { TicketSearch } from "../tickets/TicketSearch"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ 
                <>
                    {/*These cannot communicate with one another until they are wrapped in a parent
                    <TicketSearch />
                    <TicketList /> 
                    They will now be returned in TicketContainer.js
                    */}
                    <TicketContainer />
                </>
            } />
                <Route path="employees" element={ <EmployeeList /> } />
            </Route>
        </Routes>
    )
}