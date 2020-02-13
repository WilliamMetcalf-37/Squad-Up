import React, { useContext } from "react"
import { DirectMessageContext } from "./DirectMessageProvider"




export default ({ message, history }) => {

  const { deleteDirectMessage } = useContext(DirectMessageContext)


  const activeUser = parseInt(localStorage.getItem("activeUser"))
  const currentUserFunction = () => {
    if (activeUser === message.userId) {
      return (<>
        <button onClick={() => {
          history.push(`/messages/create/${message.friendChatId}/edit/${message.id}`)
        }}>Edit</button>
        <button onClick={() => {
          deleteDirectMessage(message).then(() => history.push(`/messages/${message.friendChatId}`))
        }}>Delete</button>
      </>)
    }

  }

  return (

    <>
      <div className="messageCard">
        <div className="messageUserName">
          {message.user.username}
        </div>
        <div className="messageMessage">
          {message.message}
          {currentUserFunction()}
        </div>
      </div>
    </>
  )
}