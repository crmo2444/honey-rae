import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"

export const Profile = () => {

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if(honeyUserObject.staff) {
        //return employeeviews
        return (
            <EmployeeForm />
        )
    }
    else {
        //return customerviews
        return (
            <CustomerForm />
        )
    }

}