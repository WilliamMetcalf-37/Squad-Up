import React, { useContext } from "react"
import "./Group.css"
import { UserContext } from "../users/UserProvider"
import { UserGroupContext } from "./UserGroupProvider"
import { StatusContext } from "./StatusProvider"



export default ({ group, history }) => {
  const { users } = useContext(UserContext)
  const { status } = useContext(StatusContext)
  const { userGroups, addUserGroup, deleteUserGroup, patchUserGroup } = useContext(UserGroupContext)


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
      const userInGroup = groupMembers.find(friend => friend.id === user.id) || null
      if (userInGroup === null) {
        nonMembersArray.push(user)

      }
    }
  })





  const groupLeaderLoggedIn = () => {
    if (parseInt(localStorage.getItem("activeUser"), 10) === group.groupLeaderId) {
      return (
        <>
          <select className="dropdown" id="userDropdown" name="select"
            onChange={addMemberToGroup}>
            <option value="0">Add Friends to Group</option>
            {nonMembersArray.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}

          </select>
          <h3>Group Leader</h3>
          <div>{groupLeader.username}</div>
          <h3>Group Members</h3>
          {groupMembers.map(user => {
          const currentUserGroup = userGroups.find(use => user.id === use.userId && group.id === use.groupId)
            return <>
              <div key={user.id} value={user.id} className="individualUser">{user.username}
                <button onClick={props => {
                  const currentUserGroup = userGroups.find(use => user.id === use.userId && group.id === use.groupId)
                  deleteUserGroup(currentUserGroup).then(() => {
                    history.push("/")
                  })
                }}>Remove From Group
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
                  <option value="0">Your Status</option>
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
    /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
    // const newUserGroup = Object.assign({}, userGroup)
    // newUserGroup[event.target.select] = event.target.value
    // setUserGroup(newUserGroup)
    const newUserGroup = {
      groupId: group.id,
      userId: parseInt(event.target.value),
      statusId: 1
    }
    addUserGroup(newUserGroup).then(() => {
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

  const groupLeader = users.find(user => group.groupLeaderId === user.id)
  return (
    <section className="mygroup">
      <h3 className="group__name">{group.name}</h3>
      <div className="group__artist">{group.artist}</div>
      <div className="group__time">{group.date}</div>


      {groupLeaderLoggedIn()}




    </section>
  )
}