import React, { useContext } from "react"

import User from "./User"
import { UserContext } from "./UserProvider"
import { FriendContext } from "../friends/FriendProvider"

export default (props) => {
  const { users } = useContext(UserContext)
  const { friends } = useContext(FriendContext)
  const activeUser = parseInt(localStorage.getItem("activeUser"), 10)
  const UsersFriends = []

  friends.map(friend => {
    if (friend.activeUserId === activeUser) {
      UsersFriends.push(friend.user)
    }
  })
  let nonFriendsArray = []
  users.filter(user => {
    if (user.id !== parseInt(localStorage.getItem("activeUser"), 10)) {
      //checking if current user is already a friend
      const haveFriended = UsersFriends.find(friend => friend.id === user.id) || null
      if (haveFriended === null) {
        nonFriendsArray.push(user)

      }
    }
  })
  
  
  nonFriendsArray.shift()




    return (
      <>
        <div className="usesList">
          <div>
            <h2>Add A Friend</h2>
          </div>

          <div className="users">
            {
              nonFriendsArray.map(use => {
                return <User key={use.id} user={use} {...props} />
              })
            }
          </div>
        </div>
      </>
    )


  }