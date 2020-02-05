import React, { useContext } from "react"
import "./Event.css"
import { GroupContext } from "../groups/GroupProvider"



export default ({event, history})=>{
const {addGroup} = useContext(GroupContext)




const artistFunction=()=>{
if(event.artistList.length === 0){
  return(<li>Artists TBA</li>)
}else{
  return(<>
  {event.artistList.map(art=>{
              return <li key={art.id}>{art.name}</li>
            })}
  </>)
}

}

return (
  <section className="myEvent">
          <h3 className="event__name">Venue: {event.venue.name}</h3>
<div>{event.name}</div>
          <div>Artists</div>
          <ul>  
            {artistFunction()}
            
          </ul>
          <div className="event__time">{event.date}</div>
          <button className="createGroup" onClick={props=>{
            const newGroup = {
              date: event.date,
              name: event.venue.name,
              artist: event.artistList[0].name,
              groupLeaderId: parseInt(localStorage.getItem("activeUser"),10)
            }
addGroup(newGroup).then(()=>{
  window.alert(`You have create a new group for ${event.name}`)
})
            



          }}>Create Group</button>
        </section>
)
}