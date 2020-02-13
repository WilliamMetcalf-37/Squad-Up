import React, { useContext } from "react"

import "./User.css"
import { FriendContext } from "../friends/FriendProvider"
import { NotificationContext } from "../notifications/NotificationProvider"
import { FriendChatContext } from "../friends/FriendChatProvider"


export default ({ user, history }) => {

const {addFriend }=useContext(FriendContext)
const {addNotification}=useContext(NotificationContext)
const {addFriendChat}=useContext(FriendChatContext)
const activeUser = parseInt(localStorage.getItem("activeUser"), 10)


  return (

    <>
    
        <div className="userName">{user.username}
        <button className="addFriend" onClick={()=>{
         

          const newFriendChat={
            userId: user.id,
            activeUserId: activeUser,
            confirm: false
          }
            const newFriend1 = {
              userId: user.id,
              activeUserId: activeUser,
              friendChatId: null,
              confirmed: false
            }
            const newFriend2 = {
              userId: activeUser,
              activeUserId: user.id,
              friendChatId: null,
              confirmed: false
            }
            addFriend(newFriend1).then(()=>{
              addFriend(newFriend2)

            }).then(()=>{

                const newNotification = {
                  notificationTypeId: 2,
                  userId: activeUser,
                  activeUserId: user.id
                }

              addNotification(newNotification)
            }).then(()=>{
              addFriendChat(newFriendChat)
            })
            .then(()=>{
              history.push("/friends")
            })


        }}>Add Friend</button>
        </div>
      
    </>
  )
}