import React, { useState, useEffect } from "react"

export const EventContext = React.createContext()

export const EventProvider = (props) => {
    const [events, setEvents] = useState([])

    const getEvents = () => {
        return fetch("https://edmtrain.com/api/events?locationIds=370&client=b75f3751-421f-40ce-992e-be13390c6864")
            .then(res => res.json())
            .then(
              data => {
                  data.data.forEach(element => {
                      events.push(element)
                  });
                
              }
          )
            
    }
    useEffect(() => {
      getEvents()
  }, [])

  useEffect(() => {
}, [events])
    return (
        <EventContext.Provider value={{
            events
        }}>
            {props.children}
        </EventContext.Provider>
    )
}