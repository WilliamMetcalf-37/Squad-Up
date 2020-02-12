import React, { useContext } from "react"
import "./Group.css"
import { UserContext } from "../users/UserProvider"
import { UserGroupContext } from "./UserGroupProvider"
import { StatusContext } from "./StatusProvider"
import { NotificationContext } from "../notifications/NotificationProvider"



export default ({ group, history }) => {
  const { users } = useContext(UserContext)
  const { status } = useContext(StatusContext)
  const { userGroups, addUserGroup, deleteUserGroup, patchUserGroup } = useContext(UserGroupContext)
  const {addNotification} = useContext(NotificationContext)


  let groupMembers = []

//filter to grab members of the specific group
 userGroups.filter(usg => {
    if (group.id === usg.groupId) {
      groupMembers.push(usg.user)
    }
  })


  let nonMembersArray = []
  users.filter(user => {
    if (user.id !== parseInt(localStorage.getItem("activeUser"), 10)) {
      if(user.id !== 1){

      
      const userInGroup = groupMembers.find(friend => friend.id === user.id) || null
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
          <select className="dropdown" id="userDropdown" name="select"
            onChange={addMemberToGroup}>
            <option value="0">Add Friends to Squad</option>
            {nonMembersArray.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}

          </select>
          <h3>Squad Leader</h3>
          <div>{groupLeader.username}</div>
          <h3>Squad Members</h3>
          {groupMembers.map(user => {
          const currentUserGroup = userGroups.find(use => user.id === use.userId && group.id === use.groupId)
            return <>
              <div key={user.id} value={user.id} className="individualUser">{user.username}
                <button onClick={props => {
                  const currentUserGroup = userGroups.find(use => user.id === use.userId && group.id === use.groupId)
                  const userId = currentUserGroup.userId
                  const groupId = currentUserGroup.groupId
                  deleteUserGroup(currentUserGroup).then(() => {
                    const foundUserGroup = userGroups.find(use => {
                      if(use.groupId === group.id && use.userId === parseInt(currentUserGroup.userId)){
                    return use
                      }
                    }) || {}
                    
                    
                          const newNotification = {
                            activeUserId:userId,
                              userGroupId: foundUserGroup.id,
                              notificationTypeId: 4,
                              groupId: groupId
                          }
                          addNotification(newNotification)
                        }).then(()=>{
                          history.push("/")
                        })
                    
                  
                }}>Remove From Squad
              </button>
              <br></br>
              {currentUserGroup.status.status}
              </div>
            </>
          })}
        </>
      )
    } else {
      return (
        <>
          <h3>Group Leader</h3>
          <div>{groupLeader.username}</div>
          <h3>Group Members</h3>
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
      groupId: group.id,
      userId: userId,
      statusId: 1
    }
    addUserGroup(newUserGroup).then(()=>{
const foundUserGroup = userGroups.find(use => {
  if(use.groupId === group.id && use.userId === parseInt(event.target.value)){
return use
  }
}) || {}


      const newNotification = {
        activeUserId:userId,
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

  const groupLeader = users.find(user => group.groupLeaderId === user.id) ||{}
  return (
    <section className="mygroup">

      <h3 className="group__name">{group.name}</h3>
      <div className="group__artist">{group.artist}</div>
      <div className="group__time">{group.date}</div>


      {groupLeaderLoggedIn()}




    </section>
  )
}