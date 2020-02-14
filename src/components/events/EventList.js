import React, { useContext, useEffect } from "react"
import "./Event.css"
import { EventContext } from "./EventProvider"
import Event from "./Event"

export default (props) => {
    const { events } = useContext(EventContext)


    // useEffect(() => {
    //     console.log("**** Effect hook for events", events)
    // })

    return (
      <>
      <div className="eventsList">
          <div className="eventTitle">
              <h1>Events</h1>
          </div>    
        
          <div className="events">
              {
                  events.map(event => {
                      return <Event key={event.id} event={event} {...props} />
                  })
              }
          </div>
      </div>
      </>
  )


}