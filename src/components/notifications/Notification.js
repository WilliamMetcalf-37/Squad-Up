import React, { useContext } from "react"

import "./Notification.css"
import { FriendContext } from "../friends/FriendProvider"
import { NotificationContext } from "./NotificationProvider"
import { UserGroupContext } from "../groups/UserGroupProvider"
import { GroupContext } from "../groups/GroupProvider"
import { UserContext } from "../users/UserProvider"
import { FriendChatContext } from "../friends/FriendChatProvider"


export default ({ notification, history }) => {
  const { deleteNotification } = useContext(NotificationContext)
  const { friends, patchFriend, deleteFriend } = useContext(FriendContext)
  const { userGroups, patchUserGroup, deleteUserGroup } = useContext(UserGroupContext)
  const { groups } = useContext(GroupContext)
  const { users } = useContext(UserContext)
  const { friendChats, patchFriendChat } = useContext(FriendChatContext)
  const activeUser = parseInt(localStorage.getItem("activeUser"), 10)
  let currentUser = {}
  let newFriend1 = {}
  let newFriend2 = {}

  const NotificationTypePicker = () => {
    if (notification.notificationTypeId === 1) {
      currentUser = users.find(user => user.id === notification.userId) || {}
      return (<>
        <div className="messageNotification">
          {/* user who sent the message */}
          You have a message from {currentUser.username}
          <button className="clearNote" onClick={() => {
            deleteNotification(notification)
          }}>X</button>
        </div>
      </>)
    } else if (notification.notificationTypeId === 2) {

      currentUser = users.find(user => user.id === notification.userId) || {}

      return (<>
        <div className="friendRequest">
          {/* user who sent the requsts username */}
          You have a Friend Request From {currentUser.username}
          <button className="addFriend" onClick={() => {

            const friendOne = friends.find(friend => {
              if (friend.userId === notification.userId && friend.activeUserId === notification.activeUserId) {
                return friend
              }
            })
            const friendTwo = friends.find(friend => {
              if (friend.userId === notification.activeUserId && friend.activeUserId === notification.userId) {
                return friend
              }
            })

            const foundFriendChat = friendChats.find(fc => {
              if (fc.userId === notification.activeUserId && fc.activeUserId === notification.userId) {
                return fc
              }
            })

            const updateFriendChat = {
              id: foundFriendChat.id,
              confirm: true
            }

            patchFriendChat(updateFriendChat).then(() => {


              newFriend1 = {
                id: friendOne.id,
                friendChatId: foundFriendChat.id,
                confirmed: true
              }

              patchFriend(newFriend1)
            })
              .then(() => {
                newFriend2 = {
                  id: friendTwo.id,
                  friendChatId: foundFriendChat.id,
                  confirmed: true
                }
                patchFriend(newFriend2)
              })
              .then(() => {
                deleteNotification(notification)
              })
          }}>Accept</button>
          <button className="rejectRequest" onClick={() => {
            newFriend1 = {
              id: notification.friendId1
            }
            newFriend2 = {
              id: notification.friendId2
            }
            deleteFriend(newFriend1).then(() => {
              deleteFriend(newFriend2)
            }).then(() => {
              deleteNotification(notification)
            }).then(() => {
              history.push("/notifications")
            })
          }}>Deny</button>
        </div>
      </>)

    } else if (notification.notificationTypeId === 3) {
      let newUserGroup = {}
      const foundGroup = groups.find(gru => gru.id === notification.groupId) || {}
      const groupLeader = users.find(use => use.id === foundGroup.groupLeaderId) || {}

      const foundUserGroup = userGroups.find(usegru => {
        if (usegru.userId === activeUser && usegru.groupId === foundGroup.id) {
          return usegru
        }
      })

      return (<>
        <div className="SquadNotification">
          {/* group name group leader name */}
          You have been added to the {foundGroup.name} by {groupLeader.username}
          <button className="accept" onClick={() => {
            newUserGroup = {
              id: foundUserGroup.id,
              statusId: 2
            }
            patchUserGroup(newUserGroup).then(() => {
              deleteNotification(notification)
            })
          }}>Join Group</button>
          <button className="deny" onClick={() => {
            newUserGroup = {
              id: foundUserGroup.id
            }
            deleteUserGroup(newUserGroup).then(() => {
              deleteNotification(notification)
            })
          }}>Screw those guys</button>
        </div>
      </>)

    } else if (notification.notificationTypeId === 4) {
      const foundGroup = groups.find(gru => gru.id === notification.groupId) || {}
      const groupLeader = users.find(use => use.id === foundGroup.groupLeaderId) || {}

      return (<>
        <div>You have been removed from the {foundGroup.name} by {groupLeader.username}
          <button className="clearNote" onClick={() => {
            deleteNotification(notification)
          }}>Clear Notification</button>
        </div>
      </>)
    } else if (notification.notificationTypeId === 5) {
      const user = users.find(use => use.id === notification.userId)
      return (<>
        <div className="unfriended">
          <div>{user.username} has removed you as a friend
            <button className="clearNote" onClick={() => {
              deleteNotification(notification)
            }}>X</button>
          </div>
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