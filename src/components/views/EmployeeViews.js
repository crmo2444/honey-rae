import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { EmployeeList } from "../employees/EmployeeList"
import { Profile } from "../profile/Profile"
import { TicketContainer } from "../tickets/TicketContainer"
import { TicketDetails } from "../tickets/TicketDetails"

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
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
                <Route path="customers" element={ <CustomerList /> } />
                <Route path="customers/:customerId" element={ <CustomerDetails /> } />
                <Route path="profile" element={ <Profile /> } />
            </Route>
        </Routes>
    )
}