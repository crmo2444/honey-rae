import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

export const TicketContainer = () => {
    //this is the parent component that will maintain state of ticketList and ticketSearch
    //two sibling components cannot talk directly to eachother

    const [searchTerms, setSearchTerms] = useState("")

    //props - passing a value to a child component (like an argument)
    //this component manages search bar state, so you send setSearchTerms to the search component
    //send searchTerms variable to ticketList so these two are now communicating
    //what comes before = is the name of key, use setterFunction or searchTermState in other components
    return <>
        <TicketSearch setterFunction = {setSearchTerms}/>
        <TicketList searchTermState = {searchTerms}/>
    </>
}