import React, { useContext } from "react"




export default ({ message,history, match}) => {


const activeUser = parseInt(localStorage.getItem("activeUser"))
  const currentUserFunction = ()=>{
    if(activeUser===message.userId){
      return(<>
      <button onClick={()=>{
        history.push(`/messages/create/${message.friendChatId}/edit/${message.id}`)
      }}>Edit</button>
      <button>Delete</button>
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