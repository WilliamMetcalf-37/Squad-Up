import React, { useContext } from "react"
import "./Event.css"
import { EventContext } from "./EventProvider"
import Event from "./Event"

export default (props) => {
    const { events } = useContext(EventContext)

    return (
      <>
      <div className="eventsList">
          <div>
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