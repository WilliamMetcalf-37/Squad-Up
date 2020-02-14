import React, { useContext } from "react"
import "./Event.css"
import { GroupContext } from "../groups/GroupProvider"
import { GroupChatContext } from "../groupchat/GroupChatProvider"
import { UserContext } from "../users/UserProvider"



export default ({ event, history }) => {
  const { addGroup, groups } = useContext(GroupContext)
  const { addGroupChat } = useContext(GroupChatContext)
  const { users, patchUser } = useContext(UserContext)



  const artistFunction = () => {
    if (event.artistList.length === 0) {
      return (<li>Artists TBA</li>)
    } else {
      return (<>
        {event.artistList.map(art => {
          return <li key={art.id}>{art.name}</li>
        })}
      </>)
    }

  }

  return (
    <section className="myEvent">
      <h3 className="event__name">Venue: {event.venue.name}</h3>
      <a href={event.link}>Tickets</a> <br></br><br></br>
      <div>Artists</div>
      <ul>
        {artistFunction()}

      </ul>
      <div className="event__time">{event.date}</div>
      <button className="createGroup" onClick={props => {
        const newGroup = {
          date: event.date,
          name: event.venue.name,
          artist: event.artistList[0].name,
          groupLeaderId: parseInt(localStorage.getItem("activeUser"), 10)
        }

        const firstChat = {
          message: "Welcome to Chat Fam",
          groupId: groups.length + 1,
          userId: 1
        }
        addGroup(newGroup).then(() => {
          const foundUser = users.find(user => user.id === parseInt(localStorage.getItem("activeUser"), 10))



          const patchTheUser = {
            id: parseInt(localStorage.getItem("activeUser"), 10),
            groupLength: foundUser.groupLength + 1
          }
          patchUser(patchTheUser)
          addGroupChat(firstChat)
        }).then(() => {
          window.alert(`You have create a new group at ${event.venue.name} for ${event.artistList[0].name} on ${event.date}`)
        })




      }}>Create Squad</button>
    </section>
  )
}