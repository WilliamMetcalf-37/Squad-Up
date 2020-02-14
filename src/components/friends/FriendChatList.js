import React, { useContext } from "react"
import { FriendContext } from "./FriendProvider"
import Friend from "./Friend"
import FriendChatCard from "./FriendChatCard"

export default (props) => {
    const { friends } = useContext(FriendContext)

let usersFriendsArray = []

friends.map(friend =>{
  if(friend.activeUserId === parseInt(localStorage.getItem("activeUser"),10) && friend.confirmed === true){
    return usersFriendsArray.push(friend)
  }
})


    

    return (
      <>
      <div className="FriendChatList">
          <div>
              <h2>Friend Chat</h2>
          </div>    
        
          <div className="FriendChatCards">
              {
                  usersFriendsArray.map(friend => {
                      return <FriendChatCard key={friend.id} friend={friend} {...props} />
                  })
              }
          </div>
      </div>
      </>
  )


}