import React, { useContext } from "react"

import "./Notification.css"
import { FriendContext } from "../friends/FriendProvider"
import { NotificationContext } from "./NotificationProvider"
import { UserGroupContext } from "../groups/UserGroupProvider"


export default ({ notification, history}) => {
const {deleteNotification}= useContext(NotificationContext)
const {patchFriend, deleteFriend} = useContext(FriendContext)
const {patchUserGroup, deleteUserGroup} = useContext(UserGroupContext)


let newFriend1 = {}
let newFriend2 = {}

  const NotificationTypePicker = () => {
    if (notification.notificationTypeId === 1) {
      return (<>
      <div className="messageNotification">
        {/* user who sent the message */}
        You have a message from {notification.id}
        <button className="clearNote" onClick={()=>{
          deleteNotification(notification)
        }}>Clear Notification</button>
      </div>
      </>)
    } else if (notification.notificationTypeId === 2) {
      return (<>
      <div className="friendRequest">
        {/* user who sent the requsts username */}
        You have a Friend Request From {notification.id}
      <button className="addFriend" onClick={()=>{
         newFriend1 ={
          id: notification.friendId1,
          confirmed: true
        }
         newFriend2 ={
          id: notification.friendId2,
          confirmed: true
        }
        patchFriend(newFriend1).then(()=>{
          patchFriend(newFriend2)
        }).then(()=>{
          deleteNotification(notification)
        })
      }}>Add Friend</button>
      <button className="rejectRequest" onClick={()=>{
        newFriend1 = {
          id: notification.friendId1
        }
        newFriend2 = {
          id: notification.friendId2
        }
        deleteFriend(newFriend1).then(()=>{
deleteFriend(newFriend2)
        }).then(()=>{
          deleteNotification(notification)
        }).then(()=>{
          history.push("/notifications")
        })
      }}>Deny Request</button>
      </div>
      </>)

    } else if (notification.notificationTypeId === 3) {
      return (<>
      <div className="SquadNotification">
        {/* group name group leader name */}
        You have been added to the {notification.id} by {notification.id}
        <button className="accept" onClick={()=>{
            const newUserGroup = {
              id: notification.userGroupId,
              statusId: 2
            }
            patchUserGroup(newUserGroup).then(()=>{
              deleteNotification(notification)
            })
        }}>Join Group</button>
        <button className="deny">Screw those guys</button>
      </div>
      </>)

    }
  }





  return (

    <>
      {NotificationTypePicker()}
    </>
  )
}