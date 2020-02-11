import React, { useContext } from "react"
import { FriendContext } from "./FriendProvider"
import Friend from "./Friend"

export default (props) => {
    const { friends } = useContext(FriendContext)

let usersFriendsArray = []

friends.filter(friend =>{
  if(friend.activeUserId === parseInt(localStorage.getItem("activeUser"),10) && friend.confirmed === true){
    usersFriendsArray.push(friend)
  }
})
console.log("friendArray", usersFriendsArray)

    

    return (
      <>
      <div className="FriendsList">
          <div>
              <h1>Friends</h1>
          </div>    
        
          <div className="Friends">
              {
                  usersFriendsArray.map(friend => {
                      return <Friend key={friend.id} friend={friend} {...props} />
                  })
              }
          </div>
      </div>
      </>
  )


}