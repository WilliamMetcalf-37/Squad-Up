import React, { useContext } from "react"
import "./Group.css"
import { UserContext } from "../users/UserProvider"
import { UserGroupContext } from "./UserGroupProvider"
import { StatusContext } from "./StatusProvider"
import { NotificationContext } from "../notifications/NotificationProvider"
import { GroupContext } from "./GroupProvider"
import { FriendContext } from "../friends/FriendProvider"
import { GroupChatContext } from "../groupchat/GroupChatProvider"



export default ({ group, history }) => {
  const { users } = useContext(UserContext)
  const { status } = useContext(StatusContext)
  const { userGroups, addUserGroup, deleteUserGroup, patchUserGroup } = useContext(UserGroupContext)
  const { addNotification } = useContext(NotificationContext)
  const { friends } = useContext(FriendContext)
  const { deleteGroup } = useContext(GroupContext)
  const { groupChats, deleteGroupChat } = useContext(GroupChatContext)

  let usersFriendsArray = []

  friends.map(friend => {
    if (friend.activeUserId === parseInt(localStorage.getItem("activeUser"), 10) && friend.confirmed === true) {
      return usersFriendsArray.push(friend)
    }
  })

  let groupMembers = []

  //filter to grab members of the specific group
  userGroups.filter(usg => {
    if (group.id === usg.groupId) {
      groupMembers.push(usg.user)
    }
  })






  let nonMembersArray = []
  usersFriendsArray.filter(user => {
    if (user.user.id !== parseInt(localStorage.getItem("activeUser"), 10)) {
      if (user.user.id !== 1) {


        const userInGroup = groupMembers.find(friend => friend.id === user.user.id) || null
        if (userInGroup === null) {
          nonMembersArray.push(user)

        }
      }
    }
  })






  const groupLeaderLoggedIn = () => {
    if (parseInt(localStorage.getItem("activeUser"), 10) === group.groupLeaderId) {
      return (
        <>
          <button className="deleteSquad" onClick={() => {

            deleteGroup(group)

            // groupChats.map(chat => {
            //   if (chat.groupId === group.id) {
            //     deleteGroupChat(chat).then(() => {
            //       userGroups.map(userGroup => {

            //         if (userGroup.groupId === group.id) {

            //           deleteUserGroup(userGroup).then(() => {

            //           })
            //         }
            //       })
            //     })
            //   }
            // })


          }}>X</button>
          <h3 className="group__name">{group.name}</h3>

          <a href={group.tickets}>Tickets</a>
          <div className="group__artist">{group.artist}</div>
          <div className="group__time">{group.date}</div>
          <select className="dropdown" id="userDropdown" name="select"
            onChange={addMemberToGroup}>
            <option value="0" selected disabled>Add Friends to Squad</option>
            {nonMembersArray.map(user => <option key={user.user.id} value={user.user.id}>{user.user.username}</option>)}

          </select>
          <h3>Squad Members</h3>
          {groupMembers.map(user => {
            const currentUserGroup = userGroups.find(use => user.id === use.userId && group.id === use.groupId)
            return (<>
              <div key={user.id} value={user.id} className="individualUser">{user.username}
                <button onClick={props => {
                  const currentUserGroup = userGroups.find(use => user.id === use.userId && group.id === use.groupId)
                  const userId = currentUserGroup.userId
                  const groupId = currentUserGroup.groupId
                  deleteUserGroup(currentUserGroup).then(() => {
                    const foundUserGroup = userGroups.find(use => {
                      if (use.groupId === group.id && use.userId === parseInt(currentUserGroup.userId)) {
                        return use
                      }
                    }) || {}


                    const newNotification = {
                      activeUserId: userId,
                      userGroupId: foundUserGroup.id,
                      notificationTypeId: 4,
                      groupId: groupId
                    }
                    addNotification(newNotification)
                  }).then(() => {
                    history.push("/")
                  })


                }}>Remove
              </button>
                <br></br>
                {currentUserGroup.status.status}
              </div>

            </>
            )
          })}
        </>
      )
    } else {
      return (
        <>
          <h3 className="group__name">{group.name}</h3>

          <a href={group.tickets}>Tickets</a>
          <div className="group__artist">{group.artist}</div>
          <div className="group__time">{group.date}</div>
          <h3>Squad Leader</h3>
          <div>{groupLeader.username}</div>
          <h3>Squad Members</h3>
          {groupMembers.map(user => {
            const currentUserGroup = userGroups.find(use => user.id === use.userId && group.id === use.groupId)

            if (user.id === parseInt(localStorage.getItem("activeUser"), 10)) {
              return <>
                <div className="currentUser" key={user.id} value={user.id}>{user.username}</div>

                <select className="dropdown" id="statusDropdown" name="select"
                  onChange={patchUserGroupStatus}>
                  <option value="0">{currentUserGroup.status.status}</option>
                  {status.map(stat => <option key={stat.id} value={stat.id}>{stat.status}</option>)}

                </select>
              </>
            }

            return <>
              <div key={user.id} value={user.id}>{user.username}  <br></br>{currentUserGroup.status.status}</div>
            </>
          })}
        </>
      )
    }
  }


  const addMemberToGroup = (event) => {
    const userId = parseInt(event.target.value)
    const groupId = group.id

    const newUserGroup = {
      groupId: groupId,
      userId: userId,
      statusId: 1
    }
    addUserGroup(newUserGroup).then(() => {
      // const foundUserGroup = userGroups.find(use => {
      //   if(use.groupId === group.id && use.userId === userId){
      // return use
      //   }
      // }) || {}


      const newNotification = {
        activeUserId: userId,
        notificationTypeId: 3,
        groupId: groupId
      }
      addNotification(newNotification)
    }).then(() => {
      history.push("/")
    })
  }

  const patchUserGroupStatus = (event) => {
    //write in patch method to change users status
    const thisuserGroup = userGroups.find(rel => {
      return rel.userId === parseInt(localStorage.getItem("activeUser"), 10) && rel.groupId === group.id
    })
    const updateUserGroup = {
      id: thisuserGroup.id,
      statusId: parseInt(event.target.value, 10)
    }
    patchUserGroup(updateUserGroup)
  }

  const groupLeader = users.find(user => group.groupLeaderId === user.id) || {}
  return (
    <section className="mygroup">





      {groupLeaderLoggedIn()}




    </section>
  )
}