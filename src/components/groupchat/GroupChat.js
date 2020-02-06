import React from "react"




export default ({ message}) => {
const activeUser = parseInt(localStorage.getItem("activeUser"))
  const currentUserFunction = ()=>{
    if(activeUser===message.userId || activeUser===message.group.groupLeaderId){
      return(<>
      <button>Edit</button>
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