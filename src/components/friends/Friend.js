import React, { useContext } from "react"

import "./Friend.css"
import { FriendContext } from "./FriendProvider"


export default ({ friend, history }) => {
const {deleteFriend, friends} = useContext(FriendContext)

  const activeUserId = friend.activeUserId

const otherFriendObject = friends.find(fri=> {
  if(fri.userId === activeUserId && fri.activeUserId === friend.userId){
    return fri
  }
})


  return (

    <>
      <div className="friendCard"  onClick={()=>{
          history.push(`/messages/${friend.friendChatId}`)
        }}>
        <div className="friendName">{friend.user.username}
        <button className="unfriend" onClick={()=>{
          deleteFriend(friend).then(()=> deleteFriend(otherFriendObject)).then(()=>history.push("/friends"))

        }}>Unfriend</button>
        </div>
      </div>
    </>
  )
}