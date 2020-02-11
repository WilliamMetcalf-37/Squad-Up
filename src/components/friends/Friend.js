import React, { useContext } from "react"

import "./Friend.css"


export default ({ friend, history }) => {


  const activeUser = parseInt(localStorage.getItem("activeUser"), 10)


  return (

    <>
      <div className="friendCard"  onClick={()=>{
          history.push(`/messages/${friend.id}`)
        }}>
        <div className="friendName">{friend.user.username}
        <button >Remove Friend</button>
        </div>
      </div>
    </>
  )
}