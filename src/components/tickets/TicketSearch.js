export const TicketSearch = ({setterFunction}) => {
    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter search terms"
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }   
                }/>
        </div>
    )
}