import React, { useContext } from "react"
import { GroupChatContext } from "./GroupChatProvider"



export default ({ message,history, match}) => {
  const {deleteGroupChat}=useContext(GroupChatContext)

const activeUser = parseInt(localStorage.getItem("activeUser"))
  const currentUserFunction = ()=>{
    if(activeUser===message.userId || activeUser===message.group.groupLeaderId && message.userId !== 1){
      return(<>
      <button onClick={()=>{
        history.push(`/chat/create/${message.groupId}/edit/${message.id}`)
      }}>Edit</button>
      <button onClick={()=>{
        deleteGroupChat(message).then(()=>{
          history.push(`/chat/${match.params.groupId}`)
        })
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
        </div>
        <div>
          {currentUserFunction()}
        </div>
      </div>
    </>
  )
}