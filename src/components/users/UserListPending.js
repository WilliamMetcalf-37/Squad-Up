import React, { useContext } from "react"

import PendingUser from "./PendingUser"
import { FriendContext } from "../friends/FriendProvider"


export default (props) => {
    const { friends } = useContext(FriendContext)

let usersFriendsArray = []

friends.filter(friend =>{
  if(friend.activeUserId === parseInt(localStorage.getItem("activeUser"),10) && friend.confirmed === false){
    usersFriendsArray.push(friend.user)
  }
})

    

    return (
      <>
      <div className="PendingFriendsList">
          <div>
              <h2>Pending Friend Requests</h2>
          </div>    
        
          <div className="PendingFriends">
              {
                  usersFriendsArray.map(friend => {
                      return <PendingUser key={friend.id} friend={friend} {...props} />
                  })
              }
          </div>
      </div>
      </>
  )


}