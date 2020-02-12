import React, { useContext } from "react"

import "./User.css"
import { FriendContext } from "../friends/FriendProvider"
import { NotificationContext } from "../notifications/NotificationProvider"


export default ({ user, history }) => {

const {addFriend }=useContext(FriendContext)
const {addNotification}=useContext(NotificationContext)
const activeUser = parseInt(localStorage.getItem("activeUser"), 10)


  return (

    <>
    
        <div className="userName">{user.username}
        <button className="addFriend" onClick={()=>{
         
            const newFriend1 = {
              userId: user.id,
              activeUserId: activeUser,
              confirmed: false
            }
            const newFriend2 = {
              userId: activeUser,
              activeUserId: user.id,
              confirmed: false
            }
            addFriend(newFriend1).then(()=>{
              addFriend(newFriend2)
              //console.log("friend")
            }).then(()=>{

                const newNotification = {
                  notificationTypeId: 2,
                  userId: activeUser,
                  activeUserId: user.id
                }

              addNotification(newNotification)
            }).then(()=>{
              history.push("/friends")
            })


        }}>Add Friend</button>
        </div>
      
    </>
  )
}