import React, { useContext } from "react"

import "./Friend.css"
import { FriendContext } from "./FriendProvider"


export default ({ friend, history }) => {
const { friends} = useContext(FriendContext)

  const activeUserId = friend.activeUserId

const otherFriendObject = friends.find(fri=> {
  if(fri.userId === activeUserId && fri.activeUserId === friend.userId){
    return fri
  }
})


  return (

    <>
      <div className="friendChatCard"  onClick={()=>{
          history.push(`/messages/${friend.friendChatId}`)
        }}>
        <div className="friendName">{friend.user.username}
       
        </div>
      </div>
    </>
  )
}